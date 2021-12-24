<template>
  <div class="resource-comment-wrapper">
    <page-header>
      <div class="page-title">资源评论</div>
    </page-header>
    <comment :type="type" :id="id"></comment>
  </div>
</template>

<script>
import PageHeader from "@/components/common/page-header";
import Comment from "./components/comment"
export default {
  components: {
    PageHeader,
    Comment
  },
  data() {
    return {
      id: null,
      type: null
    };
  },
  computed: {},
  methods: {},
  created() {
    const {id, type} = this.$route.query
    this.id = id
    this.type= parseInt(type)
  },
};
</script>

<style lang="scss" scoped>
.resource-comment-wrapper {
  height: 100%;
  box-sizing: border-box;
  padding: 10px 30px;
  overflow: overlay;
}
.page-title{
  height: 100%;
  line-height: inherit;
  font-size: 15px;
  font-weight: bold;
  color: var(--color-level2);
  padding-left: 25px;
}
</style>
