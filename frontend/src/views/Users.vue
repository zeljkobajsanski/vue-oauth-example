<template>
    <div>
        <p>Users</p>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component({
        metaInfo() {
            return {
                meta: [
                    {property: 'description', content: this.description},
                ],
            }
        }
    })
    export default class Users extends Vue {
        description = '';

        mounted() {
            setTimeout(() => {
                this.description = 'Users management page';
            }, 5000);
        }
    }
</script>