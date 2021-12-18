const song = {
  type: '',   // 'song' || 'program'
  id: '',
  name: '',
  alias: '',
  artists: [],
  source: {   // 来源 如歌单，专辑，电台， 搜索页
    type: '',   // album || playlist || radio || search || discovery || newest
    info: {
      id: '',
      name: '',
      // sourceType == 'search'
      keywords: '',
    }
  },
  duration: '', //时长
}

// 歌曲来源
// 1. 歌单  歌单id 歌单名称
// 2. 专辑  专辑id 专辑名称
// 3. 电台  电台id 电台名称
// 4. 搜索页 搜索关键词 页码