export default {
  settings: {
    theme: "light", // 主题
  },
  data: {
    userProfile: {}, // 登录的用户信息
    loginStatus: false, // 登录状态
    playlistsCreatedByMe: [], // 创建的歌单列表  id
    playlistsSubscribedByMe: [], // 收藏的歌单列表 id
    likedSongList: [], // 喜欢的歌曲列表
    likedPlaylistId: 0, // 我喜欢的歌单 id
    searchRecords: [], // 搜索记录
  },
};
