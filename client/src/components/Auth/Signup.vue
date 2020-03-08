<template>
    <v-container text-xs-center mt-5 pt-5>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3 class="text-center">
                <h1>Get started here</h1>
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
                        <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSignUpUser">

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="usernameRules" v-model="username" prepend-icon="mdi-face"
                                                  label="Username"
                                                  type="text" required/>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="emailRules" v-model="email" prepend-icon="mdi-email"
                                                  label="email"
                                                  type="email" required/>
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
                                    <v-text-field :rules="passwordRules" v-model="passwordConfirmation" prepend-icon="mdi-gavel"
                                                  label="Confirm Password"
                                                  type="password" required/>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn :loading="loading" :disabled="!isFormValid || loading" color="dark" class="v-btn--block"
                                           type="submit">Register
                                    </v-btn>
                                    <h3>Already have an account?
                                        <router-link to="/signin">Sign In</router-link>
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
        name: "Signup",
        data() {
            return {
                isFormValid: true,
                email: '',
                username: '',
                password: '',
                passwordConfirmation: '',
                usernameRules: [
                    username => !!username || 'Username is required',
                    username => username.length < 10 || 'Username cannot be more than 10 characters',
                ],
                emailRules: [
                    email => !!email || 'Email is required',
                    email => /.@+./.test(email) || 'Email must be valid',
                ],

                passwordRules: [
                    password => !!password || 'Password is required',
                    password => password.length >= 4 || 'Password must be at least 4 characters.',
                    confirmation => confirmation === this.password || 'Password must be match!'

                ],
            }
        },

        computed: {
            ...mapGetters(['error', 'loading', 'user'])
        },

        watch: {
           user(value) {
               if (value) {
                   this.$router.push('/')
               }
           }
        },

        methods: {
            handleSignUpUser() {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('signUpUser', {
                        username: this.username,
                        email: this.email,
                        password: this.password
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>