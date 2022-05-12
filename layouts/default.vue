<template>
  <div>
    <header-app />
    <div class="mt-5">
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import HeaderApp from '~/components/HeaderApp/HeaderApp.vue';
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
  async beforeMount() {
    await this.getQuestionsIds();
  },
  methods: {
    ...mapActions(['getUserAuthentification', 'getQuestionsIds']),
  },
});
</script>

<style>
body {
  background-color: #3f444e;
}
</style>
