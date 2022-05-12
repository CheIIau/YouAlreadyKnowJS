<template>
  <div>
    <p class="question-text xl:">{{ question.question }}</p>
    <div class="question-code">
      <pre class="question-code-inner-block">
        <code v-highlight class="question-code-text javascript" >{{question.code}}</code>
      </pre>
    </div>
    <div class="answers">
      <button
        v-for="(answer, i) in question.answers"
        :key="answer"
        class="bg-gray-800 answer-button py-3 px-2 m-2 text-gray-200 rounded-2xl hover:bg-gray-600"
        type="button"
        :class="answerClass(i)"
        :disabled="isAnswered"
        @click="sendAnswer(i)"
      >
        {{ answer }}
      </button>
    </div>
    <div class="flex justify-center mt-5">
      <button
        v-if="!lastQuestion && isAnswered"
        class="bg-yellow-400 answer-button py-4 px-2 m-2 text-gray-200 rounded-2xl hover:bg-yellow-500"
        type="button"
        @click="nextQuestion"
      >
        Следующий вопрос
      </button>
      <nuxt-link
        v-if="lastQuestion && isAnswered"
        to="/questions"
      >
        <button
          class="bg-yellow-400 answer-button py-4 px-2 m-2 text-gray-200 rounded-2xl hover:bg-yellow-500"
          type="button"
        >
          Вернуться к списку вопросов
        </button>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import { addQuestionInStorage } from './QuestionComponentFunctions';
interface Question {
  question: string;
  code: string;
  answers: Array<string>;
  correctAnswer: string;
}

export default Vue.extend({
  props: {
    question: {
      type: Object as PropType<Question>,
      required: true,
    },
  },
  data() {
    return {
      isAnswered: false,
    };
  },
  computed: {
    ...mapGetters(['currentQuestionIndex', 'questionsIds']),
    answerClass() {
      return (i: number) => ({
        'answer-button__disabled': this.isAnswered,
        'answer-button__wrong':
          Number(this.question.correctAnswer) !== i && this.isAnswered,
        'answer-button__correct':
          Number(this.question.correctAnswer) === i && this.isAnswered,
      });
    },
    nextIndex(): number {
      const routeId = this.$route.params.id;
      const questionIdsArr = this.questionsIds as string[];
      return questionIdsArr.indexOf(routeId);
    },
    lastQuestion() {
      if (this.nextIndex + 1 !== this.questionsIds.length) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    ...mapMutations(['setCurrentQuestionIndex']),
    sendAnswer(answerIndex: number) {
      if (answerIndex === Number(this.question.correctAnswer)) {
        this.$toast.success('Верно');
      } else {
        this.$toast.error('Неверно');
      }
      this.isAnswered = true;
      addQuestionInStorage(this.$route.params.id);
    },
    async nextQuestion() {
      if (this.nextIndex + 1 !== this.questionsIds.length) {
        await this.$router.push(
          `/questions/${this.questionsIds[this.nextIndex + 1]}`
        );
      }
    },
  },
});
</script>

<style scoped lang="postcss">
.question-text {
  text-align: center;
  color: white;
  margin-bottom: 20px;
}
.question-code {
  display: flex;
  justify-content: center;
  background-color: #282c34;
  margin-bottom: 20px;
  &-inner-block {
    margin-bottom: -40px;
    margin-top: -17px;
  }
  &-text {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}
</style>

<style lang="postcss">
.answers {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.answer-button {
  min-width: 300px;
  &__disabled {
    cursor: not-allowed;
    background-color: #9ca3af;
  }
  &__wrong {
    background-color: #f87171;
    &:hover {
      background-color: #fca5a5;
    }
  }
  &__correct {
    background-color: #34d399;
    &:hover {
      background-color: #6ee7b7;
    }
  }
}
</style>

<style>
@media only screen and (max-width: 600px) {
  .toasted {
    display: flex !important;
    justify-content: center !important;
  }
}
</style>