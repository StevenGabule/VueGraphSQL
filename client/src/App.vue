<template>
    <v-app>
        <!-- Horizontal Navbar-->
        <v-card color="grey lighten-4" flat tile>

            <v-toolbar fixed color="primary" dark>

                <v-app-bar-nav-icon></v-app-bar-nav-icon>

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
                <router-view/>
            </v-container>
        </main>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        computed: {
            horizontalNavItems() {
                return [
                    {icon: 'mdi-chat', title: "Posts", link: '/posts'},
                    {icon: 'mdi-lock-open', title: "Sign in", link: '/signin'},
                    {icon: 'mdi-pencil', title: "Sign up", link: '/signup'},
                ]
            }
        },

    };
</script>
