<template>
  <ExampleComponent />
</template>

<script>
import Vue from 'vue';
import ExampleComponent from '~/components/ExampleComponent.vue';

export default Vue.extend({
  components: {
    ExampleComponent,
  },
});
</script>
