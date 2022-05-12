import { Store } from 'vuex';
import axios from 'axios';
import Vue from 'vue';

const createStore = () => {
  return new Store({
    state: {
      isAuth: false,
      isLoading: false,
      isLocalLoading: false,
      questionsIds: <string[]>[],
      currentQuestionIndex: 0,
    },
    mutations: {
      setUserAuthFlag(state, payload: boolean): void {
        state.isAuth = payload;
      },
      setLoadingFlag(state, payload: boolean): void {
        state.isLoading = payload;
      },
      setLocalLoadingFlag(state, payload: boolean): void {
        state.isLocalLoading = payload;
      },
      setQuestionsIds(state, payload: string[]): void {
        state.questionsIds = payload;
      },
      setCurrentQuestionIndex(state, payload: number) {
        state.currentQuestionIndex = payload;
      },
    },
    getters: {
      isUserAuth(state) {
        return state.isAuth;
      },
      isLoading(state) {
        return state.isLoading;
      },
      isLocalLoading(state) {
        return state.isLocalLoading;
      },
      questionsIds(state) {
        return state.questionsIds;
      },
      currentQuestionIndex(state) {
        return state.currentQuestionIndex;
      },
    },
    actions: {
      async getUserAuthentification({ commit }) {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('Токен не найден');
          return;
        }
        try {
          const response = await axios.get('/api/auth/auth', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const resJson = await response.data;
          const message = resJson.message;
          if (response.status === 400 || !resJson.token) {
            throw new Error(message);
          }
          if (resJson !== undefined && resJson.token) {
            commit('setUserAuthFlag', true);
          }
        } catch (error) {
          const message = (error as Error).message;
          console.log(message);
          Vue.toasted.error(message);
        }
      },
      async getQuestionsIds({ commit }) {
        const questionsIds = await axios.get('/api/allQuestionsIds');
        commit('setQuestionsIds', questionsIds.data);
      },
    },
  });
};

export default createStore;
