<template>
  <div class="album-item" @click="toAlbumDetail(album.id)">
    <!-- 专辑封面 -->
    <div class="album-cover" :style="{'backgroundImage': `url(${album.picUrl})`}"></div>
    <!-- 专辑名 -->
    <div class="album-name">
      <span class="name">
        <span v-html="markKeyword(album.name)"></span>
        <!-- 专辑别名 -->
        <span class="album-alias" v-if="album.alias.length > 0">(<span v-html="markKeyword(album.alias[0])"></span>)</span>
      </span>
    </div>
    <!-- 歌手 -->
    <div class="album-artist">
      <span class="artist-name" @click.stop="toArtistDetail(album.artist.id)">
        <span v-html="markKeyword(album.artist.name)"></span>
        <span class="artist-alias" v-if="album.artist.alias.length > 0">(<span v-html="markKeyword(album.artist.alias[0])"></span>)</span>
      </span>
    </div>
  </div>
</template>

<script>
	import { toAlbumDetail, toArtistDetail, markKeyword } from '@/utils/methods'
  export default {
    props: {
      album: {
        type: Object,
        required: true
      },
      keyword:{
        type: String
      }
    },
    methods:{
      markKeyword,
      toAlbumDetail,
      toArtistDetail
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
  .album-item{
    width: 100%;
    height: 80px;
    padding: 10px 30px;
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    &:nth-of-type(2n){
      background-color: var(--table-stripe-color);
    }
    &:hover{
      background-color: var(--table-hover-color);
    }
    div{
      height: 60px;
      line-height: 60px;
      margin-left: 20px;
      @include ellipsis;
    }
    .album-cover{
      width: 60px;
      height: 60px;
      border-radius: 5px;
      @include background;
      margin: 0;
    }
    .album-name{
      flex: 1;
      font-size: 14px;
      color: var(--color-level2);
      .name{
        &:hover{
          color: var(--color-level1);
        }
        .album-alias{
          color: var(--color-level4);
        }
      }
    }
    .album-artist{
      flex: 1;
      font-size: 13px;
      color: var(--color-level3);
      .artist-name{
        &:hover{
          color: var(--color-level2);
        }
        .artist-alias{
          color: var(--color-level4);
        }
        .keyword{
          color: var(--color-keyword);
        }
      }
    }
  }
</style>
