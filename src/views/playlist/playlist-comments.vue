<template>
  <div class="playlist-comment-wrapper">
    <comment :type="type" :id="id"></comment>
  </div>
</template>

<script>
import Comment from '@/views/resource-comment/components/comment.vue'
import RESOURCE_TYPE from '@/utils/resource-type'
export default {
  components: {
    Comment
  },
  props: {
    id: {
      required: true
    }
  },
  data () {
    return {
      type: RESOURCE_TYPE.PLAYLIST,
    }
  },
}
</script>

<style lang="scss" scoped>
.playlist-comment-wrapper{
  padding: 20px 30px;
}
</style>
