<template>
  <!-- :multiple="multiple" -->
  <el-select
    v-model="modelValue"
    :clearable="clearable"
    :multiple="multiple"
    :value-key="treeProps.value"
    :disabled="disabled"
    @clear="handleClear"
    :size="size"
    @visible-change="handleVisibleChange"
    ref="select"
    popper-class="select-popper"
  >
    <el-option
      style="display: none"
      v-for="item in selectOptions"
      :key="item[treeProps.value]"
      :value="item[treeProps.value]"
      :label="item[treeProps.label]"
    />
    <el-input
      size="small"
      ref="search"
      v-model="searchKeyword"
      placeholder="输入以进行搜索"
    ></el-input>
    <el-tree
      class="select-tree"
      :data="options"
      :props="treeProps"
      :filter-node-method="filterNode"
      :node-key="treeProps.value"
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
      ref="tree"
    >
      <span
        class="custom-tree-node"
        :class="getCurrentClass(data)"
        slot-scope="{ node, data }"
      >
        {{ node[treeProps.label] }}
      </span>
    </el-tree>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      oldParentList: [],
      searchKeyword: "",
      timeout: null,
    };
  },
  model: {
    prop: "value",
    event: "selected",
  },
  props: {
    value: [String, Number, Array],
    size: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    options: {
      type: Array,
      required: true,
    },
    treeProps: {
      type: Object,
      default: () => ({
        children: "children",
        label: "label",
        value: "value",
      }),
    },
  },
  computed: {
    modelValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("selected", val);
      },
    },
    selectOptions() {
      return this.formatTreeToArray(this.options, this.treeProps.children);
    },
  },
  methods: {
    handleVisibleChange(visible) {
      if (!visible) {
        this.$nextTick(() => {
          this.$refs.tree.store._getAllNodes().forEach(node => {
            node.expanded = false;
          });
        });
      } else {
        this.$nextTick(() => {
          let value = this.multiple
            ? this.value
            : this.value == undefined
            ? []
            : [this.value];
          value.forEach(item => {
            let node = this.$refs.tree.getNode(item);
            this.expandParents(node.parent);
          });
        });
      }
    },
    filterNode(value, data, node) {
      if (!value) return true;
      let _array = []; //这里使用数组存储 只是为了存储值。
      this.getReturnNode(node, _array, value);
      let result = false;
      _array.forEach(item => {
        result = result || item;
      });
      return result;
    },
    getReturnNode(node, _array, value) {
      // 获取搜索的字段
      let label = this.treeProps.label;
      let isPass =
        node.data && node.data[label] && node.data[label].indexOf(value) !== -1;
      isPass ? _array.push(isPass) : "";
      this.index++;
      if (!isPass && node.level != 1 && node.parent) {
        this.getReturnNode(node.parent, _array, value);
      }
    },
    clearActiveClass() {
      this.oldParentList.forEach(node => {
        // 删除active类名
        node.parentNode.classList.remove("active");
      });
    },
    getCurrentClass(node) {
      if (!this.multiple) {
        return this.value == node[this.treeProps.value] ? "currentNode" : null;
      } else {
        return this.value.includes(node[this.treeProps.value])
          ? "currentNode"
          : null;
      }
    },
    // 将树结构转化为数组
    formatTreeToArray(tree, childrenKey) {
      let arr = [];
      function toArray(arr, tree, childrenKey) {
        if (!tree) return;
        for (let item of tree) {
          let keys = Object.keys(item);
          let obj = {};
          for (let key of keys) {
            if (key === childrenKey) continue;
            obj[key] = JSON.parse(JSON.stringify(item[key]));
          }
          arr.push(obj);
          toArray(arr, item[childrenKey], childrenKey);
        }
      }
      toArray(arr, tree, childrenKey);
      return arr;
    },
    handleClear() {
      if (!this.multiple) {
        this.$emit("selected", null);
      } else {
        this.$emit("selected", []);
      }
    },
    handleNodeClick(nodeData) {
      if (!this.multiple) {
        this.$emit("selected", nodeData[this.treeProps.value]);
        this.$refs.select.blur();
      } else {
        let index = this.value.findIndex(
          item => item === nodeData[this.treeProps.value]
        );
        let value = JSON.parse(JSON.stringify(this.value));
        if (index >= 0) {
          value.splice(index, 1);
        } else {
          value.push(nodeData[this.treeProps.value]);
        }
        this.$emit("selected", value);
      }
    },
    getNodeByValue(value) {
      let node = {};
      let props = this.treeProps;
      function getDepartOfId(value, tree, props) {
        if (!tree) {
          return null;
        }
        for (let item of tree) {
          if (item[props.value] === value) {
            //找到部门
            node = Object.assign({}, item);
            return;
          }
          getDepartOfId(value, item[props.children], props);
        }
      }
      getDepartOfId(value, this.options, props);
      return node;
    },
    expandParents(node) {
      if (!node) {
        clearTimeout(this.timeout);
        this.timeout = null;
        this.timeout = setTimeout(() => {
          let dom = this.$refs.tree.$el.querySelectorAll(".currentNode")[0];
          this.$refs.search.$el.style.marginTop = "10px";
          dom.parentNode.scrollIntoView({ block: "start", behavior: "smooth" });
        }, 300);
        return;
      }
      // 展开所有祖宗节点
      node.expanded = true;
      this.expandParents(node.parent);
    },
  },
  watch: {
    value() {
      this.$nextTick(() => {
        this.clearActiveClass();
        let nodeList = this.$refs.tree.$el.querySelectorAll(".currentNode");
        nodeList.forEach(node => {
          // 添加active类名
          node.parentNode.classList.add("active");
          // console.dir(node.parentNode);
        });
        this.oldParentList = nodeList;
      });
    },
    searchKeyword(val) {
      this.$refs.tree.filter(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.select-popper {
  max-height: 300px;
  .select-tree {
    margin: 0 10px;
    ::v-deep .el-tree-node__content {
      &.active {
        background-color: #f0f7ff;
      }
    }
  }
  .el-input {
    width: calc(100% - 20px);
    margin: 0 10px;
    display: block;
    margin-bottom: 5px;
  }
}
.select-popper {
  .el-select-dropdown__list {
    padding: 0;
  }
}

.custom-tree-node {
  font-size: 13px;
}
</style>
