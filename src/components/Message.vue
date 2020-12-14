<template>
  <transition name="fade">
    <div
      class="message-box"
      v-if="show"
    >
      <strong>
        <slot
          name="title"
          :user="user"
        ></slot>
      </strong>
      <slot></slot>
      <span
        class="message-box-close"
        @click="$emit('update:show', false)"
      >X</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["show"],
  data() {
    return {
      user: {
        firstName: "zhao",
        lastName: "peng",
      },
    };
  },
  // 监听关闭事件
  mounted() {
    this.$EventBus.$on("message-close", () => {
      this.$emit("update:show", false);
    });
  },
};
</script>

<style scoped>
</style>