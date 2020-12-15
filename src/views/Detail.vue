<template>
  <div>
    <h2>detail page</h2>
    <p>{{$route.params.name}} ...</p>
  </div>
</template>

<script>
export default {
  watch: {
    $route: {
      handler: () => {
        console.log("$route change");
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>