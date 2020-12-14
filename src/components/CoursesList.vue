<template>
  <div>
    <!-- 条件判断 -->
    <p v-if="courses.length === 0">没有任何课程信息</p>
    <!-- 循环 列表渲染 -->
    <ul>
      <li
        v-for="c in courses"
        :key="c.name"
        :class='{active:(selectCourse === c)}'
        @click="selectCourse = c"
      >
        <!--添加批量价格更新-->
        {{ c.name }} - {{ c.price | currency() }}
      </li>
    </ul>
  </div>
</template>

<script>
// 混入
var mixin = {
  created: function () {
    this.hello();
  },
  methods: {
    hello: function () {
      console.log("hello from mixin!");
    },
  },
};

export default {
  mixins: [mixin],
  props: {
    courses: {
      type: Array,
    },
  },
  filters: {
    currency(value, symbol = "￥") {
      return symbol + value;
    },
  },
  data() {
    return {
      selectCourse: "",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>