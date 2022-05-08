<template>
  <div>
    <pre>
        <code v-highlight class="javascript">
          <span>{{question}}</span>
          
          {{code}}</code>
    </pre>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

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
    }
  },
})
</script>
