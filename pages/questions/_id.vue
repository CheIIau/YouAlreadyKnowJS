<template>
  <div>
    <question-component :question="question" />
  </div>
</template>

<script>
import Vue from 'vue';

import QuestionComponent from '~/components/QuestionComponent/QuestionComponent.vue';
export default Vue.extend({
  components: { QuestionComponent },
  async asyncData({ params, error, $axios }) {
    return await $axios
      .$get('/api/questions/' + params.id)
      .then((res) => {
        return { question: res };
      })
      .catch((e) => {
        error({ statusCode: e.statusCode, message: e.message });
      });
  },
  fetchOnServer: true,
  head() {
    return {
      title: 'Тест',
    };
  },
});
</script>

<style scoped>
</style>
