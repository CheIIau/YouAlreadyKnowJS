<template>
  <WelcomeComponent />
</template>

<script lang="ts">
import Vue from 'vue';

import WelcomeComponent from '~/components/WelcomeComponent.vue';
export default Vue.extend({
  components: {
    WelcomeComponent,
  },
  mounted() {
    console.log(process.env.API_DOMAIN);
    console.log(process.env.BASE_URL);
    console.log(process.env.BROWSER_BASE_URL);
  },
});
</script>
