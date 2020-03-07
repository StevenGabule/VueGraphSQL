<template>
    <v-container text-xs-center mt-5 pt-5>
        <!-- Sign in title -->
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3 class="text-center">
                <h1>Welcome Back!</h1>
            </v-flex>
        </v-layout>
        <!-- sign in form -->
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card color="danger" dark class="pa-5 text-center">
                    <v-container>
                        <v-form @submit.prevent="handleSignInUser">
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field v-model="username" prepend-icon="mdi-face" label="Username" type="text" required />
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field v-model="password" prepend-icon="mdi-lock" label="Password" type="password" required />
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn color="accent" type="submit">Signin</v-btn>
                                    <h3>Already have an account? <router-link to="/signup">Sign Up</router-link></h3>
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
    export default {
        name: "Signin",
        data() {
            return {
                username: 'johnwick',
                password: 'password',
            }
        },
        methods: {
            handleSignInUser() {
                this.$store.dispatch('signInUser', {
                    username: this.username,
                    password: this.password
                })
            }
        }
    }
</script>

<style scoped>

</style>