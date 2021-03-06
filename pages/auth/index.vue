<template>
  <div class="min-h-full flex items-center justify-center pt-3 pb-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-28 w-auto"
          src="~/assets/YakJS.png"
          alt="Logo"
        />
        <h2 class="mt-6 text-center text-gray-300 text-3xl font-extrabold">
          Войти в свой аккаунт
        </h2>
      </div>
      <form
        class="mt-8 space-y-6"
        action="#"
        method="POST"
      >
        <input
          type="hidden"
          name="remember"
          value="true"
        />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label
              for="email-address"
              class="sr-only"
            >Email</label>
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
            />
          </div>
          <div>
            <label
              for="password"
              class="sr-only"
            >Пароль</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Пароль"
            />
          </div>
        </div>
        <div v-if="!isLocalLoading">
          <div class="mb-5">
            <button
              type="button"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="onLogin"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  class="h-5 w-5 text-yellow-500 group-hover:text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Войти
            </button>
          </div>
          <div>
            <button
              type="button"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="onRegister"
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
        <div
          v-else
          class="flex justify-center"
        >
          <spinner />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import {
  fetchRegister,
  fetchLogin,
  requestAuthHandler,
  AuthCredentials,
  storeUserData,
} from './auth';
import Spinner from '~/components/Spinner.vue';
export default Vue.extend({
  components: {
    Spinner,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters(['isUserAuth', 'isLocalLoading']),
  },
  methods: {
    ...mapActions(['getUserAuthentification']),
    ...mapMutations(['setLocalLoadingFlag']),
    async onRegister() {
      if (this.email && this.password) {
        this.setLocalLoadingFlag(true);
        const register = await requestAuthHandler(
          fetchRegister,
          this.email,
          this.password
        );
        if (register?.registered) {
          await this.onLogin();
        }
        this.setLocalLoadingFlag(false);
      } else {
        this.$toast.error('Введите логин и пароль');
      }
    },
    async onLogin() {
      if (this.email && this.password) {
        this.setLocalLoadingFlag(true);
        const { userId, token } = (await requestAuthHandler(
          fetchLogin,
          this.email,
          this.password
        )) as AuthCredentials;
        storeUserData(userId, token, this.email);
        await this.getUserAuthentification();
        this.setLocalLoadingFlag(false);
        await this.$router.push('/');
      } else {
        this.$toast.error('Введите логин и пароль');
      }
    },
  },
});
</script>
