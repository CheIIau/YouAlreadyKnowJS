import { Store } from 'vuex';

const createStore = () => {
  return new Store({
    state: () => ({
      counter: 0,
    }),
    mutations: {
      increment(state) {
        state.counter++;
      },
    },
  });
};

export default createStore;
