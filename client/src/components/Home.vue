<template>
    <div v-if="getPosts" class="text-center">
        <v-flex xs12>
            <v-carousel cycle interval="3000" hide-delimiter-background
                        show-arrows-on-hover>
                <v-carousel-item v-for="post in getPosts" :key="post._id" :src="post.imageUrl">
                    <h1 id="carousel__title">{{ post.title }}</h1>
                </v-carousel-item>
            </v-carousel>
        </v-flex>
    </div>
</template>

<script>
    import {gql} from 'apollo-boost'

    export default {
        name: 'Home',
        apollo: {
            getPosts: {
                query: gql`
                  query  {
                      getPosts {
                          _id
                          title
                          imageUrl
                          description
                          likes
                      }
                  }
              `
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