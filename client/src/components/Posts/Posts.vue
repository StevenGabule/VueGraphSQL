<template>
    <v-container fluid grid-list-xl>
        <!-- Post Cards -->
        <v-layout row wrap v-if="infiniteScrollPosts">

            <v-flex xs12 sm6 v-for="post in infiniteScrollPosts.posts" :key="post._id">

                <v-card hover class="mx-auto">

                    <v-img @click.native="goToPost(post._id)" :src="post.imageUrl" height="30vh" lazy class="white--text align-end">
                        <v-card-title class="black--text" v-text="post.title"/>
                    </v-img>

                    <v-card-actions>

                        <v-card-title primary>
                            <div>
                                <div class="headline">{{ post.title }}</div>
                                <span class="grey--text">{{ post.likes }} likes - {{post.messages.length}} comments</span>
                            </div>
                        </v-card-title>

                        <v-spacer/>

                        <v-btn icon @click="showPostCreator = !showPostCreator">
                            <v-icon>{{ `mdi-chevron-${showPostCreator ? 'up' : 'down'}`}}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-slide-y-transition v-if="showPostCreator">
                        <v-card-text class="grey lighten-4">
                            <v-list-item>

                                <v-list-item-avatar>
                                    <img :src="post.createdBy.avatar" alt="">
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title class="text--primary">{{ post.createdBy.username }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle class="font-weight-thin">Added {{ post.createdDate }}
                                    </v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-btn icon>
                                        <v-icon color="grey lighten-1">mdi-info</v-icon>
                                    </v-btn>
                                </v-list-item-action>

                            </v-list-item>
                        </v-card-text>
                    </v-slide-y-transition>

                </v-card>

            </v-flex>

        </v-layout>
        <!-- fetch more button -->
        <v-layout column v-if="showMoreEnabled">
            <v-flex xs12>
                <v-layout justify-center row>
                    <v-btn color="info" @click="showMore">Load more</v-btn>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import {INFINITE_SCROLL_POSTS} from "../../store/queries";

    const pageSize = 6;

    export default {
        name: "Posts",
        data() {
            return {
                pageNum: 1,
                showMoreEnabled: true,
                showPostCreator: false
            };
        },

        apollo: {
            infiniteScrollPosts: {
                query: INFINITE_SCROLL_POSTS,
                variables: {
                    pageNum: 1,
                    pageSize
                }
            }
        },
        methods: {
            showMore() {
                // fetch more data and transform original result
                this.pageNum += 1;
                this.$apollo.queries.infiniteScrollPosts.fetchMore({
                    variables: {
                        // pageNum incremented by 1
                        pageNum: this.pageNum,
                        pageSize
                    },

                    updateQuery: (prevResult, {fetchMoreResult}) => {
                        const newPosts = fetchMoreResult.infiniteScrollPosts.posts;
                        const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore;
                        this.showMoreEnabled = hasMore;

                        return {
                            infiniteScrollPosts: {
                                __typename: prevResult.infiniteScrollPosts.__typename,
                                posts: [...prevResult.infiniteScrollPosts.posts, ...newPosts],
                                hasMore
                            }
                        };
                    }
                });
            },

            goToPost(postId) {
                this.$router.push(`/posts/${postId}`);
            }
        }
    };
</script>

<style scoped></style>
