<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from "vue-property-decorator";

  @Component({
    metaInfo: {
      meta: [
        {property: 'description', content: 'About'},
      ],
    }
  })
  export default class AboutPage extends Vue {

  }
</script>
