import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Posts from "../components/Posts/Posts";
import Signin from "../components/Auth/Signin";
import Signup from "../components/Auth/Signup";
import AddPost from "../components/Posts/AddPost";
import Profile from "../components/Auth/Profile";

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
    path: '/add-post',
    name: 'AddPost',
    component: AddPost
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
    component: Profile
  },
];

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
});

export default router
