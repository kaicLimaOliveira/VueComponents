<template>
  <div 
    class="select-panel"
    :class="{ 'is-hidden': !isOpened }"
  >
    <div class="select-panel-container mt-2">
      <DebounceInput
        @update:model-value="state.search = $event"
        class="m-2"
      ></DebounceInput>
      <hr class="my-0 has-background-grey-lighter">
      <div 
        class="select-panel-options"
        @scroll="loadOnScroll"
        ref="selectPanelOptions"
      >
        <div v-for="i, key in state.list.value" :key="key"
          class="select-panel-options-item is-clickable"
          :class="{'is-selected': i[idFieldLabel] == state.selectedItem}"
          @click="state.selectedItem = i[idFieldLabel], emit('selected', selectedItem)"
        >
          <div class="is-flex is-justify-content-space-between is-align-items-center">
            <span class="break-word">
              {{ i[fieldLabel] }}
            </span>
            <div class="is-flex is-align-items-center">
              <span 
                v-if="viewStore.checkPermission(props.viewName, 'get')"
                @click.stop="emit('view-mode', {mode: 'view', id: i[idFieldLabel]})"
                class="is-clickable has-text-primary primary-hover fs-18 ts-1"
              >
                <Icon icon="eye"></Icon>
              </span>

              <div  
                v-if="props.loadUpdateButton.value && state.indexKey === key" 
                style="display: inline-block;" 
                class="loader ml-2"
              ></div>

              <span 
                v-if="viewStore.checkPermission(props.viewName, 'update') && state.indexKey !== key"
                @click.stop="emit('view-mode', {mode: 'update', id: i[idFieldLabel]})"
                class="is-clickable has-text-link link-hover fs-18 ts-1 ml-2"
              >
                <Icon @click="[state.indexKey = key, props.loadUpdateButton.value = true]" icon="edit"></Icon>
              </span>

              <span 
                @click="emit('view-mode', {mode: 'delete', id: i[idFieldLabel]})"
                v-if="viewStore.checkPermission(props.viewName, 'delete'), props.enableDelete"
                class="is-clickable has-text-danger danger-hover fs-18 ts-1 ml-2"
              >
                <icon icon="square-xmark"></icon>
              </span>
            </div>
          </div>
        </div>
  
        <WheelLoader 
          :class="{'is-hidden': !state.isLoading}"
        ></WheelLoader>

        <div 
          v-if="state.list.value.length === 0 && !state.isLoading"
          class="m-4 fs-15 has-text-grey-light has-text-centered"
        >
          Nenhum dado encontrado...
        </div>
  
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DebounceInput from '../DebounceInput.vue';
import WheelLoader from '../loaders/WheelLoader.vue';

import { reactive, computed, watch, ref } from 'vue';
import { useViewStore } from '../../store/viewStore';

import { genericAPI } from '../../composables/GenericAPI';
import { parseQueryParams } from "../../composables/Parsers";
import { throttle } from "../../composables/Throttle"

const viewStore = useViewStore()
const emit = defineEmits(['selected', 'view-mode', 'reset-service-trigger'])

const state = reactive({
  list: { value: [] },
  selectedItem: null,
  search: '',
  offset: { value: 0 },
  isLoading: true,
  canQuery: false,
  indexKey: -1,
})

interface Props {
  service: () => Promise<any>;
  currentSelectedItem: any;  
  fieldLabel: string;
  idFieldLabel: string;
  limit: number;
  isOpened: boolean;
  queryParams?: object;
  load?: boolean;
  reload?: boolean;
  enableDelete?: boolean;
  viewName: string;
  loadUpdateButton: { value: boolean };
}

const props = withDefaults(defineProps<Props>(), {
  limit: 30,
  idFieldLabel: 'id',
  isOpened: false,
  load: false,
  reload: false,
  enableDelete: false
})

const selectedItem = computed(() => state.list.value.find(e => e[props.idFieldLabel] == state.selectedItem))

const params = computed(() => {
  return {
    'search': state.search,
    'offset': state.offset.value,
    'limit': props.limit,
    ...props.queryParams
  }
})

const apiService = genericAPI({
  getMany: {
    service: props.service,
    onSuccess(res) {
      state.isLoading = false
      state.offset.value += props.limit
      
      if (res.data.length >= props.limit) {
        state.canQuery = true
      }
    },
    onError() {
      state.isLoading = false
    },
    after() {
      if (props.reload) {
        emit('reset-service-trigger')
      }
    },
    limit: props.limit,
    offset: state.offset,
    mode: 'splice'
  }
}, state.list)

watch(
  () => state.search,
  () => {
    state.offset.value = 0
    state.list.value = []
    state.isLoading = true
    apiService.getMany(parseQueryParams(params.value))
  }
)

watch(
  () => props.currentSelectedItem,
  (newValue) => {
    if (newValue) {
      state.selectedItem = newValue[props.idFieldLabel]
      emit('selected', newValue)
    }
  }, {
    deep: true
  }
)

watch(
  () => props.load,
  (newValue) => {
    if (newValue) {
      apiService.getMany(parseQueryParams(params.value))
    }
  }
)

watch(
  () => props.reload,
  (newValue) => {
    if (newValue) {
      state.list.value = []
      state.isLoading = true
      state.offset.value = 0
      state.selectedItem = null
      
      apiService.getMany(parseQueryParams(params.value))
    }
  }
)

watch(
  () => props.loadUpdateButton?.value,
  (newValue) => {
    setTimeout(() => {
      props.loadUpdateButton.value = false
    }, 750);
    
    if (!newValue) {
      state.indexKey = -1
    }
  }
)

const selectPanelOptions = ref(null)

const loadOnScroll = throttle(() => {

  const scrollPos = (selectPanelOptions.value as any).scrollTop
  const bottom = (selectPanelOptions.value as any).scrollHeight - (selectPanelOptions.value as any).offsetHeight

  if (scrollPos >= bottom * .7 && state.canQuery) {
    state.canQuery = false
    state.isLoading = true
    apiService.getMany(parseQueryParams(params.value))
  }

}, 400)
</script>

<style lang="scss" scoped>
.select-panel {

  &-container {
    
    border: 1px solid hsl(0deg, 0%, 86%);
    border-radius: 4px;
    background-color: white;
  }

  &-options {
    height: 230px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    &-item {
      padding: .5em 1em;

      &.is-selected {
        background-color: rgba(231, 231, 231, 0.514);
      }
  
      &:hover {
        background-color: rgba(231, 231, 231, 0.514);
      }
    }
  }
}

hr {
  height: 1px;
}

.link-hover:hover {
  color: #32459b !important;
}

.danger-hover:hover {
  color: #d43c5b !important;
}

.primary-hover:hover {
  color: #0ab89e !important;
}
</style>
