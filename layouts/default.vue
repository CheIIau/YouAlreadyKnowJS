<template>
  <div>
    <header-app />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderApp from '~/components/HeaderApp.vue'
export default Vue.extend({
  components: {
    HeaderApp,
  },
})
</script>
