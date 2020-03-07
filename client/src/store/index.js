import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index';
import {defaultClient as apolloClient} from '../main'
import {GET_CURRENT_USER, GET_POSTS, SIGNIN_USER, SIGNUP_USER} from "./queries";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts: [],
        user: null,
        loading: false
    },
    mutations: {
        setPosts: (state, payload) => {
            state.posts = payload;
        },
        setLoading: (state, payload) => {
            state.loading = payload;
        },
        setUser: (state,payload) => {
            state.user = payload;
        },
        clearUser: state => (state.user = null)
    },
    actions: {
        getCurrentUser: ({commit}) => {
            commit('setLoading', true);
            apolloClient.query({
                query: GET_CURRENT_USER
            }).then(({data}) => {
                // console.log(data.getCurrentUser);
                commit('setUser',  data.getCurrentUser);
                commit('setLoading', false);
            }).catch(err => {
                console.error(err);
                commit('setLoading', false);
            });
        },

        getPosts: ({commit}) => {
            commit('setLoading', true);
            // use apolloClient to fire getPosts query
            apolloClient.query({
                query: GET_POSTS
            }).then(({data}) => {
                // get data from actions to state via mutations
                // commit passes data from actions along to mutation functions
                commit('setPosts', data.getPosts);
                commit('setLoading', false);
            }).catch(err => {
                console.error(err);
                commit('setLoading', false);
            });
        },

        signInUser: ({commit}, payload) => {
            localStorage.setItem("token", "");
            apolloClient.mutate({
                mutation: SIGNIN_USER,
                variables: payload
            }).then(({data}) => {
                console.log(data.signInUser);
                localStorage.setItem("token", data.signInUser.token);
                // to make sure created method is run in main.js (we run getCurrentUser) reload the page
                router.go();
            }).catch(err => {
                console.error(err)
            })
        },

        signUpUser: ({commit}, payload) => {
            apolloClient.mutate({
                mutation: SIGNUP_USER
            })
        },
        signOutUser: async ({commit}) => {
            // clear user in state
            commit('clearUser');

            // remove the token in localstorage
            localStorage.removeItem("token", "");

            // end the session
            await apolloClient.resetStore();

            await router.push("/signin");

        }
    },
    getters: {
        posts: state => state.posts,
        loading: state => state.loading,
        user: state => state.user
    },
    modules: {}
})
