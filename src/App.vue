<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <!-- 插槽实现内容分发 -->
    <message
      :show.sync="show"
      class="success"
    >
      <!-- 具名插槽 -->
      <!-- <template v-slot:title>恭喜</template> -->
      <!-- 作用于插槽 -->
      <template v-slot:title="slotProps">{{ slotProps.user.firstName }}</template>
      <template>新增课程成功！</template>
    </message>

    <message
      :show.sync="showWarn"
      class="warning"
    >
      <template v-slot:title>警告</template>
      <template>请输入课程名称！</template>
    </message>

    <!-- 派发关闭事件 -->
    <div
      class="toolbar"
      v-permission="'admin'"
    >
      <button @click="$EventBus.$emit('message-close')">清空提示框</button>
    </div>

    <h1 :title="title">{{title}}</h1>

    <!--添加批量价格更新-->
    <p>
      <input v-model.number="price">
      <button @click="batchUpdate">批量更新价格</button>
    </p>

    <p>
      <!-- 绑定表达式 -->
      <!-- 课程总数：{{courses.length +'门'}} -->
      <!-- 计算属性 -->
      <!-- 课程总数：{{total}} -->
      <!-- 监听器 -->
      课程总数：{{totalCount}}
    </p>

    <!-- 新增课程 -->
    <CoursesAdd
      v-model="course"
      @add-course='addCourse'
    ></CoursesAdd>

    <!-- 课程列表 -->
    <CoursesList :courses="courses"></CoursesList>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import CoursesList from "./components/CoursesList.vue";
import CoursesAdd from "./components/CoursesAdd.vue";
import Message from "./components/Message.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    CoursesList,
    CoursesAdd,
    Message,
  },
  data() {
    return {
      title: "welcome",
      courses: [],
      course: "",
      price: 0, // 增加价格数据
      // selectCourse: "",
      totalCount: "0门",
      show: false, // 提示框状态
      showWarn: false, // 控制警告信息显示状态
    };
  },
  computed: {
    total() {
      return this.courses.length + "门";
    },
  },
  async created() {
    const courses = await this.getCourses();
    this.courses = courses;
  },
  methods: {
    addCourse() {
      if (this.course != "") {
        this.courses.push(this.course);
        this.course = "";

        // 提示新增信息
        this.show = true;
      } else {
        // 提示警告信息
        this.showWarn = true;
      }
    },
    getCourses() {
      return axios.get("/api/courses").then((res) => res.data);
    },
    // 添加批量价格更新方法
    batchUpdate() {
      this.courses.forEach((c) => {
        // c.price = this.price; // no ok
        this.$set(c, "price", this.price); // ok
      });
    },
  },
  watch: {
    //   courses(newValue) {
    //     // 这种写法初始化不触发
    //     this.totalCount = newValue.length + "门";
    //   },
    courses: {
      immediate: true,
      // deep: true,
      handler(newValue) {
        this.totalCount = newValue.length + "门";
      },
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.active {
  background-color: #ddd;
}

.message-box {
  padding: 10px 20px;
}
.success {
  background: #4fc08d;
  border: 1px solid #42b983;
}
.warning {
  background: #f66;
  border: 1px solid #d63200;
}
.message-box-close {
  float: right;
}

/* 定义过度动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
