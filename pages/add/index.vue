<template>
  <div class="add-question-layout">
    <div class="md:max-w-md md:col-span-2 add-question-wrapper">
      <form>
        <div
          v-if="!hasQuestionBeenAdded"
          class="shadow sm:rounded-md sm:overflow-hidden"
        >
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label
                  for="question"
                  class="block text-sm font-medium text-gray-700"
                >
                  Вопрос
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    id="question"
                    ref="question-input"
                    v-model="question"
                    type="text"
                    name="question"
                    class="focus:ring-yellow-500 px-2 py-1 focus:border-yellow-600 flex-1 block w-full rounded-md sm:text-sm border border-gray-300 add-input"
                    placeholder="Например: Что будет в консоле?"
                    @input="checkForInput($event)"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                for="code"
                class="block text-sm font-medium text-gray-700"
              >
                Код
              </label>
              <div class="mt-1">
                <textarea
                  id="code"
                  ref="code-input"
                  v-model="code"
                  name="code"
                  rows="6"
                  class="code-area shadow-sm px-2 py-1 focus:ring-yellow-500 focus:border-yellow-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md add-input"
                  placeholder=""
                  @input="checkForInput($event)"
                ></textarea>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Не пишите код в одну строку, переносите строки и расставляйте
                пробелы
              </p>
            </div>
            <div>
              <div class="flex justify-between">
                <span class="block text-md font-medium text-gray-700 mb-2">
                  Варианты ответа:
                </span>
                <span class="block text-md font-medium text-gray-700 mb-2">
                  Верный ответ:
                </span>
              </div>

              <div class="grid grid-cols-4 justify-center items-end">
                <div class="col-span-3 sm:col-span-2">
                  <label
                    for="answer1"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Ответ 1
                  </label>
                  <div class="mt-1 flex rounded-md">
                    <input
                      id="answer1"
                      ref="answer1-input"
                      v-model="answer1"
                      type="text"
                      name="answer1"
                      class="focus:ring-yellow-500 mb-2 px-2 py-1 focus:border-yellow-600 flex-1 block w-full rounded-md sm:text-sm border border-gray-300 add-input"
                      @input="checkForInput($event)"
                    />
                  </div>
                </div>
                <div class="radio-button sm:col-span-2 radio-answer">
                  <label class="inline-flex items-center mt-3">
                    <input
                      v-model="correctAnswer"
                      type="radio"
                      name="correct-answer"
                      class="form-radio h-5 w-5 text-yellow-600 sm:mr-10"
                      value="0"
                      checked
                    />
                  </label>
                </div>
              </div>
              <div class="grid grid-cols-4 justify-center items-end">
                <div class="col-span-3 sm:col-span-2">
                  <label
                    for="answer2"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Ответ 2
                  </label>
                  <div class="mt-1 flex rounded-md">
                    <input
                      id="answer2"
                      ref="answer2-input"
                      v-model="answer2"
                      type="text"
                      name="answer2"
                      class="focus:ring-yellow-500 mb-2 px-2 py-1 focus:border-yellow-600 flex-1 block w-full rounded-md sm:text-sm border border-gray-300 add-input"
                      @input="checkForInput($event)"
                    />
                  </div>
                </div>
                <div class="radio-button sm:col-span-2 radio-answer">
                  <label class="inline-flex items-center mt-3">
                    <input
                      v-model="correctAnswer"
                      type="radio"
                      name="correct-answer"
                      class="form-radio h-5 w-5 text-yellow-600 sm:mr-10"
                      value="1"
                    />
                  </label>
                </div>
              </div>
              <div class="grid grid-cols-4 justify-center items-end">
                <div class="col-span-3 sm:col-span-2">
                  <label
                    for="answer3"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Ответ 3
                  </label>
                  <div class="mt-1 flex rounded-md">
                    <input
                      id="answer3"
                      ref="answer3-input"
                      v-model="answer3"
                      type="text"
                      name="answer3"
                      class="focus:ring-yellow-500 mb-2 px-2 py-1 focus:border-yellow-600 flex-1 block w-full rounded-md sm:text-sm border border-gray-300 add-input"
                      @input="checkForInput($event)"
                    />
                  </div>
                </div>
                <div class="radio-button sm:col-span-2 radio-answer">
                  <label class="inline-flex items-center mt-3">
                    <input
                      v-model="correctAnswer"
                      type="radio"
                      name="correct-answer"
                      class="form-radio h-5 w-5 text-yellow-600 sm:mr-10"
                      value="2"
                    />
                  </label>
                </div>
              </div>
              <div class="grid grid-cols-4 justify-center items-end">
                <div class="col-span-3 sm:col-span-2">
                  <label
                    for="answer4"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Ответ 4
                  </label>
                  <div class="mt-1 flex rounded-md">
                    <input
                      id="answer4"
                      ref="answer4-input"
                      v-model="answer4"
                      type="text"
                      name="answer4"
                      class="focus:ring-yellow-500 mb-2 px-2 py-1 focus:border-yellow-600 flex-1 block w-full rounded-md sm:text-sm border border-gray-300 add-input"
                      @input="checkForInput($event)"
                    />
                  </div>
                </div>
                <div class="radio-button sm:col-span-2 radio-answer">
                  <label class="inline-flex items-center mt-3">
                    <input
                      v-model="correctAnswer"
                      type="radio"
                      name="correct-answer"
                      class="form-radio h-5 w-5 text-yellow-600 sm:mr-10"
                      value="3"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              v-if="!isLoading"
              type="button"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              @click="
                addQuestion({
                  question,
                  code,
                  answer1,
                  answer2,
                  answer3,
                  answer4,
                  correctAnswer,
                })
              "
            >
              Добавить
            </button>
            <spinner v-else />
          </div>
        </div>
        <add-another-question
          v-if="hasQuestionBeenAdded"
          :has-question-been-added="hasQuestionBeenAdded"
          @showForm="hasQuestionBeenAdded = false"
        />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { questionObject, sendQuestion } from './add';
import Spinner from '~/components/Spinner.vue';
import AddAnotherQuestion from '~/components/AddAnotherQuestion.vue';
export default Vue.extend({
  components: { AddAnotherQuestion, Spinner },
  data() {
    return {
      question: '',
      code: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      correctAnswer: '0',
      hasQuestionBeenAdded: false,
    };
  },
  computed: { ...mapGetters(['isLoading']) },
  methods: {
    ...mapMutations(['setLoadingFlag']),
    ...mapActions(['getQuestionsIds']),
    async addQuestion(questionObject: questionObject) {
      this.setLoadingFlag(true);
      for (const value of Object.values(questionObject)) {
        if (!value) {
          for (const key in this.$refs) {
            const input = this.$refs[key] as HTMLTextAreaElement;
            if (input.value === '') {
              input?.classList.add('input-error');
            }
          }
          this.$toast.error('Заполните все поля');
          this.setLoadingFlag(false);
          return;
        }
      }
      await sendQuestion(questionObject);
      this.question =
        this.code =
        this.answer1 =
        this.answer2 =
        this.answer3 =
        this.answer4 =
          '';
      this.hasQuestionBeenAdded = true;
      this.setLoadingFlag(false);
      await this.getQuestionsIds();
    },
    checkForInput(event: InputEvent) {
      const input = event.target as HTMLTextAreaElement;
      if (input) {
        if (input?.value === '') {
          input?.classList.add('input-error');
        } else {
          input?.classList.remove('input-error');
        }
      }
    },
  },
});
</script>

<style scoped lang="postcss">
.add-question {
  &-layout {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  &-wrapper {
    max-width: 1000px;
    @media (min-width: 896px) {
      min-width: 100px;
    }
  }
}
.radio-button {
  display: flex;
  justify-content: flex-end;
  min-height: 80%;
}
.code-area {
  min-height: 100px;
}
.input-error {
  border-color: #ff313f;
  animation-name: spaceboots;
  animation-duration: 0.3s;
}

@-webkit-keyframes spaceboots {
  0% {
    -webkit-transform: translate(2px, 1px) rotate(0deg);
  }
  10% {
    -webkit-transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    -webkit-transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    -webkit-transform: translate(0px, 2px) rotate(0deg);
  }
  40% {
    -webkit-transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    -webkit-transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    -webkit-transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    -webkit-transform: translate(2px, 1px) rotate(-1deg);
  }
  80% {
    -webkit-transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    -webkit-transform: translate(2px, 2px) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(1px, -2px) rotate(-1deg);
  }
}

.radio-answer {
  @media (max-width: 639px) {
    margin-right: 26px;
  }
}
</style>
