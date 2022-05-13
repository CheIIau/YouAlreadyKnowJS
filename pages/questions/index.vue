<template>
  <div class="flex justify-center">
    <div v-if="!isLoading">
      <h3 class="text-center text-white mb-4 xl:text-xl 2xl:text-2xl">Выберите вопрос: </h3>
      <div class="p-5 pb-0 border rounded-xl bg-gray-800 border-gray-900 max-w-5xl question-links-container grid grid-cols-5 md:grid-cols-6 gap-4">
        <nuxt-link
          v-for="(question, i) in questions"
          :key="question"
          class="button"
          :to="`/questions/${question}`"
        >
          <button
            data-badge="✔"
            class="py-2 text-sm mx-2 md:text-xl lg:text-2xl xl:text-3xl md:mx-4 mb-6 md:mb-10 md:py-3 xl:py-4 text-white duration-100 bg-yellow-400 hover:bg-yellow-500 rounded-md shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2 question-link"
            :class="answeredClass(question)"
            @click="onQuestionClick(i)"
          >
            <span class="text-center mx-auto md:mx-auto">{{i+1}}</span>
          </button>
        </nuxt-link>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';
export default Vue.extend({
  async asyncData({ $axios }) {
    const data = await $axios
      .$get('/api/allQuestionsIds')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return { questions: data };
  },
  head() {
    return {
      title: 'Тесты',
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'questionsIds']),
    answeredClass() {
      return (questionId: string) => {
        const answeredQuestions = localStorage.getItem('answeredQuestions');
        if (answeredQuestions) {
          const answeredQuestionsArr = Array.from(
            new Set(answeredQuestions.split(','))
          );
          if (answeredQuestionsArr.includes(questionId)) {
            return { 'answered-question': true };
          }
        }
      };
    },
  },
  methods: {
    ...mapMutations(['setCurrentQuestionIndex']),
    onQuestionClick(i: number) {
      this.setCurrentQuestionIndex(i);
    },
  },
});
</script>

<style scoped lang='postcss'>
.question-link {
  text-align: center;
  @media (max-width: 768px) {
    width: 39.5px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 52px;
  }
  @media (min-width: 1025px) and (max-width: 1280px) {
    width: 60px;
  }
  @media (min-width: 1281px) {
    width: 70px;
  }
}
.question-links-container {
  display: grid;
}
.answered-question {
  position: relative;
  &:after {
    position: absolute;
    right: -8px;
    top: -8px;
    min-width: 10px;
    min-height: 10px;
    line-height: 8px;
    padding: 5px;
    color: #fff;
    background-color: #bf1f1f;
    font-size: 10px;
    border-radius: 20px;
    content: attr(data-badge);
    border: solid 1px #c93a3a;
    @media (min-width: 768px) {
      font-size: 15px;
      line-height: 11px;
    }
  }
}
</style>
