<template>
    <v-app style="background-color: #E3E3EE">
        <!-- Side Navigation -->
        <v-navigation-drawer app temporary fixed v-model="sideNav">

            <v-toolbar color="info" dark flat>
                <v-app-bar-nav-icon @click="sideNav = !sideNav"></v-app-bar-nav-icon>
                <router-link to="/" tag="span" style="cursor: pointer">
                    <h1 class="title pl-3">VueShare</h1>
                </router-link>
            </v-toolbar>

            <v-divider/>

            <!-- SideNavbar Links -->
            <v-list>
                <v-subheader>Navigation Links</v-subheader>
                <v-list-item-group color="primary">
                    <v-list-item v-for="item in sideNavItems" :key="item.title" :to="item.link">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <!-- sign out button -->
                    <v-list-item v-if="user">
                        <v-list-item-icon>
                            <v-icon>mdi-exit-to-app</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Sign out</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <!-- Horizontal Navbar-->
        <v-card color="grey lighten-4" flat tile>

            <v-toolbar fixed color="primary" dark>

                <v-app-bar-nav-icon @click="sideNav = !sideNav"></v-app-bar-nav-icon>

                <v-toolbar-title>
                    <router-link to="/" tag="span" style="cursor: pointer">VueShare</router-link>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-text-field flex label="Prepend" prepend-icon="mdi-place" placeholder="Search Post" color="accent"
                              single-line
                              hide-details="true">

                </v-text-field>

                <v-spacer></v-spacer>

                <v-toolbar-items class="hidden-xs-only">
                    <v-btn text v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
                        <v-icon left class="hidden-sm-only">{{item.icon }}</v-icon>
                        {{ item.title}}
                    </v-btn>

                    <!-- PROFILE BUTTON -->
                    <v-btn text to="/profile" v-if="user">
                        <v-icon class="hidden-sm-only" left>mdi-account-box</v-icon>
                        <v-badge right color="red darken-2">
                            <span slot="badge">12</span>
                            Profile
                        </v-badge>
                    </v-btn>

                    <!-- SIGN OUT BUTTON -->
                    <v-btn text v-if="user" @click="handleSignOut">
                        <v-icon class="hidden-sm-only" left>mdi-exit-to-app</v-icon>
                        Sign out
                    </v-btn>
                </v-toolbar-items>

            </v-toolbar>
        </v-card>
        <!-- App Content -->
        <main>
            <v-container>
                <transition name="fade">
                    <router-view/>
                </transition>
            </v-container>
        </main>
    </v-app>
</template>

<script>

    import {mapGetters} from "vuex";

    export default {
        name: 'App',

        data() {
            return {
                sideNav: false
            }
        },

        methods: {
            handleSignOut() {
                this.$store.dispatch('signOutUser');
            }
        },

        computed: {
            ...mapGetters(['user']),

            horizontalNavItems() {
                let items = [
                    {icon: 'mdi-chat', title: "Posts", link: '/posts'},
                    {icon: 'mdi-lock-open', title: "Sign in", link: '/signin'},
                    {icon: 'mdi-pencil', title: "Sign up", link: '/signup'},
                ];
                if (this.user) {
                    items = [
                        {icon: 'mdi-chat', title: "Posts", link: '/posts'},
                    ]
                }
                return items;
            },
            sideNavItems() {
                let items = [
                    {icon: 'mdi-chat', title: "Posts", link: '/posts'},
                    {icon: 'mdi-lock-open', title: "Sign in", link: '/signin'},
                    {icon: 'mdi-pencil', title: "Sign up", link: '/signup'},
                ];
                if (this.user) {
                    items = [
                        {icon: 'mdi-chat', title: "Posts", link: '/posts'},
                        {icon: 'mdi-star-circle', title: "Create Post", link: '/post/add'},
                        {icon: 'mdi-account-box', title: "Profile", link: '/profile'},
                    ];
                }
                return items;
            }
        },

    };
</script>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition-property: opacity;
        transition-duration: 0.25s;
    }

    .fade-enter-active {
        transition-delay: 0.25s;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
</style>
