import { Howler, Howl } from 'howler'
import { getSongsDetail, getSongUrl } from '@/api/music'
import axios from 'axios'
export default class Player{
  constructor(){
    this._playing = false         // 当前播放状态
    this._progress = 0            // 当前播放进度
    this._volume = 1              // 当前播放音量
    this._volumeBeforeMuted = 1   // 保存静音前的音量
    this._list = []               // 当前播放列表
    this._currentIndex = 0        // 当前播放歌曲在播放列表中的索引
    this._currentTrack = {}       // 当前播放的歌曲信息
    this._history = []            // 播放历史
    
    this._howler = null           // 播放器实例
    Object.defineProperty(this, '_howler',{
      enumerable: false,
    })

    this.__init__()
  }

  // 获取当前播放状态
  get playing(){
    return this._playing
  }

  // 获取当前播放进度
  get progress(){
    return this._progress
  }

  // 获取播放历史
  get history(){
    return this._history
  }
  // 修改播放历史
  set history(val){
    this._history = val
  }

  // 设置当前播放进度
  set progress(value) {
    if (this._howler) {
      this._howler.seek(value);
    }
  }

  // 获取播放音量
  get volume(){
    return this._volume
  }

  // 设置播放音量
  set volume(val){
    this._volume = val
    Howler.volume(val);
  }

  // 获取当前播放列表
  get list(){
    return this._list
  }

  // 设置当前播放列表
  set list(val){
    this._list = val
  }

  // 获取当前歌曲索引
  get currentIndex(){
    return this._currentIndex
  }

  

  // 设置当前播放的歌曲索引
  set currentIndex(val){
    this._currentIndex = val
  }

  // 获取当前播放的歌曲
  get currentTrack(){
    return this._currentTrack
  }

  // 设置当前播放歌曲信息
  set currentTrack(val){
    this._currentTrack = val
  }

  // 获取当前播放歌曲的时长
  get currentTrackDuration() {
    const trackDuration = this._currentTrack.dt || 1000;
    let duration = ~~(trackDuration / 1000);
    return duration > 1 ? duration - 1 : duration;
  }

  // 初始化操作
  __init__(){
    this._loadSelfFromLocalStorage()
    Howler.autoUnlock = false
    Howler.volume(this._volume)

    // 恢复歌曲播放
    if(this.list.length > 0){
      this.readyToPlay(false).then(()=>{
        this._howler?.seek(localStorage.getItem('playerCurrentTrackTime') ?? 0)
      })
    }
    

    // TODO: 开启一个循环定时器每秒钟获取播放器的播放时间
    setInterval(()=>{
      if(this._howler){
        this._progress = this._howler.seek()
        localStorage.setItem('playerCurrentTrackTime', this._progress);
      }
    },200)
  }

  // 静音
  mute(){
    if(this.volume == 0){
      this.volume = this._volumeBeforeMuted
    }else{
      this._volumeBeforeMuted = this.volume;
      this.volume = 0
    }
  }

  // 播放
  play(){
    if(this._howler?.playing()) return
    this._howler?.play()
    this._playing = true
  }

  // 暂停
  pause(){
    this._howler?.pause();
    this._playing = false;
  }

  togglePlayStatus(){
    if(this._howler?.playing()){
      this.pause()
    }else{
      this.play()
    }
  }
 
  playTrackOfSource(source, autoPlay = true){
    Howler.unload() // 销毁所有Howl对象
    this._howler = new Howl({
      src: source,
    })
    if(autoPlay){
      this._howler.play()
      this._playing = true
    }
    this._howler.once('end', () => {
      this.playNextTrack();
    });
  }

  // 播放歌曲并切换播放列表
  playTrack(trackId, tracks){
    tracks = JSON.parse(JSON.stringify(tracks))
    this.list = tracks
    this.playTrackOfCurrentList(trackId)
  }


  // 获取歌曲详情和歌曲url
  readyToPlay(autoPlay = true){
    this.progress = 0
    let id = this._list[this.currentIndex]
    return axios.all([getSongsDetail(id),getSongUrl(id)])
    .then(axios.spread((res1,res2)=>{
      if(res2.data[0] && res2.data[0].url && !res2.data[0].freeTrialInfo){
        this.progress = 0
        this.currentTrack = res1.songs[0]
        this.playTrackOfSource(res2.data[0].url, autoPlay)

        // 添加到播放历史
        let index = this.history.findIndex(item=>{
          return this.currentTrack.id == item.id
        })
        if(index >= 0){
          this.history.splice(index,1)
        }
        this.history.unshift({
          id: this.currentTrack.id,
          playDate: new Date().getTime()
        })
        if(this.history.length > 50){
          this.history.pop()
        }
        this.history = this.history
        return true
      }else{
        // 歌曲收费时 跳过播放下一首
        this.playNextTrack()
      }
    }))
  }

  // 播放下一首
  playNextTrack(){
    if(this.currentIndex >= this._list.length  - 1){
      // 当前是最后一首时，下一首播放第一首
      this.currentIndex = 0
    }else{
      this.currentIndex++
    }
    this.readyToPlay()
  }

  // 播放上一首
  playPrevTrack(){
    if(this.currentIndex <= 0){
      // 当前为第一首时，上一首播放最后一首
      this.currentIndex = this.list.length - 1
    }else{
      this.currentIndex--
    }
    this.readyToPlay()
  }

  // 将一首歌添加到当前播放列表
  addTrackToPlayList(trackId, immediately = false){
    if(immediately){
      // 如果要立即播放，则添加到当前播放歌曲后并进行播放
      if(this.list.length <= 0){
        this.currentIndex = 0
        this.list.push(trackId)
      }else{
        this.currentIndex++
        this.list.splice(this.currentIndex,0,trackId)
      }
      this.readyToPlay()
    }else{
      // 如果不需要立即播放，则添加到当前播放列表最后
      tthis.list.push(trackId)
    }
    this.list = this.list
  }

  // 将多首歌添加到当前播放列表
  addTracksToPlaylist(tracks){
    tracks = JSON.parse(JSON.stringify(tracks))
    this.list.push(...tracks)
    this.list = this.list
  }

  // 播放当前播放列表中的歌
  playTrackOfCurrentList(trackId){
    this.currentIndex = this.list.indexOf(trackId)
    this.readyToPlay()
  }

  // 清空播放列表并停止播放
  clear(){
    this.list = []
    this.currentIndex = 0
    this.currentTrack = {}
    Howler.unload()
    this._howler = null
  }

  clearHistory(){
    this.history = []
  }

  // 从localStorage获取数据
  _loadSelfFromLocalStorage(){
    const player = JSON.parse(localStorage.getItem('player'));
    if (!player) return;
    for (const [key, value] of Object.entries(player)) {
      this[key] = value;
    }
  }

  // 将数据保存到localStorage
  _saveSelfToLocalStorage(){
    let player = {};
    for (let [key, value] of Object.entries(this)) {
      if (key === '_playing') continue;
      player[key] = value;
    }
    localStorage.setItem('player', JSON.stringify(player));
  }
}