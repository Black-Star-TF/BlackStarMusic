import { getPlaylistSongs } from "@/api/playlist";
import { getAlbumDetail } from "@/api/album";
import store from "@/store";
// 播放歌曲有关方法

// 播放音乐并替换播放列表
export function playMusic(id) {
  console.log("播放音乐", id);
}

export async function getSongsOfPlaylist({ id, name }) {
  const { songs } = await getPlaylistSongs({ id, limit: 5000 });
  let songList = songs.map(song =>
    getTrackFormatInfo(song, "song", {
      type: "playlist",
      info: {
        id,
        name,
      },
    })
  );
  return songList
}
// 播放全部
export async function playPlaylist({ id, name }) {
  const list = await getSongsOfPlaylist({ id, name });
  store.state.player.playTrackFromPlaylist(0, list);
}

export async function playAlbum(id) {
  const { album, songs } = await getAlbumDetail({ id });
  const list = songs.map(song => getTrackFormatInfo(song, 'song', {
    type: 'album',
    info: {
      id: album.id,
      name: album.name
    }
  }));
  store.state.player.playTrackFromPlaylist(0, list);
}

// 播放电台
export function playRadio(id) {
  console.log("播放电台", id);
}
// 电台详情
export function toRadioDetail(rid) {
  this.$router.push({ path: `/radio`, query: { rid } });
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
}
// 跳转到专辑详情页
export function toAlbumDetail(id) {
  this.$router.push({ path: `/album`, query: { id } });
}
// 跳转到歌手详情页
export function toArtistDetail(id) {
  this.$router.push({ path: `/singer`, query: { id } });
}
// 跳转到用户详情页
export function toUserDetail(userId) {
  this.$router.push({ path: `/user`, query: { userId } });
}
// 高亮显示关键词
export function markKeywords(str) {
  let reg = new RegExp(this.keyword, "ig");
  return str.replace(reg, $ => `<span class="keywords">${$}</span>`);
}
// 跳转到资源评论页
export function toResourceComment(id, type) {
  this.$router.push({ path: "/resource-comment", query: { id, type } });
}
// 跳转到热门评论页
export function toHotComment(id, type) {
  this.$router.push({ path: "/hot-comment", query: { id, type } });
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

export function getTrackFormatInfo(track, type, source) {
  const song = {};
  song.type = type
  song.id = track.id;
  song.name = track.name;
  if (type === "song") {
    song.alia = track.alia;
    song.ar = track.ar;
    song.dt = track.dt;
  } else if (type === "program") {
    song.dt = track.duration;
    song.mainSongId = track.mainSong.id
    song.alia = []
    song.ar = [
      {
        name: track.radio.name,
        id: track.radio.id
      }
    ]
  }
  song.source = source;
  return song;
}

export function findIndex(currentTrack, list){
  return list.findIndex(track => {
    return (
      track.type === currentTrack.type &&
      track.id === currentTrack.id &&
      track.source.type === currentTrack.source.type &&
      track.source.info.id === currentTrack.source.info.id
    );
  });
}
