<template>
    <div class="text-center">
        <v-layout row>
            <v-dialog v-model="loading" persistent fullscreen>
                <v-container fill-height>
                    <v-layout row justify-center align-center>
                        <v-progress-circular indeterminate :size="70" :width="7"
                                             color="secondary"></v-progress-circular>
                    </v-layout>
                </v-container>
            </v-dialog>
        </v-layout>

        <v-flex xs12>
            <v-carousel v-if="!loading && posts.length > 0" cycle interval="3000" hide-delimiter-background
                        show-arrows-on-hover>
                <v-carousel-item
                        v-for="post in posts" :key="post._id" :src="post.imageUrl" @click.native="goToPost(post._id)" >
                    <h1 id="carousel__title">{{ post.title }}</h1>
                </v-carousel-item>
            </v-carousel>
        </v-flex>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Home',

        created() {
            this.handleGetCarouselPosts();
        },

        computed: {
            ...mapGetters(['loading', 'posts'])
        },

        methods: {
            handleGetCarouselPosts() {
                // react out to vuex store, fire action that gets posts for carousel
                this.$store.dispatch('getPosts');
            },
            goToPost(postId) {
                this.$router.push(`/posts/${postId}`);
            }
        }
    }
</script>

<style>
    #carousel__title {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border-radius: 5px 5px 0 0;
        margin: 0 auto;
        padding: 0.5em 0.5em 40px;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>