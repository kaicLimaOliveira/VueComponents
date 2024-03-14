<template>
  <div class="field">
    <div class="is-flex is-justify-content-space-between">
      <label class="label mb-1">{{ title }}</label>
    </div>
    <div class="control">
      <div class="is-flex is-align-items-center">
        <div class="select w-100 break-word">
          <div 
            class="input"
            :class="[isDisabled ? 'is-disabled' : 'is-clickable', {'is-danger': !validSelectedItem && state.validationTriggered}]"
            @click="!isDisabled ? state.isOpened = !state.isOpened : null"
          >
            <span>{{ !state.selectedItem || !validSelectedItem ? 'Selecione' : state.selectedItem[props.fieldLabel] }}</span>
          </div>
  
        </div>
        <span 
          v-if="viewStore.checkPermission(props.viewName, 'create')"
          :class="{'create-disabled': props.isDisabled}"
          class="is-clickable has-text-success create-icon ts-1 ml-3"
          @click="props.isDisabled ? null : emit('view-mode', {mode: 'create', id: 0})"
        >
          <icon icon="plus-square"></icon>
        </span>
        <span 
          v-if="(props.currentSelectedItem)?.id && !props.isDisabled"
          class="is-clickable button is-light create-icon-x ts-1 fs-12 has-text-weight-medium ml-3"
          @click="emit('selected', null)"
        >
          Limpar
        </span>

      </div>

      <p 
        v-show="!validSelectedItem && state.validationTriggered"
        class="help is-danger mt-0"
      >Nenhum item selecionado.</p>

      <SelectPanel
        :service="service"
        :field-label="fieldLabel"
        :id-field-label="idFieldLabel"
        :limit="limit"
        :is-opened="isDisabled ? false : state.isOpened"
        :current-selected-item="state.selectedItem"
        :query-params="props.queryParams"
        :load="props.load"
        :reload="props.reload"
        :enable-delete="props.enableDelete"
        :load-update-button="props.loadUpdateButton"
        :view-name="props.viewName"
        @reset-service-trigger="() => {
          emit('reset-reload')
          if (!props.currentSelectedItem || props.currentSelectedItem[props.idFieldLabel] === 0) state.selectedItem = null
        }"
        @selected="state.selectedItem = $event"
        @view-mode="emit('view-mode', $event)"
      ></SelectPanel>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectPanel from './SelectPanel.vue';
import { reactive, computed, watch } from 'vue';
import { useViewStore } from '../../store/viewStore';
import { Generic } from '../../interfaces/Generic';

const viewStore = useViewStore()
const emit = defineEmits(['selected', 'view-mode', 'reset-reload', 'can-send'])

interface State {
  selectedItem: any;
  isOpened: boolean;
  validationTriggered: boolean;
}

const state: State = reactive({
  selectedItem: null,
  isOpened: false,
  validationTriggered: false
})

interface Props {
  title: string;
  service: () => Promise<any>;
  currentSelectedItem: Generic<any>;
  fieldLabel: string;
  idFieldLabel?: string;
  limit?: number;
  isOpened?: boolean;
  isDisabled?: boolean;
  queryParams?: object;
  load?: boolean;
  reload?: boolean;
  enableDelete?: boolean;
  viewName: string;
  triggerValidation?: boolean;
  currentViewMode?: string;
  loadUpdateButton: { value: boolean };
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Título...',
  limit: 30,
  idFieldLabel: 'id',
  isOpened: false,
  isDisabled: false,
  load: false,
  reload: false,
  enableDelete: false,
  triggerValidation: false,
  currentViewMode: 'view'
})

const validSelectedItem = computed(() => {
  const selectedItem = state.selectedItem ?? {}
  const isValid = selectedItem[props.idFieldLabel] ?? false
  return isValid !== false
})

watch(
  () => state.selectedItem,
  (newValue) => {

    if (newValue) {
      emit('selected', newValue)
      emit('can-send', validSelectedItem.value)
      
      if (validSelectedItem.value === true)
        state.validationTriggered = false
    }
  }
)

watch(
  () => props.currentSelectedItem,
  (newValue) => {

    (newValue && newValue[props.idFieldLabel] != 0)
    ? state.selectedItem = newValue
    : state.selectedItem = null

    state.isOpened = false
  }, {
    deep: true
  }
)

watch(
  () => props.triggerValidation,
  (newValue) => {
    if (newValue) { 
      state.validationTriggered = newValue
    }
  }
)

watch(
  () => props.currentViewMode,
  (newValue) => {
    if (newValue === 'create') {
      state.validationTriggered = false
    }
  }
)
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
</style>
