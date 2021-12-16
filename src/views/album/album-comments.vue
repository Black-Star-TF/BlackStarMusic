<template>
  <div class="album-comment-wrapper">
    <comment :type="type" :id="id"></comment>
  </div>
</template>

<script>
import RESOURCE_TYPE from "@/utils/resource-type";
import Comment from "@/views/resource-comment/components/comment.vue";
export default {
  components: {
    Comment,
  },
  props: {
    id: {
      required: true,
    },
  },
  data() {
    return {
      type: RESOURCE_TYPE.ALBUM,
    };
  },
};
</script>

<style lang="scss" scoped>
.album-comment-wrapper {
  padding: 20px 30px;
}
</style>
