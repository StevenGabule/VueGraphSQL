<template>
    <v-app style="background-color: #E3E3EE">
        <!-- Side Navigation -->
        <v-navigation-drawer app temporary fixed v-model="sideNav">
            <v-toolbar color="accent" dark flat>
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

    export default {
        name: 'App',

        data() {
            return {
                sideNav: false
            }
        },

        computed: {
            horizontalNavItems() {
                return [
                    {icon: 'mdi-chat', title: "Posts", link: '/posts'},
                    {icon: 'mdi-lock-open', title: "Sign in", link: '/signin'},
                    {icon: 'mdi-pencil', title: "Sign up", link: '/signup'},
                ]
            },
            sideNavItems() {
                return [
                    {icon: 'mdi-chat', title: "Posts", link: '/posts'},
                    {icon: 'mdi-lock-open', title: "Sign in", link: '/signin'},
                    {icon: 'mdi-pencil', title: "Sign up", link: '/signup'},
                ]
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
    .fade-leave-active{
        opacity: 0;
    }
</style>
