import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Comments from "../components/Comments.vue";
import User from "../components/User.vue";
import CsvReader from "../components/CsvReader.vue";
import CsvApi from "../components/CsvApi.vue";
import fileUpload from "../components/fileUpload.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/comments/:id",
    name: "Comments",
    component: Comments
  },
  {
    path: "/user/:id",
    name: "User",
    component: User
  },

  {
    path: "/csv",
    name: "CsvReader",
    component: CsvReader
  },
  {
    path: "/read",
    name: "fileUpload",
    component: fileUpload
  },
  {
    path: "/data",
    name: "CsvApi",
    component: CsvApi
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
