<template>
  <div class="page-playlist-detail" v-if="playlist">
    <!-- playlist info -->
    <div class="playlist-detail-header">
      <div
        class="playlist-cover"
        :style="{ backgroundImage: `url(${playlistCoverUrl})` }"
      ></div>
      <div class="playlist-info">
        <div class="playlist-name">
          <div class="type">歌单</div>
          <div class="name">{{ playlist.name }}</div>
        </div>
        <div class="playlist-creator">
          <span
            class="creator-cover"
            @click="toUserDetail(playlist.creator.userId)"
            :style="{ backgroundImage: `url(${userCoverUrl})` }"
          ></span>
          <span
            class="creator-name"
            @click="toUserDetail(playlist.creator.userId)"
            >{{ playlist.creator.nickname }}</span
          >
          <span class="create-time"
            >{{ playlist.createTime | formatDate }}创建</span
          >
        </div>
        <div class="playlist-operation">
          <span class="play-all operation-item">
            <span class="play" @click="playAll()">
              <span class="iconfont icon-bofang"></span>播放全部
            </span>
            <span class="add" @click="addToPlaylist">
              <span class="iconfont icon-jia"></span>
            </span>
          </span>
          <!-- 收藏 -->
          <span
            class="subscribe operation-item"
            v-if="!playlist.subscribed"
            @click="handleSubscribePlaylist(1)"
          >
            <span class="iconfont icon-shoucang"></span>
            收藏({{ playlist.subscribedCount | formatCount }})
          </span>
          <!-- 已收藏 -->
          <span
            class="subscribe operation-item"
            v-else
            @click="handleSubscribePlaylist(2)"
          >
            <span class="iconfont icon-shoucangchenggong"></span>
            已收藏({{ playlist.subscribedCount | formatCount }})
          </span>

          <span class="share operation-item">
            <span class="iconfont icon-fenxiang"></span>
            分享({{ playlist.shareCount | formatCount }})
          </span>
          <span class="download-all operation-item">
            <span class="iconfont icon-xiazai"></span>
            下载全部
          </span>
        </div>
        <div class="playlist-tags" v-if="playlist.tags.length > 0">
          标签：
          <span
            class="tag-item"
            v-for="item in playlist.tags"
            :key="item"
            @click="toPlaylist(item)"
            >{{ item }}</span
          >
        </div>
        <div class="playlist-play-data">
          歌曲数: <span>{{ playlist.trackCount }}</span> 播放数:
          <span>{{ playlist.playCount | formatCount }}</span>
        </div>
        <div
          class="playlist-profile"
          :class="{ show: showDesc }"
          v-if="playlist.description"
        >
          <div
            class="switch"
            :class="{ show: showDesc }"
            @click="changeDesc"
          ></div>
          简介：<span>{{ playlist.description }}</span>
        </div>
      </div>
    </div>
    <div class="playlist-detail-nav">
      <tab-nav>
        <template v-slot:left>
          <div
            v-for="item in modeList"
            :key="item.name"
            :class="{ active: mode == item.name }"
            @click="mode = item.name"
          >
            {{ item.label }}
            <span class="comment-count" v-if="item.name == 'comment'"
              >({{ playlist.commentCount | formatCount }})</span
            >
          </div>
        </template>
      </tab-nav>
    </div>

    <div class="playlist-detail-content">
      <playlist-songs
        v-if="mode == 'songlist'"
        :playlist="{ id: playlist.id, name: playlist.name }"
      ></playlist-songs>
      <playlist-comments v-if="mode == 'comment'" :id="id"></playlist-comments>
      <playlist-subscribers
        v-if="mode == 'subscriber'"
        :id="id"
      ></playlist-subscribers>
    </div>
  </div>
</template>

<script>
import {
  toUserDetail,
  playPlaylist,
  getSongsOfPlaylist,
} from "@/utils/methods";
import { formatCount, formatDate } from "@/utils/filters";
import TabNav from "@/components/common/tab-nav";
import { getPlaylistDetail, subscribePlaylist } from "@/api/playlist";
import PlaylistSongs from "./playlist-songs.vue";
import PlaylistComments from "./playlist-comments.vue";
import PlaylistSubscribers from "./playlist-subscribers.vue";
import { size_1v1_std, size_1v1_small } from "@/utils/img-size.js";
import RESOURCE_TYPE from "@/utils/resource-type";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    TabNav,
    PlaylistSongs,
    PlaylistComments,
    PlaylistSubscribers,
  },
  data() {
    return {
      id: null,
      type: RESOURCE_TYPE.PLAYLIST,
      playlist: null,
      showDesc: false,
      mode: "songlist",
      modeList: [
        { name: "songlist", label: "歌曲列表" },
        { name: "comment", label: "评论" },
        { name: "subscriber", label: "收藏者" },
      ],
    };
  },
  computed: {
    ...mapState(["player"]),
    playlistCoverUrl() {
      return `${this.playlist.coverImgUrl}?param=${size_1v1_std}`;
    },
    userCoverUrl() {
      return `${this.playlist.creator.avatarUrl}?param=${size_1v1_small}`;
    },
  },
  methods: {
    toUserDetail,
    ...mapActions(["getUserPlaylist"]),
    async handleSubscribePlaylist(type) {
      const res = await subscribePlaylist({ t: type, id: this.id });
      if (type === 1) {
        this.$message.success("收藏成功");
      } else {
        this.$message.success("取消收藏");
      }
      this.getData(new Date().getTime());
      this.getUserPlaylist();
    },
    async addToPlaylist() {
      if (this.playlist && this.playlist.trackCount > 0) {
        const list = await getSongsOfPlaylist({
          id: this.playlist.id,
          name: this.playlist.name,
        });
        this.$store.state.player.addTracksToPlaylist(list);
        this.$message.success("添加成功");
      }
    },
    async playAll() {
      // 播放当前歌单
      if (this.playlist && this.playlist.trackCount > 0) {
        playPlaylist({ id: this.playlist.id, name: this.playlist.name });
      }
    },
    changeDesc() {
      this.showDesc = !this.showDesc;
    },
    toPlaylist(tagName) {
      this.$router.push({
        name: "playlist",
        params: {
          tag: {
            name: tagName,
          },
        },
      });
    },
    init() {
      this.id = this.$route.query.id;
      this.playlist = null;
    },
    async getData(timestamp = null) {
      let { playlist } = await getPlaylistDetail({ id: this.id, timestamp });
      this.playlist = playlist;
    },
  },
  filters: {
    formatDate,
    formatCount,
  },
  created() {
    this.init();
    this.getData();
  },
  watch: {
    $route() {
      this.init();
      this.getData();
      this.mode = "songlist";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.page-playlist-detail {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  @include scroll-style;
  .playlist-detail-header {
    width: 100%;
    padding: 0 30px;
    padding-top: 10px;
    box-sizing: border-box;
    @include clearfix;
    .playlist-cover {
      float: left;
      width: 200px;
      height: 200px;
      @include background;
      border-radius: 5px;
      margin-right: 30px;
      border: 1px solid var(--main-border-color);
      box-sizing: border-box;
    }
    .playlist-info {
      float: left;
      width: calc(100% - 230px);
      .playlist-name {
        line-height: 30px;
        font-size: 24px;
        color: var(--color-level2);
        display: flex;
        .type {
          margin-top: 5px;
          font-size: 14px;
          text-align: center;
          width: 40px;
          height: 20px;
          line-height: 18px;
          margin-right: 10px;
          box-sizing: border-box;
          border: 1px solid var(--color-netease-red);
          color: var(--color-netease-red);
          border-radius: 3px;
        }
        .name {
          flex: 1;
        }
      }
      .playlist-creator {
        height: 35px;
        line-height: 35px;
        font-size: 13px;
        margin: 10px 0;
        .creator-cover {
          float: left;
          width: 25px;
          height: 25px;
          margin: 5px 0;
          border-radius: 50%;
          @include background;
          cursor: pointer;
        }
        .creator-name {
          cursor: pointer;
          color: var(--link-color);
          margin: 0 10px;
          &:hover {
            color: var(--link-hover-color);
          }
        }
        .create-time {
          color: var(--color-level3);
        }
      }

      .playlist-operation {
        margin: 11px 0;
        .operation-item {
          display: inline-block;
          padding: 0 15px;
          height: 30px;
          line-height: 30px;
          color: var(--color-level2);
          border-radius: 16px;
          border: 1px solid var(--color-level5);
          cursor: pointer;
          margin-right: 10px;
          font-size: 14px;
          &:hover {
            background-color: var(--operation-btn-hover-bg-color);
          }
        }

        .play-all {
          border-color: var(--color-netease-red);
          color: #fff;
          padding: 0;
          background-color: var(--color-netease-red);
          &:hover {
            background-color: var(--color-netease-red);
          }
          .play {
            display: inline-block;
            padding: 0 10px;
            line-height: 30px;
            border-right: 1px solid rgba($color: #fff, $alpha: 0.3);
            .iconfont {
              display: inline-block;
              width: 25px;
              height: 25px;
              font-size: 12px;
              text-align: center;
              margin: 0 2px;
              transform: scale(0.7);
              line-height: 25px;
              border-radius: 50%;
              border: 1px solid #fff;
              &::before {
                position: relative;
                left: 1px;
              }
            }
          }
          .add {
            display: inline-block;
            padding: 0 10px;
            line-height: 30px;
          }
        }
      }

      .playlist-tags {
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        color: var(--color-level2);
        .tag-item {
          cursor: pointer;
          color: var(--link-color);
          margin-right: 5px;
          &:hover {
            color: var(--link-hover-color);
          }
        }
      }

      .playlist-play-data {
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        color: var(--color-level2);
        span {
          color: var(--color-level3);
          margin-right: 5px;
        }
      }

      .playlist-profile {
        font-size: 13px;
        line-height: 25px;
        padding-right: 20px;
        color: var(--color-level2);
        overflow: hidden;
        position: relative;
        @include ellipsis;
        span {
          color: var(--color-level3);
        }
        .switch {
          position: absolute;
          width: 0;
          height: 0;
          right: 0;
          top: 10px;
          border: 7px solid transparent;
          border-top-color: var(--color-level2);
          &.show {
            top: 5px;
            border-color: transparent;
            border-bottom-color: var(--color-level2);
          }
        }
        &.show {
          overflow: visible;
          span {
            white-space: pre-wrap;
          }
        }
      }
    }
  }

  .playlist-detail-nav {
    padding: 0 30px;
    margin-top: 20px;
    .comment-count {
      font-size: 12px;
    }
  }
  .playlist-detail-content {
    margin-top: 1px;
  }
}

.comment-container {
  padding: 20px 30px;
}
</style>
