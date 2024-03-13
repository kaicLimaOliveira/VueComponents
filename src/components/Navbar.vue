<template>
  <div class="is-flex">
    <aside class="sidebar is-flex is-flex-direction-column" :class="sideBarState">
      <div class="mt-5 mb-2 is-clickable is-flex is-justify-content-center" @click="$router.push({ name: 'Home' })">
        <img src="../assets/vue.svg" width="50" alt="logo">
      </div>

      <hr class="my-3">

      <div class="is-flex is-flex-direction-column scrollable-content">
        <div class="mb-4">
          <div class="is-flex is-align-items-center w-100 is-relative">
            <div class="w-100">
              <RouterLink 
                class="router-link is-flex has-text-weight-semibold w-100 h-100"
                :to="{ name: 'Loader' }"
              >
                <Icon icon="spinner" size="xl" class="icon"></Icon>
                <span class="fs-14 is-align-self-center ml-3">
                  Loaders
                </span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </aside>
    
    <header class="content is-flex is-flex-direction-column is-flex-grow-1 vh-100 w-25">
      <div class="nav-content px-5 py-3 is-flex is-justify-content-space-between">
        <div class="is-flex is-align-items-center">
          <Icon icon="bars" @click="toggleSideBar" size="xl" class="mr-5 is-clickable fs-19"></Icon>
        </div>

        

        <!-- <div class="is-flex is-align-items-center">
          <div v-if="false" class="control has-icons-left mr-5">
            <input 
              class="input ts-15"
              type="text" 
              placeholder="Pesquisar..."
              v-model="state.search"
            >
            <span class="icon is-left">
              <icon icon="magnifying-glass" class="has-text-grey-light"></icon>
            </span>
          </div> -->

          <!-- <icon 
            @click="darkModeStore.toggleDarkMode()" 
            size="lg"
            :icon="darkModeStore.isDarkModeOn ? 'sun' : 'moon'" 
            class="mr-5 is-clickable"
          ></icon> -->

          <!-- <Options :enableDarkMode="true"></Options> -->
        <!-- </div> -->
      </div>

      <nav class="h-100">
        <slot></slot>
      </nav>
    </header>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const sideBarState = ref(localStorage.getItem('sideBar') || 'opened')

const state = reactive({
  isLoadingImage: false,
})


function toggleSideBar() {
  state.isLoadingImage = true;

  sideBarState.value = sideBarState.value == 'opened' ? 'closed' : 'opened'
  localStorage.setItem('sideBar', sideBarState.value)

  setTimeout(() => state.isLoadingImage = false, 400);
}
</script>

<style lang="scss" scoped>
.sidebar {
  transition: 0.3s ease;
  flex-shrink: 0;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  border-right: 1px var(--grey-600) solid;
  background-color: var(--gray-500);
  padding: 0 16px;

  &-links {
    height: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  hr {
    background-color: var(--grey-500)
  }

  .scrollable-content {
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .router-link {
      margin: 0px 0px 5px;
      border-radius: 8px;
      transition: .12s;
      padding: 10px 12px;
      background-color: var(--grey-400);

      .icon {
        color: black;
      }

      span {
        color: black;
      }

      &:hover {
        background-color: var(--grey-600);
      }

      &:hover .icon,
      &:hover span {
        color: rgb(255, 255, 255) !important;
      }

    }
  }
}

.router-link-active {
  background-color: var(--grey-600);
  color: #fff !important;
}

.opened {
  width: 180px;
}

.closed.sidebar {
  width: 81px;

  .router-link {
    span {
      display: none;
    }
  }
}



.nav-content {
  box-shadow: inset 0 -1px 0 var(--grey-600);

  svg {
    color: var(--black);
  }
}

.dropdown-menu::after {
  content: '';
  background-color: transparent;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  z-index: -1;
}





.animate {
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
}

.icon {
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-2px)
  }
}
</style>