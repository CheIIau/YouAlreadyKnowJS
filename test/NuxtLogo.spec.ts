import { mount } from '@vue/test-utils';
import ExampleComponent from '../components/QuestionComponent/QuestionComponent.vue';

describe('ExampleComponent', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(ExampleComponent);
    expect(wrapper.vm).toBeTruthy();
  });
});
