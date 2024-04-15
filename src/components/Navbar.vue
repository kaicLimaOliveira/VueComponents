<template>
  <div class="is-flex">
    <aside class="sidebar is-flex is-flex-direction-column" :class="sideBarState">
      <div class="mt-5 mb-2 is-clickable is-flex is-justify-content-center" @click="$router.push({ name: 'Home' })">
        <img src="../assets/vue.svg" width="50" alt="logo">
      </div>
 
      <hr class="my-3">
 
      <div class="is-flex is-flex-direction-column scrollable-content">
        <div class="mb-4">
          <div class="is-flex is-align-items-center w-100 is-relative" v-for="route in state.routerLinks">
            <div class="w-100">
              <RouterLink
                v-if="route.type == 'link'"
                class="router-link is-flex has-text-weight-semibold w-100 h-100"
                :to="{ name: route.routeName }"
                :title="route.label"
              >
                <Icon :icon="route.icon" class="icon" />
                <span class="fs-12 is-align-self-center ml-3">
                  {{ route.label }}
                </span>
              </RouterLink>
 
              <Dropdown
                v-else-if="route.type == 'dropdown'"
                :icon="route.icon"
                :label="route.label"
                :is-closed="sideBarState == 'closed'"
                :links="route.links"
                @current-link-hovered="(event) => state.currentLinkHovered = event"
              ></Dropdown>
            </div>
          </div>
        </div>
      </div>
    </aside>
   
    <header class="content is-flex is-flex-direction-column is-flex-grow-1 vh-100 w-75">
      <div class="nav-content px-5 py-3 is-flex is-justify-content-space-between">
        <div class="is-flex is-align-items-center">
          <Icon icon="bars" @click="toggleSideBar" class="mr-5 is-clickable fs-19"></Icon>
        </div>
      </div>
 
      <nav class="h-100">
        <slot></slot>
      </nav>
    </header>
  </div>
</template>
 
<script setup lang="ts">
import Dropdown from "./elements/Dropdown.vue";
 
import { reactive, ref } from "vue";
import { Link, Dropdown as IDropdown } from "../interfaces/Menu"
 
 
const sideBarState = ref(localStorage.getItem('sideBar') || 'opened')
 
type Menu = (Link | IDropdown)[];
interface State {
  isLoadingImage: boolean;
  currentLinkHovered: number | null;
  routerLinks: Menu;
}
 
const state: State = reactive({
  isLoadingImage: false,
  currentLinkHovered: null,
  routerLinks: [
    {
      type: 'link',
      routeName: 'Paginations',
      label: 'Paginação',
      icon: 'pager',
    },
    {
      type: 'link',
      routeName: 'Datatables',
      label: 'Datatables',
      icon: 'table-list',
    },
    {
      type: 'link',
      routeName: 'Alerts',
      label: 'Alertas',
      icon: 'circle-exclamation',
    },
    {
      type: 'link',
      routeName: 'Loader',
      label: 'Loaders',
      icon: 'spinner',
    },
    {
      type: 'link',
      routeName: 'Modals',
      label: 'Modals',
      icon: 'window-restore',
    },
    {
      type: 'dropdown',
      routeName: '',
      label: 'Forms',
      icon: 'file-signature',
      links: [
        {
          type: 'link',
          routeName: 'FormKit',
          label: 'FormKit',
          icon: ['fab', 'wpforms'],
        },
        {
          type: 'link',
          routeName: 'DebounceInput',
          label: 'Debounce',
          icon: 'magnifying-glass',
        },
        {
          type: 'link',
          routeName: 'Select',
          label: 'Select',
          icon: 'hand-pointer',
        },
      ],
    },
  ]
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
 
      .icon, span {
        color: var(--black-700);
        height: 1.2rem;
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
 
nav {
  overflow: auto;
  scrollbar-width: thin;
}
 
.nav-content {
  box-shadow: inset 0 -1px 0 var(--grey-600);
 
  svg {
    color: var(--black);
  }
}
</style>