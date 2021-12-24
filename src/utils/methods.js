import { getPlaylistSongs } from "@/api/playlist";
import { getAlbumDetail } from "@/api/album";
import store from "@/store";
import RESOURCE_TYPE from "./resource-type";
// 播放歌曲有关方法

// 播放音乐并替换播放列表
export function playMusic(id) {
  console.log("播放音乐", id);
}

export async function getSongsOfPlaylist({ id, name }) {
  const { songs } = await getPlaylistSongs({ id, limit: 5000 });
  let songList = songs.map(song =>
    getTrackFormatInfo(song, RESOURCE_TYPE.SONG, {
      type: "playlist",
      info: {
        id,
        name,
      },
    })
  );
  return songList;
}
// 播放全部
export async function playPlaylist({ id, name }) {
  const list = await getSongsOfPlaylist({ id, name });
  store.state.player.playTrackFromPlaylist(0, list);
}

export async function playAlbum(id) {
  const { album, songs } = await getAlbumDetail({ id });
  const list = songs.map(song =>
    getTrackFormatInfo(song, RESOURCE_TYPE.SONG, {
      type: "album",
      info: {
        id: album.id,
        name: album.name,
      },
    })
  );
  store.state.player.playTrackFromPlaylist(0, list);
}

// 播放电台
export function playRadio(id) {
  console.log("播放电台", id);
}
// 电台详情
export function toRadioDetail(rid) {
  this.$router.push({ path: `/radio`, query: { rid } });
  this.$emit('router-change')
}
// 播放视频
export function playVideo(id) {
  let reg = /^[0-9]+$/;
  let path = reg.test(id) ? "/mv" : "/video";
  this.$router.push({ path, query: { id } });
}
// 跳转到歌单详情页
export function toPlaylistDetail(id) {
  this.$router.push({ path: `/playlist`, query: { id } });
  this.$emit('router-change')
}
// 跳转到专辑详情页
export function toAlbumDetail(id) {
  this.$router.push({ path: `/album`, query: { id } });
  this.$emit('router-change')
}
// 跳转到歌手详情页
export function toArtistDetail(id) {
  this.$router.push({ path: `/singer`, query: { id } });
  this.$emit('router-change')
}
// 跳转到用户详情页
export function toUserDetail(userId) {
  this.$router.push({ path: `/user`, query: { userId } });
  this.$emit('router-change')
}
// 高亮显示关键词
export function markKeywords(str) {
  let reg = new RegExp(this.keyword, "ig");
  return str.replace(reg, $ => `<span class="keywords">${$}</span>`);
}
// 跳转到资源评论页
export function toResourceComment(id, type) {
  this.$router.push({ path: "/resource-comment", query: { id, type } });
  this.$emit('router-change')
}
// 跳转到热门评论页
export function toHotComment(id, type) {
  this.$router.push({ path: "/hot-comment", query: { id, type } });
  this.$emit('router-change')
}
// 搜索
export function search(keywords) {
  this.$router.push({
    path: "/search",
    query: {
      keyword: keywords,
      type: this.$route.query.type || 1,
    },
  });
  this.$emit('router-change')
}

// 防抖函数
export function debounce(handler, delay) {
  let timer;
  return function() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      this[handler]();
    }, delay);
  };
}
// 打开右键菜单
export function openContextMenu(e, cpnName, data) {
  store.commit("updateApp", { key: "contextMenuVisible", value: false });
  this.$nextTick(() => {
    store.commit("updateApp", { key: "contextMenuVisible", value: true });
    store.commit("updateApp", {
      key: "contextMenuOptions",
      value: {
        x: e.clientX,
        y: e.clientY,
        cpnName: cpnName,
        data: { ...data },
      },
    });
  });
}

// 格式化歌曲信息
export function getTrackFormatInfo(currentTrack, type, source) {
  const track = {};
  track.type = type;
  track.id = currentTrack.id;
  track.name = currentTrack.name;
  if (type === RESOURCE_TYPE.SONG) {
    track.alia = currentTrack.alia ?? currentTrack.alias;
    track.ar = currentTrack.ar ?? currentTrack.artists ;
    track.dt = currentTrack.dt ?? currentTrack.duration;
    track.mv = currentTrack.mv ?? currentTrack.mvid;
  } else if (type === RESOURCE_TYPE.RADIO) {
    track.dt = currentTrack.duration;
    track.mainSongId = currentTrack.mainSong.id;
    track.alia = [];
    track.mv = 0;
    track.ar = [
      {
        name: currentTrack.radio.name,
        id: currentTrack.radio.id,
      },
    ];
  }
  track.source = source;
  return track;
}

export function findIndex(currentTrack, list) {
  return list.findIndex(track => {
    return (
      track.type === currentTrack.type &&
      track.id === currentTrack.id &&
      track.source.type === currentTrack.source.type &&
      track.source.info.id === currentTrack.source.info.id
    );
  });
}
