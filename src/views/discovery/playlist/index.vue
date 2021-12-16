<template>
  <div class="view-playlist" ref="page">
    <div class="page-box">
      <template>
        <container v-if="currentTag">
          <template v-slot:left>
            <div class="current-tag-container">
              <!-- 歌单分类列表 -->
              <span class="current-tag" @click.stop="change()">{{
                currentTag.name
              }}</span>
              <div class="playlist-categories" v-if="showCate" @click.stop>
                <div class="playlist-all">
                  <span
                    :class="{ active: all.name == currentTag.name }"
                    @click="changeTag(all)"
                    >{{ all.name }}</span
                  >
                </div>
                <div
                  class="playlist-group"
                  v-for="(value, key) in categories"
                  :key="key"
                >
                  <div class="group-name">
                    <span class="name">{{ value }}</span>
                  </div>
                  <div class="group-tags">
                    <template v-for="tag in playlistCate">
                      <div
                        class="tag-container"
                        :key="tag.name"
                        v-if="tag.category == key"
                      >
                        <span
                          :class="{ active: tag.name == currentTag.name }"
                          @click="changeTag(tag)"
                        >
                          {{ tag.name }}
                        </span>
                      </div>
                    </template>
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
                :class="{ active: tag.name == currentTag.name }"
                @click="changeTag(tag)"
                :key="tag.name"
              >
                {{ tag.name }}
              </span>
            </div>
          </template>
          <template v-slot:content v-if="loaded">
            <playlist-item
              v-for="(playlist, index) in playlists"
              :num="5"
              :index="index"
              :playlistItem="playlist"
              :key="`${index}-${playlist.id}`"
            />
          </template>
        </container>

        <!-- 分页 -->
        <pagination
          v-if="loaded"
          :total="total"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          @current-change="changeCurrentPage"
        />
      </template>
      <loading v-if="!loaded" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Container from "@/components/common/container";
import PlaylistItem from "./components/playlist";
import Loading from "@/components/common/loading";
import Pagination from "@/components/common/pagination";
import {
  getHotPlaylistCate,
  getPlaylistCate,
  getPlaylists,
} from "@/api/playlist.js";
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
      pageSize: 50,
      total: 0,
      currentPage: 1,
      scrollTop: 0,
      loaded: false,
    };
  },
  components: {
    Container,
    PlaylistItem,
    Loading,
    Pagination,
  },
  computed: {
    offset() {
      return (this.currentPage - 1) * this.pageSize;
    },
  },
  methods: {
    // 翻页
    changeCurrentPage() {
      this.getPlaylistsData();
    },
    closePanel() {
      this.showCate = false;
    },
    // 切换歌单分类
    changeTag(tag) {
      this.currentTag = tag;
      this.showCate = false;
    },
    // 切换歌单分类面板状态
    change(status = null) {
      if (status == null) {
        this.showCate = !this.showCate;
      } else {
        this.showCate = status;
      }
    },
    // 获取歌单列表
    async getPlaylistsData() {
      this.playlists = [];
      this.loaded = false;
      let { playlists, total } = await getPlaylists({
        cat: this.currentTag.name,
        limit: this.pageSize,
        offset: this.offset,
      });
      this.playlists = playlists;
      this.total = total;
      this.loaded = true;
    },
    getScrollTop(e) {
      this.scrollTop = e.target.scrollTop;
    },
    async getData() {
      const res = await axios.all([getHotPlaylistCate(), getPlaylistCate()]);
      // 获取热门歌单分类
      this.hotTags = res[0].tags;
      // 获取歌单分类
      this.playlistCate = res[1].sub;
      this.all = res[1].all;
      this.categories = res[1].categories;
      this.currentTag = this.$route.params.tag || this.all;
      this.getPlaylistsData();
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    this.$refs.page.addEventListener("scroll", this.getScrollTop);
    // 添加关闭歌单分类窗口的事件
    const app = document.getElementById("app");
    app.addEventListener("click", this.closePanel);
  },
  activated() {
    this.$refs.page.scrollTo(0, this.scrollTop);
  },
  beforeDestroy() {
    this.$refs.page.removeEventListener("scroll", this.getScrollTop);
    // 移除关闭歌单分类窗口的事件
    const app = document.getElementById("app");
    app.removeEventListener("click", this.closePanel);
  },
  watch: {
    currentTag() {
      // 获取歌单数据
      this.currentPage = 1;
      this.getPlaylistsData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("~@/styles/variables.scss");
.view-playlist {
  height: 100%;
  box-sizing: border-box;
  overflow: overlay;
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
    box-shadow: 0 0 5px 1px rgba($color: #000, $alpha: 0.1);
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

      > span {
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

          > span {
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
  > span.tag {
    display: inline-block;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
    padding: 0 8px;
    margin: 0 3px;
    cursor: pointer;
    color: var(--color-level3);
    &:hover {
      color: var(--color-level2);
    }
    &.active {
      color: var(--color-netease-red);
      background-color: var(--playlist-tag-active-bg-color);
    }
  }
}
</style>
