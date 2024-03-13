<template>
  <div class="ts-3">
    <RouterView v-slot="{ Component }">

      <Navbar v-if="$route.meta.enableNav">
        <Transition name="fade" mode="out-in">
          <Component 
            class="p-5 pb-6" 
            :is="Component" 
            :key="$route.path"
          ></Component>
        </Transition>
      </Navbar>

      <Transition v-else name="fade" mode="out-in">
        <Component :is="Component" class="vh-100" :key="$route.path"></Component>
      </Transition>

      <Loader v-if="loadingStore.isLoading"></Loader>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue"
import Loader from "./components/loaders/Loader.vue"

import { useLoadingStore } from "./stores/loadingStore"
const loadingStore = useLoadingStore();
</script>


<style lang="scss">
@import './assets/scss/globals.scss';
@import './assets/scss/helpers.scss';
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  background: #f9fbfd;
  overflow: hidden !important;
}

.content-container {
  height: 100%;
  overflow-y: scroll;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
}

.modal-view {
  width: 100%;
  height: 400px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dp__range_end,
.dp__range_start,
.dp__active_date {
  background: #5f76e8 !important;
}

.dp__today {
  border: 1px solid #5f76e8 !important;
}
</style>./components/loaders/Loader.vue