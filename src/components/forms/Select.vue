<template>
  <div class="field">
    <div class="is-flex is-justify-content-space-between">
      <label class="label mb-1">{{ props.title }}</label>
    </div>
    <div class="control">
      <div class="is-flex is-align-items-center w-100">
        <div class="select w-100 break-word">
          <div 
            class="input"
            :class="[props.isDisabled ? 'is-disabled' : 'is-clickable', {'is-danger': !validSelectedItem && state.validationTriggered}]"
            @click="!isDisabled ? state.isOpened = !state.isOpened : null"
          >
            <span>{{ selectedDisplayText }}</span>
          </div>
        </div>
      </div>

      <p v-show="!validSelectedItem && state.validationTriggered" class="help is-danger mt-0">
        Nenhum item selecionado.
      </p>

      <div class="select-panel" :class="{ 'is-hidden': !isDisabled && !state.isOpened }">
        <div class="select-panel-container mt-2">
          <DebounceInput @update:model-value="state.search = $event" class="m-2" />
          <hr class="my-0 has-background-grey-lighter">

          <div 
            class="select-panel-options"
            @scroll="loadOnScroll"
            ref="selectPanelOptions"
          >
            <div 
              v-for="item, key in state.data" :key="key"
              class="select-panel-options-item is-clickable"
              :class="{'is-selected': item[idFieldLabel] == state.selectedItem}"
              @click="[
                state.selectedItem = item, 
                emit('selected', state.selectedItem), 
                !props.isDisabled ? state.isOpened = !state.isOpened : null
              ]"
            >
              <div class="is-flex is-justify-content-space-between is-align-items-center">
                <span class="break-word">
                  {{ item[fieldLabel] }}
                </span>

                <div class="is-flex is-align-items-center">
                  <span 
                    v-for="{ icon, mode, color } in state.crudOptions"
                    @click.stop="emit('view-mode', { mode, item })"
                    class="is-clickable has-text-primary hover fs-18 ts-1 mx-1"
                    :class="color"
                  >
                    <Icon :icon />
                  </span>
                </div>
              </div>
            </div>
      
            <WheelLoader :is-loading="state.isLoading" />
            <div v-if="state.data.length === 0 && !state.isLoading" class="m-4 fs-15 has-text-grey-light has-text-centered">
              Nenhum dado encontrado...
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DebounceInput from './DebounceInput.vue';
import WheelLoader from '../loaders/WheelLoader.vue';

import { reactive, computed, watch, ref, onMounted } from 'vue';
import { Generic } from '../../interfaces/Generic';
import { throttle } from "../../composables/Throttle";


const emit = defineEmits<{
  (event: 'selected', value: Generic<any> | null): void,
  (event: 'view-mode', value: { mode: string, item: Generic<any> }): void,
}>()

interface State {
  selectedItem: Generic<any> | null;
  isOpened: boolean;
  validationTriggered: boolean;
  data: Generic<any>[];
  search: string;
  offset: { value: number };
  isLoading: boolean;
  canQuery: boolean;
  crudOptions: {
    mode: string;
    icon: string;
    color: string;
  }[]
}

const state: State = reactive({
  selectedItem: null,
  isOpened: false,
  validationTriggered: false,
  data: [],
  search: '',
  offset: { value: 0 },
  isLoading: false,
  canQuery: false,
  crudOptions: [
    {
      mode: 'view',
      icon: 'eye',
      color: 'has-text-primary'
    },
    {
      mode: 'update',
      icon: 'edit',
      color: 'has-text-link',
    },
    {
      mode: 'delete',
      icon: 'square-xmark',
      color: 'has-text-danger',
    },
  ]
})

interface Props {
  title: string;
  data: Generic<any>[];
  currentSelectedItem: Generic<any>;
  fieldLabel: string;
  idFieldLabel?: string;
  limit?: number;
  isDisabled?: boolean;
  enableDelete?: boolean;
  triggerValidation?: boolean;
  currentViewMode?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Título...',
  limit: 30,
  idFieldLabel: 'id',
  isDisabled: false,
  enableDelete: false,
  triggerValidation: false,
  currentViewMode: 'view'
})


const selectedDisplayText = computed(() => !state.selectedItem || !validSelectedItem ? 'Selecione' : state.selectedItem[props.fieldLabel])

const validSelectedItem = computed(() => {
  const selectedItem = state.selectedItem ?? {}
  const isValid = selectedItem[props.idFieldLabel] ?? false
  return isValid !== false
})


onMounted(() => {
  state.data = props.data;
})


watch(
  () => state.search,
  () => {
    state.isLoading = true;
    state.offset.value = 0;
    state.data = props.data.filter((res) => {
      return Object.values(res)
        .toString()
        .toUpperCase()
        .includes(state.search.toUpperCase());
    })
    state.isLoading = false;
  }
)

watch(
  () => props.currentSelectedItem,
  (newValue) => {
    if (newValue) {
      state.selectedItem = newValue;
      emit('selected', newValue);
    }
  }, {
    deep: true
  }
)


const selectPanelOptions = ref<HTMLElement | null>(null);

const loadOnScroll = throttle(() => {
  const scrollPos = selectPanelOptions.value?.scrollTop ?? 0;
  const bottom = (selectPanelOptions.value?.scrollHeight ?? 0) - (selectPanelOptions.value?.offsetHeight ?? 0);

  if (scrollPos >= bottom * .7 && state.canQuery) {
    state.canQuery = false;
    state.isLoading = true;
  }

}, 400)
</script>

<style lang="scss" scoped>
.is-disabled {
  background-color: hsl(0deg, 0%, 96%);
  border-color: hsl(0deg, 0%, 96%);
  box-shadow: none;
  color: hsl(0deg, 0%, 48%);
  cursor: not-allowed;
}

.create-icon {
  font-size: 1.75rem;
}

.create-icon:hover {
  color: #3caf7b !important;
}

.select {
  display: flex;
  align-items: center;
}

.create-disabled {
  color: rgb(235, 235, 235) !important;
  cursor: not-allowed !important;

  &:hover {
    color: rgb(235, 235, 235) !important;
  }
}

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

.hover:hover {
  filter: brightness(0.8);
}
</style>
