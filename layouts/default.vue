<template>
  <div>
    <header-app />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import HeaderApp from '~/components/HeaderApp.vue';
export default Vue.extend({
  components: {
    HeaderApp,
  },
  computed: {
    ...mapGetters(['isUserAuth']),
  },
  async mounted() {
    if (!this.isUserAuth) {
      await this.getUserAuthentification();
    }
  },
  methods: {
    ...mapActions(['getUserAuthentification']),
  },
});
</script>

<style>
body {
  background-color: #3f444e;
}
</style>
