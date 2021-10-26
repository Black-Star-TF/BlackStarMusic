<template>
	<div class="view-playlist">
		<template >
			<container v-if="currentTag">
				<template v-slot:left>
					<div class="current-tag-container">
						<!-- 歌单分类列表 -->
						<span class="current-tag" @click.stop="change()">{{currentTag.name}}</span>
						<div class="playlist-categories" v-if="showCate" @click.stop>
							<div class="playlist-all">
								<span :class="{'active': all.name == currentTag.name}" @click="changeTag(all)">{{all.name}}</span>
							</div>
							<div class="playlist-group" v-for="(value,key) in categories" :key="key">
								<div class="group-name">
									<span class="name">{{value}}</span>
								</div>
								<div class="group-tags">
									<div class="tag-container" v-for="tag in playlistCate" v-if="tag.category == key" :key="tag.name">
										<span :class="{'active': tag.name == currentTag.name}" @click="changeTag(tag)">
										{{tag.name}}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</template>
				<template v-slot:right>
					<div class="hot-tags-nav">
						<span
						class="tag"
						v-for="tag in hotTags"
						:class="{'active': tag.name == currentTag.name}"
						@click="changeTag(tag)"
						:key="tag.name">{{tag.name}}</span>
					</div>
				</template>
				<template v-slot:content v-if="loading">
					<playlist-item
					v-for="(playlist,index) in playlists" 
					:num="5" 
					:index="index" 
					:playlistItem="playlist" 
					:key="playlist.id">
					</playlist-item>
				</template>
			</container>

			<!-- 分页 -->
			<el-pagination v-if="loading" background layout="prev, pager, next" :total="totalPage * 10"
				:current-page="currentPage" @current-change="changeCurrentPage" @prev-click="skip(-1)" @next-click="skip(1)">
			</el-pagination>
		</template>

		<!-- 加载图标 -->
		<!-- <Loading :loading="loading" /> -->
		
	</div>
</template>

<script>
	import Container from '@/components/common/container'
	import PlaylistItem from '@/components/item/playlist-item'
	// import Loading from '@/components/common/Loading'

	import {
		getHotPlaylistCate,
		getPlaylistCate,
		getPlaylists
	} from '@/api/playlist.js'
	export default {
		data() {
			return {
				playlistCate: [],
				all: null,
				currentTag: null,
				categories: null,
				hotTags: [],
				playlists: [],
				showCate: false,
				limit: 50,
				totalPage: 0,
				currentPage: 1
			}
		},
		components: {
			Container,
			PlaylistItem,
			// Loading
		},
		computed: {
			offset() {
				return (this.currentPage - 1) * this.limit
			},
			loading() {
				return this.playlists.length > 0
			}
		},
		methods: {
			// 翻页
			changeCurrentPage(pageNum) {
				this.currentPage = pageNum
				this.getPlaylistsData()
			},

			// 切换歌单分类
			changeTag(tag) {
				this.currentTag = tag
				this.showCate = false
			},
			// 切换歌单分类面板状态
			change(status = null) {
				if (status == null) {
					this.showCate = !this.showCate
				} else {
					this.showCate = status
				}
			},
			// 获取歌单列表
			getPlaylistsData() {
				this.playlists = []
				getPlaylists(this.currentTag.name, this.limit, this.offset).then(res => {
					this.playlists = res.playlists
					this.totalPage = Math.floor(res.total / this.limit)
				})
			}
		},
		created() {
			let tag = this.$route.params.tag
			// 获取热门歌单分类
			getHotPlaylistCate().then(res => {
				this.hotTags = res.tags
			})
			// 获取歌单分类
			getPlaylistCate().then(res => {
				this.playlistCate = res.sub
				this.all = res.all
				this.categories = res.categories
				this.currentTag = tag || this.all
				this.getPlaylistsData()
			})

			// 添加关闭歌单分类窗口的事件
			const app = document.getElementById('app')
			app.addEventListener('click', () => {
				this.showCate = false
			})
		},
		watch: {
			currentTag() {
				// 获取歌单数据
				this.currentPage = 1
				this.getPlaylistsData()
			}
		},
		beforeDestroy(){
			// 移除关闭歌单分类窗口的事件
			const app = document.getElementById('app')
			app.removeEventListener('click', () => {
				this.showCate = false
			})
		}
	}
</script>

<style lang="scss" scoped>
@import url('~@/styles/variables.scss');
.view-playlist{
	padding-bottom: 25px;
}
.current-tag-container {
  height: 70px;
  line-height: 70px;
  position: relative;
  .current-tag {
    position: relative;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    width: 100px;
    color: var(--color-level2);
    font-size: 14px;
    border: 1px solid var(--color-level5);
    border-radius: 20px;
    vertical-align: middle;
    cursor: pointer;
    background-color: transparent;

    &:hover {
      background-color: var(--main-container-bg-color);
    }
  }

  .playlist-categories {
    width: 800px;
    z-index: 1000;
    background-color: var(--panel-box-bg-color);
    box-shadow: 0 0 5px 1px rgba($color: #000, $alpha: .1);
    border-radius: 5px;
    position: absolute;
    top: 65px;
    cursor: default;

    &::before {
      content: "";
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      top: -20px;
      left: 40px;
      border: 10px solid transparent;
      border-bottom-color: var(--panel-box-bg-color);
    }

    .playlist-all {
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      box-sizing: border-box;
      border-bottom: 1px solid var(--main-border-color);

      >span {
        font-size: 14px;
        color: var(--color-level2);

        &:hover {
          color: var(--color-netease-red);
        }

        &.active {
          color: var(--color-netease-red);
        }
      }
    }

    .playlist-group {
      cursor: default;
      width: 100%;
      display: flex;
      line-height: 20px;
      margin: 20px 0;
      font-size: 14px;

      .group-name {
        width: 100px;
        text-align: center;
        margin: 10px 0;
        margin-right: 20px;
        color: var(--color-level4);
      }

      .group-tags {
        width: calc(100% - 120px);
        display: flex;
        flex-wrap: wrap;

        .tag-container {
          width: calc(100% / 6);
          margin: 10px 0;

          >span {
            color: var(--color-level2);
            padding: 0 10px;
            cursor: pointer;
            display: inline-block;
            border-radius: 10px;
            &:hover {
              color: var(--color-netease-red);
            }
            &.active {
              color: var(--color-netease-red);
              background-color: var(--playlist-tag-active-bg-color);
            }
          }
        }
      }
    }
  }
}


.hot-tags-nav {
  height: 70px;
  line-height: 70px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  >span.tag {
    display: inline-block;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
    padding: 0 8px;
    margin: 0 3px;
    cursor: pointer;
		color: var(--color-level3);
    &:hover{
      color: var(--color-level2);
    }
    &.active{
      color: var(--color-netease-red);
			background-color: var(--playlist-tag-active-bg-color);
    }
  }
}

.el-pagination {
  display: flex;
  justify-content: center;
}
</style>