import { Howler, Howl } from 'howler';
import { getSongsDetail, getSongUrl } from '@/api/music'

export default class Player {
  constructor(){
    // 播放器状态
    this._playing = false  // 是否正在播放
    this._progress = 0     // 当前播放歌曲的进度
    this._volume = 1;      // 音量 0 to 1
    this._repeatMode = 'off'; // off | on | one  循环播放模式
    // this._shuffle = false; // true | false  是否随机播放

    

    // 播放信息
    this._list = [] // 播放列表
    this._current = 0; // 当前播放歌曲在播放列表中的索引
    // this._shuffledList = [] // 随机的播放放列表
    // this._shuffleList = 0 // 当前播放歌曲在随机播放列表中的索引
    this._playlist = {}  // 当前播放列表的信息
    this._currentTrack = {}  //当前播放歌曲的详细信息
    this._playNextList = []; // 当这个list不为空时，会优先播放这个list的歌

    this._howler = null;
    Object.defineProperty(this, '_howler', {
      enumerable: false,
    });

    this._init()
  }

  get volume() {
    return this._volume;
  }
  set volume(volume) {
    this._volume = volume;
    Howler.volume(volume);
  }
  get list() {
    return this._list;
  }
  set list(list) {
    this._list = list;
  }
  get current() {
    return this._current;
  }
  set current(current) {
    this._current = current;
  }

  get playing() {
    return this._playing;
  }
  get currentTrack() {
    return this._currentTrack;
  }
  get playlistSource() {
    return this._playlistSource;
  }
  get playNextList() {
    return this._playNextList;
  }

  get currentTrackDuration() {
    const trackDuration = this._currentTrack.dt || 1000;
    let duration = ~~(trackDuration / 1000);
    return duration
    // return duration > 1 ? duration - 1 : duration;
  }
  get progress() {
    return this._progress;
  }
  set progress(value) {
    if (this._howler) {
      this._howler.seek(value);
    }
  }
  // 当前播放的歌曲是否为我喜欢的歌曲
  get isCurrentTrackLiked() {
    return this.$store.state.data.likedSongList.includes(this.currentTrack.id);
  }

  _init() {
    this._loadSelfFromLocalStorage();
    Howler.autoUnlock = false;
    Howler.usingWebAudio = true;
    Howler.volume(this.volume);

    // 恢复当前播放歌曲
    this.playTrack(this._currentTrack.id, false).then(() => {
      this._howler?.seek(localStorage.getItem('playerCurrentTrackTime') ?? 0);
    }); 

    this._setIntervals();
  }

  _setIntervals() {
    // 同步播放进度
    // TODO: 如果 _progress 在别的地方被改变了，这个定时器会覆盖之前改变的值，是bug
    setInterval(() => {
      if (this._howler === null) return;
      this._progress = this._howler.seek();
      localStorage.setItem('playerCurrentTrackTime', this._progress);
    }, 1000);
  }

  _getNextTrack() {
    if (this._playNextList.length > 0) {
      let trackID = this._playNextList.shift();
      return [trackID, this.current];
    }

    // 当歌曲是列表最后一首 && 循环模式开启
    if (this.list.length === this.current + 1 && this.repeatMode === 'on') {
      return [this.list[0], 0];
    }

    // 返回 [trackID, index]
    return [this.list[this.current + 1], this.current + 1];
  }

  _getPrevTrack() {
    // 当歌曲是列表第一首 && 循环模式开启
    if (this.current === 0 && this.repeatMode === 'on') {
      return [this.list[this.list.length - 1], this.list.length - 1];
    }

    // 返回 [trackID, index]
    return [this.list[this.current - 1], this.current - 1];
  }

  _playAudioSource(source, autoplay = true) {
    Howler.unload();
    this._howler = new Howl({
      src: [source],
      html5: true,
      format: ['mp3', 'flac'],
    });
    if (autoplay) {
      this.play();
    }
    this._howler.once('end', () => {
      this.playNextTrack();
    });
  }
  _loadSelfFromLocalStorage() {
    const player = JSON.parse(localStorage.getItem('player'));
    if (!player) return;
    for (const [key, value] of Object.entries(player)) {
      this[key] = value;
    }
  }
  saveSelfToLocalStorage() {
    let player = {};
    for (let [key, value] of Object.entries(this)) {
      if (key === '_playing') continue;
      player[key] = value;
    }
    localStorage.setItem('player', JSON.stringify(player));
  }

  pause() {
    this._howler?.pause();
    this._playing = false;
  }
  play() {
    if (this._howler?.playing()) return;
    this._howler?.play();
    this._playing = true;
  }
  playOrPause() {
    if (this._howler?.playing()) {
      this.pause();
    } else {
      this.play();
    }
  }

  _getAudioSource(track, autoPlay) {
    return getSongUrl(track.id).then(result => {
      if (!result.data[0]) return null;
      if (!result.data[0].url) return null;
      if (result.data[0].freeTrialInfo !== null) return null; // 跳过只能试听的歌曲
      const source = result.data[0].url.replace(/^http:/, 'https:');
      this._playAudioSource(source, autoPlay)
      return true
    });
  }
  playTrack(id, autoPlay = true){
    return getSongsDetail(id).then(data => {
      let track = data.songs[0];
      // this._currentTrack = track;
      return this._getAudioSource(track, autoPlay).then(res=>{
        if(res){
          this._currentTrack = track;
        }else{
          console.log(111);
        }
        return true
      })
    });
  }

  playSongOfPlaylist(trackIds, trackId = null){
    console.log(trackId);
    this.list = trackIds
    if(!trackId){
      // 从第一首开始播放
      this.current = 0
    }else{
      this.current = trackIds.indexOf(trackId)
    }
    console.log(this.current);
    this.playTrack(this.list[this.current])    
  }
   playNextTrack(){
    if(!this.list.length > 0) return 
    if(this.current == this.list.length - 1){
      this.current = 0
    }else{
      this.current = this.current + 1
    }
    this.playTrack(this.list[this.current])
   }

   playPrevTrack(){
    if(!this.list.length > 0) return 
    if(this.current == 0){
      this.current = this.list.length - 1
    }else{
      this.current = this.current - 1
    }
    this.playTrack(this.list[this.current])    
  }

  addToPlaylist(trackId){
    this.current++
    this.list.splice(this.current,0,trackId)
    this.playTrack(this.list[this.current])
  }
  
}