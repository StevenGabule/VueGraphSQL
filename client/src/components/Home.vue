<template>
    <div>
        <h1>Home</h1>
        <div v-if="$apollo.loading">Loading...</div>
        <ul v-else v-for="post in getPosts" :key="post._id">
            <li>
                {{post.title}}
                {{post.imageUrl}}
                {{post.description}}
            </li>
        </ul>
    </div>
</template>

<script>
    import {gql} from 'apollo-boost'

    export default {
        name: 'Home',

        data() {
          return {
            posts: []
          }
        },

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
              `,
              result({data,loading}) {
                  if (!loading) {
                    this.posts = data.getPosts;
                  }
              }
            }
        }
    }
</script>