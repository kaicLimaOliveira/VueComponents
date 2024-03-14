<template>

  <span 
    @click="state.show = !state.show" 
    :class="{ 'closed': isClosed, 'hovered-link': state.wrapperHovered }"
    @mouseover="state.wrapperHovered = true"
    @mouseleave="state.wrapperHovered = false"
    class="dropdown has-text-weight-semibold is-clickable"
  >
    <div class="is-flex">
      <icon :icon="icon" class="icon" />
      <span class="fs-13 is-align-self-center">{{ label }}</span>
    </div>
    <icon 
      v-show="!isClosed" 
      icon="chevron-right" 
      class="icon arrow" 
      :class="{ 'rotate-arrow': state.show }"
    />
  </span>

  <div class="links-container navbar-item-container" :class="{ 'links-container-bg': state.show }">
    <TransitionGroup name="fade-list">
      <div 
        v-for="link, key in state.linksList" 
        :key="key" 
        :style="{ 'transition-delay': key / 20 + 's' }"
      >
        <RouterLink 
          :class="{ 'closed': isClosed, 'hovered-link': state.currentLinkHovered === key + 1}"
          @mouseover="state.currentLinkHovered = key + 1"
          @mouseleave="state.currentLinkHovered = null"
          class="router-link is-flex has-text-weight-semibold"
          :to="{ name: link.routeName, params: link.params }"
        >
          <icon :icon="link.icon" class="icon" />
          <span class=" fs-13 is-align-self-center">{{ link.label }}</span>
        </RouterLink>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';

const emit = defineEmits<{
  currentLinkHovered: [value: number | null]
}>()

interface Props {
  searchInputDetailsLabel?: string;
  searchInputDetailsPosition?: string;
  searchInputDetailsData?: string[];
}

interface Link {
  type: string;
  label: string;
  routeName: string;
  params: any;
  code: string;
  icon: string;
  alwaysShow: boolean;
}

interface Props {
  links: Link[];
  label: string;
  icon: string;
  isClosed: boolean;
  searchInputDetailsLabel?: string;
  searchInputDetailsPosition?: string;
  searchInputDetailsData?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  links: () => [],
  isClosed: false,
  searchInputDetailsLabel: 'Você pode filtrar os seguintes campos:',
  searchInputDetailsPosition: 'right',
})

interface State {
  show: boolean;
  linksList: Link[]
  sideBar: string;
  search: string;
  currentLinkHovered: number | null;
  wrapperHovered: boolean;
}

const state: State = reactive({
  show: false,
  linksList: [],
  sideBar: localStorage.getItem('sideBar') || 'opened',
  search: '',
  currentLinkHovered: null,
  wrapperHovered: false
})

watch(
  () => state.currentLinkHovered,
  (newValue) => {
    emit('currentLinkHovered', newValue === null ? null : -newValue)
  }
)

watch(
  () => state.wrapperHovered,
  (newValue) => {
    emit('currentLinkHovered', newValue ? 999 : null)
  }
)

watch(
  () => state.show,
  (newValue) => {
    if (newValue)
      state.linksList = props.links
    else
      state.linksList = []
  }
)

watch(
  () => props.links,
  (newValue) => {
    if (newValue && state.show)
      state.linksList = props.links
  }
)
</script>

<style scoped lang="scss">
.dropdown {
  margin: 0px 0px 5px;
  border-radius: 8px;
  transition: .12s;
  font-family: 'Montserrat';
  padding: 10px 12px;
  color: rgb(92, 92, 92) !important;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .icon {
    margin-right: 10px;
    width: 20px;
  }

  &:hover {
    background-color: #dc3545 !important;
  }

  &:hover .icon,
  &:hover span {
    color: #fff !important;
  }
}

.navbar-item-container {
  position: relative;
  width: 100%;
}
.router-link {
  border-radius: 8px;
  transition: .12s;
  padding: 10px 12px;
  margin: 0px 0px 5px;
  color: rgb(92, 92, 92);

  &:hover {
    background-color: #dc3545;
  }

  .icon {
    margin-right: 10px;
    width: 20px;
  }

  &:hover .icon,
  &:hover span {
    color: #fff !important;
  }
}

.closed.router-link,
.closed.dropdown {
  span {
    display: none;
  }
}

.router-link-active {
  background-color: #dc3545;
  color: #fff !important;

  .icon,
  span {
    color: #fff !important;
  }
}

.arrow {
  width: 9px !important;
  margin: 0 !important;
}

.rotate-arrow {
  transform: rotate(90deg);
}

.links-container {
  transition: .25s;
  border-radius: 8px;
  transform: translateX(12px)
}

.links-container-bg {
  background-color: rgba(190, 190, 190, 0.17);
  transform: translateX(0)
}

.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.5s ease;
}

.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>