import { Howler, Howl } from "howler";
import { getSongsDetail, getSongUrl } from "@/api/music";
import { getRadioProgramDetail } from "@/api/dj-radio";
import { findIndex } from "@/utils/methods";
import RESOURCE_TYPE from "@/utils/resource-type";
import axios from "axios";
export default class Player {
  constructor() {
    this._playing = false; // 当前播放状态
    this._progress = 0; // 当前播放进度
    this._volume = 1; // 当前播放音量
    this._volumeBeforeMuted = 1; // 保存静音前的音量
    this._list = []; // 当前播放列表
    this._currentIndex = -1; // 当前播放歌曲在播放列表中的索引
    this._currentTrack = {}; // 当前播放的歌曲信息
    this._history = []; // 播放历史

    this._howler = null; // 播放器实例
    Object.defineProperty(this, "_howler", {
      enumerable: false,
    });

    this.__init__();
  }

  // 获取当前播放状态
  get playing() {
    return this._playing;
  }

  // 获取当前播放进度
  get progress() {
    return this._progress;
  }

  // 获取播放历史
  get history() {
    return this._history;
  }
  // 修改播放历史
  set history(val) {
    this._history = val;
  }

  // 设置当前播放进度
  set progress(value) {
    if (this._howler) {
      this._howler.seek(value);
    }
  }

  // 获取播放音量
  get volume() {
    return this._volume;
  }

  // 设置播放音量
  set volume(val) {
    this._volume = val;
    Howler.volume(val);
  }

  // 获取当前播放列表
  get list() {
    return this._list;
  }

  // 设置当前播放列表
  set list(val) {
    this._list = val;
  }

  // 获取当前歌曲索引
  get currentIndex() {
    return this._currentIndex;
  }

  // 设置当前播放的歌曲索引
  set currentIndex(val) {
    this._currentIndex = val;
  }

  // 获取当前播放的歌曲
  get currentTrack() {
    return this._currentTrack;
  }

  // 设置当前播放歌曲信息
  set currentTrack(val) {
    this._currentTrack = val;
  }

  // 获取当前播放歌曲的时长
  get currentTrackDuration() {
    const trackDuration = this._currentTrack.dt || 1000;
    let duration = ~~(trackDuration / 1000);
    return duration > 1 ? duration - 1 : duration;
  }

  // 初始化操作
  __init__() {
    this._loadSelfFromLocalStorage();
    Howler.autoUnlock = false;
    Howler.volume(this._volume);

    // this.clear()
    // this.clearHistory()
    // this.currentTrack = {}

    // 恢复歌曲播放
    if (this.list.length > 0) {
      this.readyToPlay(false).then(() => {
        this._howler?.seek(localStorage.getItem("playerCurrentTrackTime") ?? 0);
      });
    }

    // TODO: 开启一个循环定时器每秒钟获取播放器的播放时间
    setInterval(() => {
      if (this._howler) {
        this._progress = this._howler.seek();
        localStorage.setItem("playerCurrentTrackTime", this._progress);
      }
    }, 200);
  }

  // 静音
  mute() {
    if (this.volume == 0) {
      this.volume = this._volumeBeforeMuted;
    } else {
      this._volumeBeforeMuted = this.volume;
      this.volume = 0;
    }
  }

  // 播放
  play() {
    if (this._howler?.playing()) return;
    this._howler?.play();
    this._playing = true;
  }

  // 暂停
  pause() {
    this._howler?.pause();
    this._playing = false;
  }

  togglePlayStatus() {
    if (!this._howler) return;
    if (this._howler.playing()) {
      this.pause();
    } else {
      this.play();
    }
  }

  playTrackOfSource(source, autoPlay = true) {
    Howler.unload(); // 销毁所有Howl对象
    this._howler = new Howl({
      src: source,
    });
    if (autoPlay) {
      this._howler.play();
      this._playing = true;
    }
    this._howler.once("end", () => {
      this.playNextTrack();
    });
  }

  async getTrackUrl(id) {
    const { data } = await getSongUrl({ id });

    if (data[0] && data[0].url && !data[0].freeTrialInfo) {
      // 可以播放
      return data[0].url;
    }
    return false;
  }

  // 获取歌曲详情和歌曲url
  async readyToPlay(autoPlay = true) {
    // 暂停播放歌曲

    this.progress = 0;
    let track = this.list[this.currentIndex];
    let id = track.type === RESOURCE_TYPE.SONG ? track.id : track.mainSongId;
    const url = await this.getTrackUrl(id);
    if (!url) {
      // 当前歌曲无法播放，则播放下一首
      // this.playNextTrack();
      return false;
    }
    if (track.type === RESOURCE_TYPE.SONG) {
      // 获取歌曲详情
      const { songs } = await getSongsDetail({ ids: track.id });
      this.currentTrack = { ...track, coverUrl: songs[0].al.picUrl };
    }
    if (track.type === RESOURCE_TYPE.RADIO) {
      // 获取节目详情
      const { program } = await getRadioProgramDetail({ id: track.id });
      this.currentTrack = { ...track, coverUrl: program.blurCoverUrl };
    }
    this.playTrackOfSource(url, autoPlay);
    // 添加到播放历史
    const index = findIndex(track, this.history);
    if (index >= 0) {
      this.history.splice(index, 1);
    }
    this.history.unshift({
      ...track,
      playDate: new Date().getTime(),
    });
    if (this.history.length > 50) {
      this.history.pop();
    }
    this.history = this.history;
    return true;
  }

  // 播放下一首
  playNextTrack() {
    if (this.currentIndex >= this._list.length - 1) {
      // 当前是最后一首时，下一首播放第一首
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.readyToPlay();
  }

  // 播放上一首
  playPrevTrack() {
    if (this.currentIndex <= 0) {
      // 当前为第一首时，上一首播放最后一首
      this.currentIndex = this.list.length - 1;
    } else {
      this.currentIndex--;
    }
    this.readyToPlay();
  }

  // 添加歌曲到当前播放列表
  addTrackToPlaylist(track) {
    this.list = [...this.list, track];
  }
  // 播放歌曲，但不切换播放列表，将要播放的歌曲添加到当前播放列表
  playTrack(currentTrack) {
    const index = findIndex(currentTrack, this.list);
    if (index !== -1) {
      this.currentIndex = index;
    } else {
      this.list.splice(this.currentIndex + 1, 0, currentTrack);
      this.currentIndex += 1;
    }
    this.readyToPlay();
  }

  // 播放歌曲，并切换播放列表
  playTrackFromPlaylist(index, playlist) {
    this.currentTrack = {};
    Howler.unload();
    this._howler = null;
    this._playing = false;
    
    this.list = [...playlist];
    this.currentIndex = index;
    this.readyToPlay();
  }

  // 将多首歌添加到当前播放列表
  addTracksToPlaylist(list) {
    // TODO: 判断歌曲是否在列表中
    const isFirst = this.list.length === 0;
    this.list = [...this.list, ...list];
    if (isFirst) {
      this.currentIndex = 0;
      this.readyToPlay(false);
    }
  }

  // 清空播放列表并停止播放
  clear() {
    this.list = [];
    this.currentIndex = -1;
    this.currentTrack = {};
    Howler.unload();
    this._howler = null;
    this._playing = false;
  }
  // 清空最近播放
  clearHistory() {
    this.history = [];
  }

  // 从localStorage获取数据
  _loadSelfFromLocalStorage() {
    const player = JSON.parse(localStorage.getItem("player"));
    if (!player) return;
    for (const [key, value] of Object.entries(player)) {
      this[key] = value;
    }
  }

  // 将数据保存到localStorage
  _saveSelfToLocalStorage() {
    let player = {};
    for (let [key, value] of Object.entries(this)) {
      if (key === "_playing") continue;
      player[key] = value;
    }
    localStorage.setItem("player", JSON.stringify(player));
  }
}
