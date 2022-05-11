<template>
  <div class="flex justify-center">
    <div class="p-5 border rounded-xl bg-gray-800 border-gray-900">
      <img
        class="mx-auto h-28 w-auto mb-4"
        src="~/assets/YakJS.png"
        alt="Logo"
      />
      <h1 class="text-gray-300 text-center text-lg font-sans my-7">
        Твердо уверены, что знаете JS? Это приложение позволит вам в этом
        убедиться
      </h1>
      <div class="flex flex-wrap justify-center items-center">
        <div>
          <nuxt-link
            class="button"
            to="/questions"
          >
            <button
              class="bg-gray-700 welcome-button py-4 px-2 m-2 text-gray-200 rounded-2xl hover:bg-gray-600"
              type="button"
            >
              Начать тестирование
            </button>
          </nuxt-link>
        </div>
        <div>
          <nuxt-link
            class="button"
            to="/questions"
          >
            <button
              class="bg-gray-700 welcome-button py-4 px-2 m-2 text-gray-200 rounded-2xl hover:bg-gray-600"
              type="button"
            >
              Выбрать тест из списка
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-button {
  min-width: 260px;
}
</style>