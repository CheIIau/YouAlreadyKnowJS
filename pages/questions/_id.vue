<template>
  <section class="container">
    <div>
      <h1 class="title">User</h1>
      <h2 class="info">
        {{ user.name }}
      </h2>
      <nuxt-link class="button" to="/questions"> Users </nuxt-link>
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
        return { user: res };
      })
      .catch(() => {
        error({ statusCode: 404, message: 'User not found' });
      });
  },
  head() {
    return {
      title: `User: ${this.user.name}`,
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
