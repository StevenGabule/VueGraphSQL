import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Posts from "../components/Posts/Posts";
import Signin from "../components/Auth/Signin";
import Signup from "../components/Auth/Signup";
import AddPost from "../components/Posts/AddPost";
import Profile from "../components/Auth/Profile";
import AuthGuard from "./AuthGuard";
import Post from "../components/Posts/Post";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/posts/:postId',
    name: 'Post',
    component: Post,
    props: true
  },
  {
    path: '/post/add',
    name: 'AddPost',
    component: AddPost,
    beforeEnter: AuthGuard
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: Signin
  },
  {
    path: '/signup',
    name: 'SignUn',
    component: Signup
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: AuthGuard
  },
];

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
});

export default router
