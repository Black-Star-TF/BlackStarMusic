<template>
  <div class="settings">
    <!-- <tree-select v-model="value" multiple size="small"  :options="treeData" :treeProps="treeProps" clearable></tree-select> {{value}} -->
  </div>
</template>

<script>
// import TreeSelect from '@/components/tree-select'
export default {
  name: '',
  mixins: [],
  components: {
    // TreeSelect
  },
  data () {
    return {
      value: [],
      treeProps: {
        children: 'children',
        value: 'id',
        label: 'label'
      },
      treeData: [{
                id: 0,
                label: '一年级',
                children: [{
                    id: 10,
                    label: '语文'
                }, {
                    id: 11,
                    label: '数学'
                }]
            }, {
                id: 1,
                label: '二年级',
                children: [{
                    id: 20,
                    label: '语文'
                }, {
                    id: 21,
                    label: '数学'
                }, {
                    id: 22,
                    label: '英语'
                }]
            }, {
                id: 2,
                label: '三年级',
                children: [{
                    id: 30,
                    label: '语文'
                }, {
                    id: 31,
                    label: '数学'
                }, {
                    id: 32,
                    label: '英语'
                }, {
                    id: 33,
                    label: '自然'
                },
                {
                    id: 34,
                    label: '自然'
                },
                {
                    id: 35,
                    label: '自然'
                },
                {
                    id: 36,
                    label: '自然'
                }]
            }]
    }
  },
  computed: {},
  methods: {
      
  },
  filters: {},
  created () {}
}
</script>

<style lang="scss" scoped>

</style>
