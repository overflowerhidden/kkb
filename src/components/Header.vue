<script>
export default {
  props: ["level", "title"],
  render(h) {
    return h("h" + level, this.$slots.default);
  },
};
</script>