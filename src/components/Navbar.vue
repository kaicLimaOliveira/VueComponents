<template>
  <div class="navigate">
    <aside class="sidebar is-flex is-flex-direction-column" :class="sideBarState">
      <div class="sidebar-logo" @click="$router.push({ name: 'Home' })">
        <div :class="{'logo-loader': state.isLoadingImage }"></div>
        <img :src="props.imgSrc" width="35" alt="logo">
      </div>
      <hr>
 
      <div class="router-links">
        <div class="container-links">
          <div class="links" v-for="{ params, label, icon, ...route } in props.routerLinks">
            <RouterLink
              v-if="route.type == 'link'"
              class="router-link"
              :to="{ name: route.routeName, params }"
              :title="label"
            >
              <Icon :icon class="router-link-icon" size="sm" />
              <span>
                {{ label }}
              </span>
            </RouterLink>

            <Dropdown
              v-else-if="route.type == 'dropdown'"
              :icon
              :label
              :is-closed="sideBarState == 'closed'"
              :links="route.links"
              @current-link-hovered="(event) => state.currentLinkHovered = event"
            ></Dropdown>
          </div>
        </div>
      </div>
    </aside>
   
    <nav class="header-content">
      <header class="nav-content">
        <div class="is-flex is-align-items-center">
          <Icon icon="bars" @click="toggleSideBar" />
        </div>
      </header>
      
      <main>
        <slot></slot>
      </main>
    </nav>
  </div>
</template>
 
<script setup lang="ts">
import Dropdown from "./elements/Dropdown.vue";
 
import { reactive, ref } from "vue";
import { Menu } from "../interfaces/Menu"
 
 
const sideBarState = ref(localStorage.getItem('sideBar') || 'opened')
 
interface Props {
  routerLinks: Menu;
  imgSrc?: string;
}

const props = withDefaults(defineProps<Props>(), {
  imgSrc: window.location.origin + '/vue.svg'
})

interface State {
  isLoadingImage: boolean;
  currentLinkHovered: number | null;
}
 
const state: State = reactive({
  isLoadingImage: false,
  currentLinkHovered: null,
})
 
 
function toggleSideBar() {
  state.isLoadingImage = true;
 
  sideBarState.value = sideBarState.value == 'opened' ? 'closed' : 'opened'
  localStorage.setItem('sideBar', sideBarState.value)
 
  setTimeout(() => state.isLoadingImage = false, 400);
}
</script>
 
<style lang="scss" scoped>
.navigate {
  display: flex;

  .sidebar {
    transition: 0.3s ease;
    flex-shrink: 0;
    z-index: 100;
    height: 100vh;
    // width: 100vw;
    border-right: 1px var(--grey-600) solid;
    background-color: var(--gray-500);
    padding: 0 16px;

    &-logo {
      cursor: pointer;
      display: flex;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 8px;
    }

  
    &-links {
      height: 100%;
      overflow-y: scroll;
  
      &::-webkit-scrollbar {
        display: none;
      }
    }
  
    hr {
      background-color: var(--grey-500);
      margin-top: 0.75rem;
      margin-bottom: 0.75rem;
      border: none;
      display: block;
      height: 2px;
      margin: 1.5rem 0;
    }
  
    .router-links {
      overflow-y: scroll;
      display: flex;
      flex-direction: column;

      &::-webkit-scrollbar {
        display: none;
      }

      .container-links  {
        margin-bottom: 20px;

        .links {
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;
      
          .router-link {
            margin: 0px 0px 5px;
            border-radius: 4px;
            transition: .12s;
            padding: 10px;
            background-color: var(--grey-400);
            display: flex;
            width: 100%;
            height: 100%;
            font-weight: 600;
            text-decoration: none;
            
            &:hover {
              background-color: var(--grey-600);

              svg, span {
                color: rgb(255, 255, 255) !important;
              }
            }
            
            &-icon {
              margin: 0 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              color: black;
            }

            span {
              font-size: 11px;
              align-items: center;
              color: var(--black-700);
              margin-left: 12px;
            }
          }
        }
      }
    }
  }

  .header-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100vh;
    width: 75%;
  }
}


 
.router-link-active {
  background-color: var(--grey-600) !important;
  color: #fff !important;
}
 
.opened {
  width: 170px;
}
 
.closed.sidebar {
  width: 75px;
 
  .router-link span {
    display: none;
  }
}
 
main {
  overflow: auto;
  scrollbar-width: thin;

  height: 100%;
}
 
.nav-content {
  box-shadow: inset 0 -1px 0 var(--grey-600);
  display: flex;
  justify-content: space-between;
  padding: 12px 22px;

  div {
    display: flex;
    align-items: center;

    svg {
      margin-right: 20px;
      cursor: pointer;
    }
  }
 
  svg {
    color: var(--black);
  }
}
</style>