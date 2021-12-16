import request from "@/utils/request.js";

//  推荐页轮播图
export const getRecommendBanner = () => request.get("/banner");

// 请求推荐最新歌曲
export const getrecommendNewestSong = () =>
  request.get("/personalized/newsong");

// 获取新歌速递
export const getTopNewSong = params => request.get("/top/song", { params });

// 获取推荐新碟
// params: { limit, offset, area }
export const getRcmdNewAlbum = params => request.get("/top/album", { params });

// 获取全部新碟
export const getAllNewAlbum = () => request.get("/album/new");

// 请求歌曲信息
export const getSongsDetail = params => request.get("/song/detail", { params });

// 获取歌曲评论
export const getSongComments = params =>
  request.get("/comment/music", { params });

// 请求歌曲url
export const getSongUrl = params => request.get("/song/url", { params });

// 获取歌曲歌词
export const getSongLyric = params => request.get("/lyric", { params });

// 获取歌曲相似歌单
export const getSimiPlaylists = params =>
  request.get("/simi/playlist", { params });

// 获取相似歌曲
export const getSimiSongs = params => request.get("/simi/song", { params });

// 获取喜欢的歌曲列表
export const getLikedSongList = params => request.get("/likelist", { params });

// 喜欢某个音乐
export const likeSong = params => request.get("/like", { params });
