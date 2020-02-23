<template>
    <form class="form-signin" @submit.prevent="register">
        <h1 class="h3 mb-3 font-weight-normal">Create user account</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus v-model="user.email">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="user.password">
        <label for="inputName" class="sr-only">Name</label>
        <input type="text" id="inputName" class="form-control" placeholder="Full name" required v-model="user.name">

        <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        <div class="mt-3">
            <p class="float-left">Already registered user?</p>
            <div class="float-right">
                <router-link to="/login">Login</router-link>
            </div>
        </div>
        <div class="clearfix"></div>
        <p class="text-muted text-center">bitsEverywhere&copy; 2020</p>
    </form>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';

    @Component
    export default class Register extends Vue {
        user = {email: '', password: '', name: ''};

        async register() {
            try {
                const { data, message } = await this.$auth.register(this.user);
                console.log(message);
            } catch (e) {
                alert(e);
            }
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
</style>