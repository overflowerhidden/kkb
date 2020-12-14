<template>
  <div>
    <!-- 表单输入绑定 -->
    <input
      :value="value"
      @input="onInput"
      v-on:keydown.enter="addCourse"
      v-focus
    >
    <!-- 事件处理 -->
    <button @click="addCourse">新增课程</button>
  </div>
</template>

<script>
export default {
  props: ["value"],
  methods: {
    addCourse() {
      this.$emit("add-course");
      this.course = "";
    },
    onInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>