import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import HeaderApp from '../components/HeaderApp/HeaderApp.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('HeaderApp', () => {
  const $router = {
    push: jest.fn(),
  };

  const mockData = {
    stubs: {
      'nuxt-link': true,
    },
    mocks: {
      $router,
    },
  };

  it('is a Vue instance', () => {
    const wrapper = shallowMount(HeaderApp, {
      ...mockData,
      store: new Store({
        mutations: { setLoadingFlag: jest.fn(), setUserAuthFlag: jest.fn() },
        getters: {
          isUserAuth() {
            return true;
          },
          isLoading() {
            return false;
          },
        },
      }),
      localVue,
    });

    expect(wrapper).toBeTruthy();
  });

  it('When user is auth show logout button', () => {
    const wrapper = shallowMount(HeaderApp, {
      ...mockData,
      store: new Store({
        mutations: { setLoadingFlag: jest.fn(), setUserAuthFlag: jest.fn() },
        getters: {
          isUserAuth() {
            return true;
          },
          isLoading() {
            return false;
          },
        },
      }),
      localVue,
    });

    const logoutBtn = wrapper.find('[data-test="header-app_logout-btn"]');

    expect(logoutBtn.text()).toBe('Выйти');
  });

  it('When user is not auth do not show add question button', () => {
    const wrapper = shallowMount(HeaderApp, {
      ...mockData,
      store: new Store({
        mutations: { setLoadingFlag: jest.fn(), setUserAuthFlag: jest.fn() },
        getters: {
          isUserAuth() {
            return false;
          },
          isLoading() {
            return false;
          },
        },
      }),
      localVue,
    });

    const wrapperHtml = wrapper.html();

    expect(wrapperHtml.includes('Добавить вопрос')).toBe(false);
  });
});
