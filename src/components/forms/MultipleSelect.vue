<template>
  <div class="columns mt-4">

    <div class="column is-half">
      <div class="field mb-2">
        <label class="label">{{ title }}</label>

        <DebounceInput
          @update:model-value="toAddState.search = $event"
          class="mb-2"
        ></DebounceInput>

        <div class="control">
          <div class="select is-multiple w-100">
            <select 
              multiple 
              v-model="toAddState.selected.value" 
              :size="size" 
              class="w-100"
              :disabled="props.isDisabled"
              @scroll="loadOnScroll(toAddSelect, toAddState, toAddService, toAddServiceParams)"
              ref="toAddSelect"
            >
              <option 
                v-for="i, key in manageToAddList" 
                :key="key" 
                @dblclick="props.isDisabled ? () => null : includeItem(i)"
                :value="i[idFieldLabel]"
              >
                {{ i[fieldLabel] }}
              </option>
              
              <option v-if="toAddState.isLoading" class="wheel-loader-circle wheel-loader"></option>

            </select>
            <span 
              v-if="!manageToAddList.length && !toAddState.isLoading"
              class="no-data-msg has-text-grey-light fs-15"
            >Nenhum dado encontrado.</span>
          </div>
        </div>
        
      </div>
      <div class="is-flex">
        <button @click="includeSelected" class="button is-light is-flex-grow-1">Adicionar</button>
      </div>
    </div>

    <div class="column is-half">
      <div class="field mb-2">
        <label class="label">{{ selectedTitle }}</label>

        <DebounceInput
          v-if="selectedObj"
          @update:model-value="selectedState.search = $event"
          class="mb-2"
        ></DebounceInput>

        <div v-else class="control has-icons-left mb-2">
          <input
            class="input"
            type="text"
            :placeholder="'Pesquisar...'"
            v-model="selectedState.search"
          />
          <span class="icon is-left">
            <icon icon="magnifying-glass" class="has-text-grey-light"></icon>
          </span>
        </div>

        <div class="control">
          <div 
            class="select is-multiple w-100"
            :class="{'is-danger': validationTriggered && !validateSelectedOrToAddItems}"
          >
            <select 
              multiple 
              :disabled="props.isDisabled"
              v-model="selectedState.selected.value" 
              :size="size" class="w-100"
              @scroll="selectedObj ? loadOnScroll(selectedSelect, selectedState, selectedService, selectedServiceParams) : null"
              ref="selectedSelect"
            >
              <option 
                v-for="i, key in manageSelectedList"
                :key="key" 
                @dblclick="props.isDisabled ? () => null : removeItem(i)"
                :value="i[idFieldLabel]"
              >
                {{ i[fieldLabel] }}
              </option>

              <option v-if="selectedState.isLoading" class="wheel-loader-circle wheel-loader"></option>

            </select>
            <span 
              v-if="!manageSelectedList.length && !selectedState.isLoading" 
              class="no-data-msg has-text-grey-light fs-15"
            >Nenhum dado encontrado.</span>

            <p 
              v-show="validationTriggered && !validateSelectedOrToAddItems"
              class="help validation-msg is-danger mt-0"
            >
              Nenhum item selecionado.
            </p>

          </div>
        </div>

      </div>
      <div class="is-flex">
        <button @click="removeSelected" class="button is-light is-flex-grow-1">Remover</button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch, ref } from 'vue';
import DebounceInput from '../DebounceInput.vue';
import { genericAPI } from '../../composables/GenericAPI';
import { parseQueryParams } from '../../composables/Parsers';
import { throttle } from "../../composables/Throttle"

const emit = defineEmits(['selected', 'reset-reload', 'can-send'])

interface Props {
  title: string;
  selectedTitle: string;
  serviceAll: () => Promise<any>;
  serviceOwn: (...args: any) => Promise<any>;
  serviceAvailable: (...args: any) => Promise<any>;
  fieldLabel: string;
  idFieldLabel?: string;
  selectedObj: number | string;
  size?: number;
  limit?: number;
  isDisabled?: boolean;
  queryParams?: any;
  load?: boolean;
  reload?: boolean;
  triggerValidation?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Título do campo',
  selectedTitle: 'Título dos selecionados',
  idFieldLabel: 'id',
  size: 8,
  limit: 30,
  isDisabled: false,
  queryParams: {},
  load: false,
  reload: false,
  triggerValidation: false
})

const manageToAddList = computed(() => {
  return toAddState.list.value.filter((e: any) => (e[props.fieldLabel] as string).toUpperCase().includes(toAddState.search.toUpperCase()))
})

const manageSelectedList = computed(() => {
  return selectedState.list.value.filter((e: any) => (e[props.fieldLabel] as string).toUpperCase().includes(selectedState.search.toUpperCase()))
})

const validateSelectedOrToAddItems = computed(() => {
  const isValid = [...selectedState.list.value, ...globalState.toAdd].length > 0
  emit('can-send', isValid)
  return isValid
})

interface GlobalState {
  toAdd: [];
  toRemove: [];
}

const globalState: GlobalState = reactive({
  toAdd: [],
  toRemove: []
})

interface State {
  list: { value: [] };
  selected: { value: [] };
  search: string;
  offset: { value: number };
  isLoading: boolean;
  canQuery: boolean;
}

const toAddState: State = reactive({
  list: { value: [] },
  selected: { value: [] },
  search: '',
  offset: { value: 0 },
  isLoading: false,
  canQuery: false,
})

const selectedState: State = reactive({
  list: { value: [] },
  selected: { value: [] },
  search: '',
  offset: { value: 0 },
  isLoading: false,
  canQuery: false
})


const params = (state: State) => {
  return {
    'search': state.search,
    'offset': state.offset.value,
    'limit': props.limit,
    ...props.queryParams
  }
}


const toAddServiceParams = computed(() => {
  return props.selectedObj
  ? [props.selectedObj, parseQueryParams(params(toAddState))]
  : [parseQueryParams(params(toAddState))]
})


const selectedServiceParams = computed(() => {
  return [props.selectedObj, parseQueryParams(params(selectedState))]
})


const alreadyLoaded = ref(false)
const validationTriggered = ref(false)


const toAddService = computed(() => {
  return genericAPI({
    getMany: {
      service: props.selectedObj ? props.serviceAvailable : props.serviceAll,
      before: () => {
        toAddState.isLoading = true
      },
      onSuccess: (res) => {
        
        alreadyLoaded.value = true
        const obj = res.data
        const toAddIds = new Set(globalState.toAdd.map((e: any) => e[props.idFieldLabel]))
        const filteredObj = obj.filter((e: any) => !toAddIds.has(e[props.idFieldLabel]))

        res.data = filteredObj

        toAddState.offset.value += props.limit
        
        if (obj.length >= props.limit) {
          toAddState.canQuery = true

          if (filteredObj.length < obj.length)
            toAddService.value.getMany(...toAddServiceParams.value)
        }
      },
      after: () => {
        toAddState.isLoading = false
      },
      limit: props.limit,
      offset: toAddState.offset,
      mode: 'splice'
    }
  }, toAddState.list)
})


const selectedService = computed(() => {
  return genericAPI({
    getMany: {
      service: props.serviceOwn,
      before: () => {
        selectedState.isLoading = true
      },
      onSuccess: (res) => {

        const obj = res.data
        const toRemoveIds = new Set(globalState.toRemove.map((e: any) => e[props.idFieldLabel]))
        const filteredObj = obj.filter((e: any) => !toRemoveIds.has(e[props.idFieldLabel]))

        res.data = filteredObj

        selectedState.offset.value += props.limit
        
        if (obj.length >= props.limit) {
          selectedState.canQuery = true
        
          if (filteredObj.length < obj.length)
            selectedService.value.getMany(...selectedServiceParams.value)
        }
      },
      after: () => {
        emit('reset-reload')
        selectedState.isLoading = false
      },
      limit: props.limit,
      offset: selectedState.offset,
      mode: 'splice'
    }
  }, selectedState.list)
})


const selectedSelect = ref(null)
const toAddSelect = ref(null)


const loadOnScroll = throttle((el: HTMLElement, currentState: State, currentService: any, currentParams: any) => {

  const scrollPos = el.scrollTop
  const bottom = el.scrollHeight - el.offsetHeight

  if (scrollPos >= bottom * .7 && currentState.canQuery) {
    currentState.canQuery = false
    currentService.getMany(...currentParams)
  }

}, 400)


function includeItem(i: any) {
  const index = toAddState.list.value.indexOf(i as any as never)
  const [ item ] = toAddState.list.value.splice(index, 1)
  
  selectedState.list.value.push(item)

  globalState.toRemove.includes(item)
  ? globalState.toRemove.splice(globalState.toRemove.indexOf(item), 1)
  : globalState.toAdd.push(item)
}


function includeSelected() {
  for (let i = 0; i < toAddState.list.value.length; i++) {
    const e = toAddState.list.value[i];
    if (toAddState.selected.value.includes(e[props.idFieldLabel])) {
      includeItem(e)
      i--
    }
  }
  
  toAddState.selected.value.forEach((e) => {
    toAddState.list.value.forEach((i, idx) => {

      if (i[props.idFieldLabel] == e) {
        includeItem(idx)
      }
    })
  })
}


function removeItem(i: any) {
  const index = selectedState.list.value.indexOf(i as any as never)
  const [ item ] = selectedState.list.value.splice(index, 1)
  toAddState.list.value.push(item)
  
  globalState.toAdd.includes(item)
  ? globalState.toAdd.splice(globalState.toAdd.indexOf(item), 1)
  : globalState.toRemove.push(item)
}


function removeSelected() {
  for (let i = 0; i < selectedState.list.value.length; i++) {
    const e = selectedState.list.value[i];
    if (selectedState.selected.value.includes(e[props.idFieldLabel])) {
      removeItem(e)
      i--
    }
  }
}


watch(
  () => toAddState.search,
  () => {
    toAddState.offset.value = 0
    toAddState.list.value = [...globalState.toRemove]
    toAddService.value.getMany(...toAddServiceParams.value)
  }
)


watch(
  () => selectedState.search,
  () => {
    if (props.selectedObj) {
      selectedState.offset.value = 0
      selectedState.list.value = [...globalState.toAdd]
      selectedService.value.getMany(...selectedServiceParams.value)
    }
  }
)


watch(
  () => props.selectedObj,
  (newValue) => {
    alreadyLoaded.value = true
    globalState.toAdd = []
    globalState.toRemove = []

    toAddState.list.value = []
    toAddState.offset.value = 0

    selectedState.list.value = []
    selectedState.offset.value = 0

    if (newValue)
      selectedService.value.getMany(...selectedServiceParams.value)
      
    toAddService.value.getMany(...toAddServiceParams.value)
  }
)


watch(
  () => globalState.toAdd,
  (newValue) => {
    emit('can-send', newValue.length > 0)
  },
  {
    deep: true
  }
)


watch(
  () => globalState,
  (newValue) => {
    emit('selected', {
      toAdd: newValue.toAdd.map(e => e[props.idFieldLabel]),
      toRemove: newValue.toRemove.map(e => e[props.idFieldLabel]),
    })
  }, 
  { deep: true }
)


watch(
  () => props.load,
  (newValue) => {
    if (newValue && !alreadyLoaded.value && !props.selectedObj)
      toAddService.value.getMany(...toAddServiceParams.value)
  }
)


watch(
  () => props.reload,
  (newValue) => {
    if (newValue) {
      alreadyLoaded.value = true
      globalState.toAdd = []
      globalState.toRemove = []
  
      toAddState.list.value = []
      toAddState.offset.value = 0
  
      selectedState.list.value = []
      selectedState.offset.value = 0
  
      if (props.selectedObj)
        selectedService.value.getMany(...selectedServiceParams.value)
        
      toAddService.value.getMany(...toAddServiceParams.value)
    }
  }
)


watch(
  () => props.triggerValidation,
  (newValue) => {
    if (newValue) { 
      validationTriggered.value = newValue
    }
  }
)

</script>

<style lang="scss" scoped>
option {
  padding: 0.4rem 0.6rem !important
}

.no-data-msg {
  position: absolute;
  top: 0;
  width: 100%;
  margin-top: 20px;
  text-align: center;
  z-index: 100;
}

.validation-msg {
  position: absolute;
  bottom: 10px;
  text-align: center;
  width: 100%;
  z-index: 100;
  font-size: 13px;
}

select {
  height: 250px !important;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f7f7f7;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(226, 226, 226);
    border-radius: 20px;
    transition: .2s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgb(219, 219, 219);
  }

  &[multiple] option:checked {
    background-color: rgba(231, 231, 231, 0.699);
  }
}

.wheel-loader-circle {
  border-radius: 50%;
  border: 3px solid transparent;
  margin: 10px auto;
  pointer-events: none;
}

.wheel-loader {
  box-sizing: border-box;
  height: 40px;
  width: 40px;
  border-top-color: rgb(73, 73, 73) !important;
  border-top: 3px solid;
  animation: wheel .8s infinite cubic-bezier(0.77, .35, 0.3, .6);
}

@keyframes wheel {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>