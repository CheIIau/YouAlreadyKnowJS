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
  const $route = {
    params: { id: '321' },
  };
  const mockData = {
    propsData: {
      question: <Question>{
        question: 'Question',
        code: 'Code',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '0',
      },
    },
    stubs: {
      'nuxt-link': true,
    },
    mocks: {
      $route,
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
        return '321';
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

    await buttons.at(0).trigger('click');

    expect(buttons).toHaveLength(4);
    expect(buttons.at(0).classes()).toContain('answer-button__correct');
    expect(buttons.at(1).classes()).toContain('answer-button__wrong');
  });

  it('If current question is the last one in array - show back-to-list button', async () => {
    const wrapper = shallowMount(QuestionComponent, {
      ...mockData,
      store,
      localVue,
    });
    const buttons = wrapper.findAll('[data-test="answer-button"]');

    await buttons.at(2).trigger('click');

    expect(wrapper.find('[data-test="back-to-list-btn"]').exists()).toBe(true);
  });
});
