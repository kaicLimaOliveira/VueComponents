<template>
  <div :class="{ 'dark-theme': isDarkModeOn }">
    <RouterView v-slot="{ Component }">
      <ProgressAlert 
        v-if="$route.name == 'Datatables'"
        class="is-absolute is-flex is-align-items-center is-flex-direction-column mt-3"
        style="z-index: 9999;"
      ></ProgressAlert>
      
      <Navbar v-if="$route.meta.enableNav" :router-links="state.routerLinks">
        <Transition name="fade" mode="out-in">
          <Component 
            class="component" 
            :is="Component" 
            :key="$route.path"
          ></Component>
        </Transition>
      </Navbar>

      <Transition v-else name="fade" mode="out-in">
        <Component :is="Component" class="component-without-navbar" :key="$route.path"></Component>
      </Transition>

      <Loader v-if="loadingStore.isLoading"></Loader>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue"
import ProgressAlert from "./components/alerts/ProgressAlert.vue";
import Loader from "./components/loaders/Loader.vue"

import { useDarkModeStore } from "./stores/darkStore";
import { useLoadingStore } from "./stores/loadingStore"
import { getNavbarRoutes } from "./utils/routerLinks";
import { reactive, computed } from "vue";


const loadingStore = useLoadingStore();
const darkModeStore = useDarkModeStore()

const isDarkModeOn = computed(() => darkModeStore.isDarkModeOn)
const state = reactive({
  routerLinks: getNavbarRoutes()
})
</script>

<style lang="scss">
@import './assets/scss/globals.scss';
@import './assets/scss/helpers.scss';
// @import './assets/scss/dark-theme.scss';
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  background: #f9fbfd;
  overflow: hidden !important;

  #app {
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    div {
      transition: 0.3s;

      .component {
        padding: 20px 20px 35px 20px;
      }

      .component-without-navbar {
        height: 100vh;
      }
    }
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>