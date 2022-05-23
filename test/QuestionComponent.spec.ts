import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import QuestionComponent from '../components/QuestionComponent/QuestionComponent.vue';

interface Question {
  question: string;
  code: string;
  answers: Array<string>;
  correctAnswer: string;
}
const localVue = createLocalVue();
localVue.use(Vuex);

describe('QuestionComponent', () => {
  let mutations;
  let store: any;
  let getters: any;
  const mockData = {
    propsData: {
      question: <Question>{
        question: 'Question',
        code: 'Code',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '0',
      },
    },
    mocks: {
      $route: {
        params: {
          id: '123',
        },
      },
      $toast: {
        success() {},
        error() {},
      },
    },
    directives: {
      highlight() {},
    },
  };
  beforeEach(() => {
    getters = {
      currentQuestionIndex() {
        return '123';
      },
      questionsIds() {
        return ['123', '321'];
      },
    };
    mutations = {
      setCurrentQuestionIndex: jest.fn(),
    };
    store = new Store({
      mutations,
      getters,
    });
  });

  it('is a Vue instance', () => {
    const wrapper = shallowMount(QuestionComponent, {
      ...mockData,
      store,
      localVue,
    });
    expect(wrapper).toBeTruthy();
  });

  it('Change styles of buttons when answered', async () => {
    const wrapper = shallowMount(QuestionComponent, {
      ...mockData,
      store,
      localVue,
    });
    const buttons = wrapper.findAll('[data-test="answer-button"]');
    expect(buttons).toHaveLength(4);
    await buttons.at(0).trigger('click');
    expect(buttons.at(0).classes()).toContain('answer-button__correct');
    expect(buttons.at(1).classes()).toContain('answer-button__wrong');
  });
});
