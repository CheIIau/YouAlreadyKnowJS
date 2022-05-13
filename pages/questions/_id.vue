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
        console.log(res);
        return { question: res };
      })
      .catch((e) => {
        console.log(e);
        error({ statusCode: e.statusCode, message: e.message });
      });
  },
  head() {
    return {
      title: 'Тест',
    };
  },
});
</script>

<style scoped>
</style>
