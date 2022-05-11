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
});
</script>
