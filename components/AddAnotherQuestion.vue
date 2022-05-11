<template>
  <div class="px-4 py-5 space-y-6 sm:p-6">
    <div class="answers">
      <nuxt-link
        class="button"
        to="/questions"
      >
        <button
          class="bg-gray-800 answer-button py-4 px-2 m-2 text-gray-200 rounded-2xl hover:bg-gray-600"
          type="button"
        >
          Посмотреть все тесты
        </button>
      </nuxt-link>
      <button
        class="bg-gray-800 answer-button py-4 px-2 m-2 text-gray-200 rounded-2xl hover:bg-gray-600"
        type="button"
        @click="$emit('showForm')"
      >
        Добавить еще тест
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
export default Vue.extend({
  props: {
    hasQuestionBeenAdded: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
});
</script>
