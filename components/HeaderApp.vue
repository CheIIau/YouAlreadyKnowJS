<template>
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              @click="openMenu"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div
            class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
          >
            <div class="flex-shrink-0 flex items-center">
              <div
                class="font-sans text-xl text-yellow-400 hover:text-yellow-500 font-black"
              >
                <nuxt-link class="button" to="/">
                  You Already Know JS
                </nuxt-link>
              </div>
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <nuxt-link class="button" to="/questions">
                  <button
                    class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                  >
                    Вопросы
                  </button></nuxt-link
                >

                <nuxt-link class="button" to="/add">
                  <button
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Добавить
                  </button></nuxt-link
                >

                <a
                  href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >Projects</a
                >
              </div>
            </div>
          </div>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <div class="ml-3 relative">
              <nuxt-link class="button" to="/auth">
                <button
                  class="px-4 py-2 text-sm text-white duration-100 bg-yellow-400 hover:bg-yellow-500 rounded-md shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2"
                >
                  Войти
                </button>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <div v-if="toggleMobileMenu" id="mobile-menu" class="sm:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <nuxt-link class="button" to="/questions">
            <button
              class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
              aria-current="page"
            >
              Вопросы
            </button></nuxt-link
          >

          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >Team</a
          >

          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >Projects</a
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
export default Vue.extend({
  data() {
    return {
      toggleMobileMenu: false,
    };
  },
  computed: {
    ...mapGetters(['isUserAuth']),
  },
  methods: {
    openMenu() {
      this.toggleMobileMenu = !this.toggleMobileMenu;
    },
  },
});
</script>
