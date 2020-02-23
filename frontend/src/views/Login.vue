<template>
    <form class="form-signin" @submit.prevent="loginUser">
        <h1 class="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus
               v-model="email">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required
               v-model="password">

        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p class="text-center mb-0 text-muted mt-2" style="font-size: 12px">or login with</p>
        <button class="btn btn-facebook mr-2" @click="authenticateFb">Facebook</button>
        <button class="btn btn-danger" @click="authenticateGoogle">Google</button>
        <div class="mt-3">
            <p class="float-left">Don't have account?</p>
            <div class="float-right">
                <router-link to="/register">Register</router-link>
            </div>
        </div>
        <div class="clearfix"></div>
        <p class="text-muted text-center">bitsEverywhere&copy; 2020</p>
    </form>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import {Action} from "vuex-class";

    @Component
    export default class Login extends Vue {
        email = '';
        password = '';

        @Action login;
        @Action authenticate;

        async loginUser() {
            await this.login({user: {email: this.email, password: this.password}});
            this.$router.replace('/');
        }

        async authenticateFb() {
            await this.authenticate('facebook');
            this.$router.replace('/');
        }

        async authenticateGoogle() {
            await this.authenticate('google');
            this.$router.replace('/');
        }

    }
</script>

<style scoped>
    html,
    body {
        height: 100%;
    }

    body {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
    }

    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: auto;
    }
    .form-signin .checkbox {
        font-weight: 400;
    }
    .form-signin .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }
    .form-signin .form-control:focus {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .btn-facebook {
        background-color: #4267b2;
        color: #ffff;
    }
</style>