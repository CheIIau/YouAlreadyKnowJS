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
        v-for="answer in answers"
        :key="answer"
        class="answer-button bg-cyan-500 hover:bg-cyan-600"
        type="button"
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
      answers: {
        answer1: 'Sarah',
        answer2: 'undefined',
        answer3: 'Lydia',
        answer4: 'ReferenceError',
      },
    };
  },
});
</script>

<style scoped>
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
}
.answers {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
