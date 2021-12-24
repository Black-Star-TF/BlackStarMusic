<template>
  <div class="view-friend">
    <!-- <developing /> -->
    <el-select v-model="value">
      <el-option v-for="item in list" :label="item.name" :value="item.value" :key="item.value">

      </el-option>
    </el-select>
  </div>
</template>

<script>
import Developing from "@/components/common/developing";
export default {
  components: {
    Developing,
  },
  data() {
    return {
      value: '',
      list: [
        {
          name: 'aaa',
          value: '123'
        },
        {
          name: 'bbb',
          value: '1234'
        }
      ]
    };
  },
  computed: {},
  methods: {},
  filters: {},
  created() {},
};
</script>

<style lang="scss" scoped>
.view-friend {
  height: 100%;
  padding: 30px 0;
  box-sizing: border-box;
  overflow: overlay;
}
</style>
