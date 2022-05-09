import Vue from 'vue';
import axios from 'axios';

export interface questionObject {
  question: string;
  code: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: string;
}

export async function sendQuestion(questionObject: questionObject) {
  try {
    for (const value of Object.values(questionObject)) {
      if (!value) {
        Vue.toasted.error('Заполните все поля');
        return;
      }
    }
    const response = await axios.post('/api/addquestion', questionObject, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
      Vue.toasted.success(response.data.message);
    }
  } catch (error: any) {
    Vue.toasted.error(error.message);
  }
}
