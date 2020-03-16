<template>
    <v-container v-if="getPost" class="mt-3" flexbox center>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card hover>
                    <v-card-title>

                        <h1>{{getPost.title}}</h1>

                        <v-btn @click="handleUnLikePost" large icon v-if="user">
                            <v-icon large color="grey">mdi-heart</v-icon>
                        </v-btn>

                        <h3 class="ml-3 font-weight-thin">{{ getPost.likes}} Likes</h3>
                        <v-spacer></v-spacer>
                        <v-icon @click="gotoPreviousPage" color="info" large>mdi-arrow-left-thick</v-icon>
                    </v-card-title>

                    <v-tooltip right>
                        <span>Click to enlarge image</span>
                        <v-img @click="toggleImageDialog" slot="activator" :src="getPost.imageUrl" id="post__image"/>
                    </v-tooltip>

                    <!-- enlarged post image dialog -->
                    <v-dialog v-model="dialog">
                        <v-card>
                            <v-img :src="getPost.imageUrl" height="80vh"/>
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
                    <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleAddPostMessage">
                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field
                                        :rules="messageRules"
                                        v-model="messageBody"
                                        clearable
                                        append-outer-icon="mdi-send"
                                        label="Add Message" type="text"
                                        @click:append-outer="handleAddPostMessage"
                                        required
                                        prepend-icon="mdi-email"></v-text-field>
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

                        <template v-for="message in getPost.messages">
                            <v-divider :key="message._id"/>
                            <v-list-item avatar inser :key="message.title">
                                <v-list-item-avatar>
                                    <img :src="message.messageUser.avatar" alt="">
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ message.messageBody }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{ message.messageUser.username }}
                                        <span class="grey--text text--lighten-1 hidden-xs-only">{{ message.messageDate }}</span>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action class="hidden-xs-only">
                                    <v-icon :color="checkIfOwnMessage(message) ? 'accent' : 'grey'">mdi-chat</v-icon>
                                </v-list-item-action>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-flex>
            </v-layout>
        </div>
    </v-container>
</template>

<script>
    import {ADD_POST_MESSAGE, GET_POST, LIKE_POST, UNLIKE_POST} from "../../store/queries";
    import {mapGetters} from "vuex";

    export default {
        name: "Post",
        props: ["postId"],
        data() {
            return {
                dialog: false,
                messageBody: '',
                isFormValid: true,
                messageRules: [
                    message => !!message || 'Message is required.',
                    message => message.length < 50 || 'Message must be less than 50 characters'
                ]
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
            gotoPreviousPage() {
                this.$router.go(-1);
            },

            handleAddPostMessage() {
                if (this.$refs.form.validate()) {
                    const variables = {
                        messageBody: this.messageBody,
                        userId: this.user._id,
                        postId: this.postId
                    };

                    this.$apollo.mutate({
                        mutation: ADD_POST_MESSAGE,
                        variables,
                        update: (cache, {data: {addPostMessage}}) => {
                            const data = cache.readQuery({
                                query: GET_POST,
                                variables: {postId: this.postId}
                            });
                            data.getPost.messages.unshift(addPostMessage);
                            cache.writeQuery({
                                query: GET_POST,
                                variables: {postId: this.postId},
                                data
                            });
                        }
                    }).then(({data}) => {
                        this.$refs.form.reset();
                        console.log(data.addPostMessage);
                    }).catch(err => console.error(err))
                }
            },

            toggleImageDialog() {
                if (window.innerWidth > 500) {
                    this.dialog = !this.dialog;
                }
            },
            checkIfOwnMessage(message) {
                return this.user && this.user._id === message.messageUser._id
            },
            handleLikePost() {
                const variables = {
                    postId: this.postId,
                    username: this.user.username
                };

                this.$apollo.mutate({
                    mutation: LIKE_POST,
                    variables,
                    update: (cache, {data: {likePost}}) => {
                        const data = cache.readQuery({
                            query: GET_POST,
                            variables: { postId: this.postId}
                        });
                        data.getPost.likes +=1;
                        cache.writeQuery({
                            query: GET_POST,
                            variables: { postId: this.postId},
                            data
                        });
                    }
                }).then(({data}) => {
                  const updateUser = {...this.user, favorites: data.likePost.favorites};
                  this.$store.commit('setUser', updateUser);
                }).catch(err => console.error(err));
            },
            handleUnLikePost() {
                const variables = {
                    postId: this.postId,
                    username: this.user.username
                };

                this.$apollo.mutate({
                    mutation: UNLIKE_POST,
                    variables,
                    update: (cache, {data: {unlikePost}}) => {
                        const data = cache.readQuery({
                            query: GET_POST,
                            variables: { postId: this.postId}
                        });
                        data.getPost.likes -=1;
                        cache.writeQuery({
                            query: GET_POST,
                            variables: { postId: this.postId},
                            data
                        });
                    }
                }).then(({data}) => {
                    const updateUser = {...this.user, favorites: data.unlikePost.favorites};
                    this.$store.commit('setUser', updateUser);
                }).catch(err => console.error(err));
            }
        }
    };
</script>

<style scoped>
    #post__image {
        height: 400px !important;
    }
</style>