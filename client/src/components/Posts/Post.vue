<template>
    <v-container v-if="getPost" class="mt-3" flexbox center>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card hover>
                    <v-card-title>

                        <h1>{{getPost.title}}</h1>

                        <v-btn large icon v-if="user">
                            <v-icon large color="grey">mdi-heart</v-icon>
                        </v-btn>

                        <h3 class="ml-3 font-weight-thin">{{ getPost.likes}} Likes</h3>
                        <v-spacer></v-spacer>
                        <v-icon @click="gotoPreviousPage" color="info" large>mdi-arrow-left-thick</v-icon>
                    </v-card-title>

                    <v-tooltip right>
                        <span>Click to enlarge image</span>
                        <v-img @click="toggleImageDialog" slot="activator" :src="getPost.imageUrl" id="post__image" />
                    </v-tooltip>

                    <!-- enlarged post image dialog -->
                    <v-dialog v-model="dialog">
                        <v-card>
                            <v-img :src="getPost.imageUrl" height="80vh" />
                        </v-card>
                    </v-dialog>

                    <v-card-text>
                        <span v-for="(category, index) in getPost.categories" :key="index">
                            <v-chip class="mb-3" color="accent" text-color="white">{{ category }}</v-chip>
                        </span>
                        <h3>{{ getPost.description }}</h3>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <!-- Messages Section -->
        <div class="mt-3">
            <!-- Messages Input -->
            <v-layout class="mb-3" v-if="user">
                <v-flex xs12>
                    <v-form>
                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field clearable append-outer-icon="mdi-send" label="Add Message" type="text" required prepend-icon="mdi-email"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-flex>
            </v-layout>
            <!-- Messages -->
            <v-layout row wrap>
                <v-flex xs12>
                    <v-list subheader two-line>
                        <v-subheader>Messages ({{ getPost.messages.length }})</v-subheader>
                    </v-list>
                    <template v-for="message in getPost.messages">
                        <v-divider :key="message._id" />
                        <v-list-tile avatar inser :key="message.title">
                            <v-list-tile-avatar>
                                <img :src="message.messageUser.avatar" alt="">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ message.messageBody }}
                                </v-list-tile-title>
                                <v-list-tile-sub-title>
                                    {{ message.messageUser.username }}
                                    <span class="grey--text text--lighten-1 hidden-xs-only">{{ message.messageDate }}</span>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action class="hidden-xs-only">
                                <v-icon color="grey">mdi-chat-bubble</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </template>
                </v-flex>
            </v-layout>
        </div>
    </v-container>
</template>

<script>
    import {GET_POST} from "../../store/queries";
    import {mapGetters} from "vuex";

    export default {
        name: "Post",
        props: ["postId"],
        data() {
            return {
                dialog: false,
            }
        },
        apollo: {
            getPost: {
                query: GET_POST,
                variables() {
                    return {
                        postId: this.postId
                    }
                }
            }
        },
        computed: {
            ...mapGetters(['user']),
        },
        methods: {
            gotoPreviousPage(){
                this.$router.go(-1);
            },
            toggleImageDialog() {
                if (window.innerWidth > 500) {
                    this.dialog = !this.dialog;
                }
            }
        }
    };
</script>

<style scoped>
    #post__image {
        height: 400px !important;
    }
</style>