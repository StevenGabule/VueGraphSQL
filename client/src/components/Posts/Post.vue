<template>
  <v-container v-if="getPost">
    <h1>{{ getPost.title}}</h1>
  </v-container>
</template>

<script>
    import {GET_POST} from "../../store/queries";

export default {
  name: "Post",
  props: ["postId"],
    apollo: {
      getPost: {
          query: GET_POST,
          variables() {
              return {
                  postId: this.postId
              }
          }
      }
    }
};
</script>
