export default {
  props: {
    num: {
      type: Number,
      default: 4,
    },
    index: {
      type: Number,
      required: true,
    },
    margin: {
      type: Number,
      default: 20,
    },
  },
  computed: {
    style() {
      return {
        width: `calc((100% - ${(this.num - 1) * this.margin}px) / ${this.num})`,
        marginRight:
          (this.index + 1) % this.num == 0 ? "0" : `${this.margin}px`,
      };
    },
  },
};
