<template>
    <v-container text-xs-center mt-5 pt-5>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3 class="text-center">
                <h1>Add Post</h1>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>

                <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleAddPost">

                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field :rules="titleRules" v-model="title" prepend-icon="mdi-face"
                                          label="Post Title"
                                          type="text" required/>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field :rules="imageRules" v-model="imageUrl" prepend-icon="mdi-file"
                                          label="Image Url"
                                          type="text" required/>
                        </v-flex>
                    </v-layout>

                    <!-- image preview -->
                    <v-layout row>
                        <v-flex xs12>
                            <img :src="imageUrl" alt="" height="300">
                        </v-flex>
                    </v-layout>

                    <!-- categories select -->
                    <v-layout row>
                        <v-flex xs12>
                            <v-select v-model="categories" :rules="categoriesRules"
                                      :items="['Art', 'Education', 'Travel', 'Photography', 'Food','Furniture','Technology']" multiple label="Categories" />
                        </v-flex>
                    </v-layout>

                    <!-- Description Text Area -->
                    <v-layout row>
                        <v-flex xs12>
                            <v-textarea :rules="descriptionRules" v-model="description" label="Description" required></v-textarea>
                        </v-flex>
                    </v-layout>


                    <v-layout row>
                        <v-flex xs12>
                            <v-btn :loading="loading" :disabled="!isFormValid || loading" color="dark"
                                   class="v-btn--block"
                                   type="submit">Publish
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>

            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "AddPost",
        data() {
            return {
                isFormValid: true,
                title: '',
                imageUrl: '',
                categories: '',
                description: '',
                titleRules: [
                    title => !!title || 'Title is required',
                    title => title.length < 20 || 'Title must have less than 20 characters',
                ],
                imageRules: [
                    imageUrl => !!imageUrl || 'Image is required',
                ],
                categoriesRules: [
                    categories => categories.length >= 1 || 'At least one categories is required',
                ],
                descriptionRules: [
                    description => !!description || 'Description is required',
                    description => description.length < 200 || 'Description must have less than 200 characters',
                ]
            }
        },

        computed: {
            ...mapGetters(['loading', 'user'])
        },

        methods: {
            handleAddPost() {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('addPost', {
                        title: this.title,
                        imageUrl: this.imageUrl,
                        categories: this.categories,
                        description: this.description,
                        creatorId: this.user._id,
                    });
                    this.$router.push('/')
                }
            }
        }
    }
</script>

<style scoped>

</style>