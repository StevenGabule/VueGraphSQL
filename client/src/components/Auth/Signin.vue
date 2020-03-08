<template>
    <v-container text-xs-center mt-5 pt-5>
        <!-- Sign in title -->
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3 class="text-center">
                <h1>Welcome Back!</h1>
            </v-flex>
        </v-layout>

        <!-- Error Alert -->
        <v-layout v-if="error" row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <form-alert :message="error.message"/>
            </v-flex>
        </v-layout>

        <!-- sign in form -->
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card color="danger" dark class="pa-5 text-center">
                    <v-container>
                        <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSignInUser">
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="usernameRules" v-model="username" prepend-icon="mdi-face"
                                                  label="Username"
                                                  type="text" required/>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="passwordRules" v-model="password" prepend-icon="mdi-lock"
                                                  label="Password"
                                                  type="password" required/>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn :loading="loading" :disabled="!isFormValid || loading" color="red" class="v-btn--block"
                                           type="submit">Log in
                                    </v-btn>
                                    <h3>Don't have an account?
                                        <router-link to="/signup">Sign Up Here.</router-link>
                                    </h3>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Signin",
        data() {
            return {
                isFormValid: true,
                username: 'johnwick',
                password: 'password',
                usernameRules: [
                    username => !!username || 'Username is required',
                    username => username.length < 10 || 'Username must be less than 10 characters'
                ],
                passwordRules: [
                    password => !!password || 'Password is required',
                    password => password.length >= 4 || 'Password must be at less 4 characters'
                ]
            }
        },

        computed: {
            ...mapGetters(['user', 'error', "loading"])
        },

        watch: {
            user(value) {
                // user value changes from null to object, redirect to home page
                if (value) {
                    this.$router.push('/');
                }
            }
        },

        methods: {
            handleSignInUser() {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('signInUser', {
                        username: this.username,
                        password: this.password
                    })
                }
            }
        }
    }
</script>

<style>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }

    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>