<template>
  <div class="view-recent">
    <page-header>
      <div class="page-name">最近播放</div>
    </page-header>

    <div class="recent-header">
      <div class="count">共{{ trackList.length }}首</div>
      <div class="operation">
        <span class="play-all">
          <span class="play" @click="playAll">
            <span class="iconfont icon-bofang"></span>播放全部
          </span>
          <span class="add" @click="addToPlaylist">
            <span class="iconfont icon-jia"></span>
          </span>
        </span>
        <span class="clear" @click="clearHistory">清空列表</span>
      </div>
    </div>

    <div class="recent-tracks-table">
      <div class="table-header">
        <div class="header column index"></div>
        <div class="header column track-name">音乐标题</div>
        <div class="header column track-artists">歌手</div>
        <div class="header column track-play-date">播放时间</div>
      </div>

      <div
        class="table-row"
        v-for="(track, index) in trackList"
        :key="`${index}-${track.id}`"
        @dblclick="playTrack(track)"
      >
        <div class="row column index">
          <span>{{ formatIndex(index + 1) }}</span>
        </div>

        <div class="row column track-name">
          <div class="track-name-content">
            <span class="main-name">{{ track.name }}</span>
            <span class="alias-name" v-if="track.alia.length > 0">
              ({{ track.alia[0] }})</span
            >
          </div>
          <span class="track-tag-sq iconfont icon-sq" v-if="false"></span>
          <span
            class="track-tag-mv iconfont icon-shipin"
            v-if="track.mv !== 0"
            @click="playVideo(track.mv)"
          ></span>
        </div>

        <div class="row column track-artists">
          <span class="track-artists-content" v-if="track.type==='song'">
            <span
              class="artist"
              v-for="(artist, index) in track.ar"
              :key="`${index}-${artist.id}`"
            >
              <span class="artist-name" @click="toArtistDetail(artist.id)">{{
                artist.name
              }}</span>
              <span class="separator" v-if="index < track.ar.length - 1">
                /
              </span>
            </span>
          </span>

          <span class="track-artists-content" v-else>
            <span class="artist">
              <span class="artist-name" @click="toRadioDetail(track.ar[0].id)">
                {{ track.ar[0].name }}
              </span>
            </span>
          </span>
        </div>
        <div class="row column track-play-date">
          <span>{{ setDate(track.playDate) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  toAlbumDetail,
  toArtistDetail,
  markKeyword,
  playVideo,
  toRadioDetail
} from "@/utils/methods";
import { formatDate } from "@/utils/filters";
import Loading from "@/components/common/loading";
import PageHeader from "@/components/common/page-header";
import { mapState } from "vuex";
export default {
  components: {
    PageHeader,
    Loading,
  },
  computed: {
    ...mapState(["player"]),
    history() {
      return JSON.parse(JSON.stringify(this.player.history));
    },
    trackList() {
      return this.player.history;
    },
  },
  methods: {
    toAlbumDetail,
    toArtistDetail,
    playVideo,
    formatDate,
    toRadioDetail,
    addToPlaylist() {
      this.player.addTracksToPlaylist(this.history.map(item => item.id));
    },
    clearHistory() {
      this.player.clearHistory();
    },
    playAll() {
      let list = this.history.map(item => item.id);
      if (list.length > 0) {
        this.player.playTrackFromPlaylist(list[0], list);
      }
    },
    playTrack(track) {
      this.player.playTrack(track);
    },
    formatIndex(index) {
      if (this.pageNum && this.limit) {
        let num = (this.pageNum - 1) * this.limit + index;
        return num > 9 ? num : "0" + num;
      } else {
        return index > 9 ? index : "0" + index;
      }
    },
    setDate(date) {
      let time = new Date().getTime() - date;
      time = Math.ceil(time / 1000);
      if (time < 60) {
        return "刚刚";
      } else if (time < 3600) {
        return `${Math.floor(time / 60)}分钟前`;
      } else if (time < 60 * 60 * 24) {
        return `${Math.floor(time / 3600)}小时前`;
      } else {
        return this.formatDate(date);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.view-recent {
  height: 100%;
  overflow: overlay;
}
.page-name {
  height: 100%;
  line-height: inherit;
  font-size: 15px;
  font-weight: bold;
  color: var(--color-level2);
  padding-left: 25px;
}

.recent-header {
  height: 90px;
  padding: 0 25px;
  .count {
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    color: var(--color-level4);
    margin: 15px 0;
  }
  border-bottom: 1px solid var(--color-level5);
}

.operation {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .play-all {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    color: #fff;
    border-radius: 16px;
    cursor: pointer;
    margin-right: 10px;
    font-size: 14px;
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
  .clear {
    font-size: 14px;
    color: var(--link-color);
    cursor: pointer;
    &:hover {
      color: var(--link-hover-color);
    }
  }
}

.table-header {
  height: 40px;
  line-height: 40px;
  display: flex;
  font-size: 13px;
  color: var(--color-level4);
  padding: 0 30px;
}

.table-row {
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
  display: flex;
  font-size: 13px;
  &:nth-of-type(2n + 1) {
    background-color: var(--table-stripe-color);
  }
  &:hover {
    background-color: var(--table-hover-color);
  }
  .index {
    color: var(--color-level5);
    .iconfont {
      color: var(--color-netease-red);
    }
  }

  .track-name {
    display: flex;
    .track-name-content {
      @include ellipsis;
      color: var(--color-level2);
      .main-name {
        &:hover {
          color: var(--color-level1);
        }
        &.active {
          color: var(--color-netease-red);
        }
      }
      .alias-name {
        color: var(--color-level4);
      }
    }
    .iconfont {
      color: var(--color-netease-red);
      display: inline-block;
      margin-left: 5px;
      &.track-tag-sq {
        font-size: 22px;
      }
      &.track-tag-mv {
        cursor: pointer;
        font-size: 16px;
      }
    }
  }

  .track-artists {
    @include ellipsis;
    color: var(--color-level3);
    .artist-name {
      cursor: pointer;
      &:hover {
        color: var(--color-level2);
      }
    }
    .separator {
      color: var(--color-level4);
    }
  }

  .track-play-date {
    color: var(--color-level4);
  }
}

.column {
  overflow: hidden;
  margin-right: 15px;
  &:nth-last-of-type(1) {
    margin-right: 0;
  }
}

.index {
  width: 30px;
}
.track-name {
  flex: 4;
}
.track-artists {
  flex: 3;
}
.track-play-date {
  flex: 2;
}
</style>
