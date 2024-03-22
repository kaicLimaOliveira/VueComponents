<template>
  <span
    @click="state.show = !state.show"
    :class="{ 'closed': isClosed, 'hovered-link': state.wrapperHovered }"
    @mouseover="state.wrapperHovered = true"
    @mouseleave="state.wrapperHovered = false"
    class="dropdown has-text-weight-semibold is-clickable w-100 is-flex is-justify-content-space-between"
    :title="label"
  >
    <div class="is-flex">
      <Icon :icon="icon" class="icon" />
      <span class="fs-12 is-align-self-center ml-3">{{ label }}</span>
    </div>
    <Icon
      v-show="!isClosed"
      icon="chevron-right"
      class="icon arrow"
      :class="{ 'rotate-arrow': state.show }"
    ></Icon>
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
          class="router-link is-flex has-text-weight-semibold w-100 h-100"
          :to="{ name: link.routeName, params: link.params }"
          :title="link.label"
        >
          <Icon :icon="link.icon" class="icon" />
          <span class="fs-12 is-align-self-center ml-3">{{ link.label }}</span>
        </RouterLink>
      </div>
    </TransitionGroup>
  </div>
</template>
 
<script setup lang="ts">
import { reactive, watch } from 'vue';
import { Link } from '../../interfaces/Menu';
 
 
const emit = defineEmits<{
  currentLinkHovered: [value: number | null]
}>()
 
interface Props {
  links: Link[];
  label: string;
  icon: string | string[];
  isClosed: boolean;
  searchInputDetailsLabel?: string;
  searchInputDetailsPosition?: string;
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
  background-color: #ebebeb;
 
  &:hover {
    background-color: var(--grey-600);
  }
 
  .is-flex .icon {
    padding-left: 2px;
  }
 
 
  .icon {
    height: 1.2rem;
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
    background-color: var(--grey-600);
  }
 
  .icon {
    height: 1.2rem;
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
  background-color: var(--grey-600);
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