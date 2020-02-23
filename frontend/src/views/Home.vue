<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">OAuth2</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
              aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <p class="text-light mt-3 mr-3">{{user.name}}</p>
        <button class="btn btn-danger btn-sm" @click="signOut">Logout</button>
      </div>
    </nav>
    <main role="main" class="container">

      <div class="starter-template">
        <h1>Bootstrap starter template</h1>
        <p class="lead">Use this document as a way to quickly start any new project.<br> All you get is this text and a
          mostly barebones HTML document.</p>
      </div>

    </main>
  </div>
</template>

<script lang="ts">
  // @ is an alias to /src
  import {Vue, Component} from 'vue-property-decorator'
  import {Action, Getter} from "vuex-class";

  @Component
  export default class Home extends Vue {
    @Getter user!: any;
    @Action logout;

    async signOut() {
      await this.logout();
      this.$router.replace('/login');
    }
  }
</script>

<style>
  body {
    padding-top: 5rem;
  }

  .starter-template {
    padding: 3rem 1.5rem;
    text-align: center;
  }
</style>
