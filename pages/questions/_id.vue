<template>
  <section class="container">
    <div>
      <h1 class="title">Question</h1>
      <h2 class="info">
        {{ question.question }}
      </h2>
      <h2 class="info">
        {{ question.code }}
      </h2>
      <nuxt-link
        class="button"
        to="/questions"
      > Вопросы </nuxt-link>
    </div>
  </section>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  asyncData({ params, error, $axios }) {
    return $axios
      .$get('/api/questions/' + params.id)
      .then((res) => {
        return { question: res };
      })
      .catch((e) => {
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
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  margin-top: 30px;
}
.info {
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button {
  margin-top: 30px;
}
</style>
