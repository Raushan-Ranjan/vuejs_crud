<template>
  <v-app>
    <v-main>
      <!-- <PostList />
      <Comments/> -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
// import PostList from "./components/PostList";
// import Comments from "./components/Comments";

export default {
  name: "App",

  components: {
    // HelloWorld
    // PostList,
    // Comments
  },

  data: () => ({
    //
  })
};
</script>
