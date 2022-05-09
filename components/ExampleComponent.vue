<template>
  <div class="question">
    <p class="question-text">{{ question }}</p>
    <div class="question-code">
      <pre>
      <code v-highlight class="question-code-text javascript" >
        {{code}}</code>
    </pre>
    </div>
    <div class="answers">
      <button
        v-for="(answer, i) in answers"
        :key="answer"
        class="bg-gray-800 answer-button py-4 px-2 m-2 text-gray-200 rounded-2xl hover:bg-gray-600"
        type="button"
        :class="{
          'answer-button__disabled': isAnswered,
        }"
        :disabled="isAnswered"
        @click="sendAnswer(i)"
      >
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      question: 'Что будет выведено?',
      code: `let name = 'Lydia'
      function getName() {
        console.log(name);
        let name = 'Sarah'
      }
      getName()`,
      answers: ['Sarah', 'undefined', 'Lydia', 'ReferenceError'],
      correctAnswer: 3,
      isAnswered: false,
    };
  },
  methods: {
    sendAnswer(answerIndex: number) {
      if (answerIndex === this.correctAnswer) {
        this.$toast.success('Верно');
      } else {
        this.$toast.error('Неверно');
      }
      this.isAnswered = true;
    },
  },
});
</script>

<style scoped lang="postcss">
.question {
  margin-top: 20px;
}
.question-text {
  text-align: center;
  color: white;
  margin-bottom: 20px;
  font-size: 16px;
}
.question-code-text {
  padding: 0 40px 0 0;
}
.question-code {
  display: flex;
  justify-content: center;
  background-color: #282c34;
  margin-bottom: 20px;
}
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
}
</style>
