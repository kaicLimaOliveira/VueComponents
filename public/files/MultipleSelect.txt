<template>
  <div class="columns p-1 has-background-white is-rounded">
    <div class="column is-half">
      <div class="field">
        <label class="label">{{ title }}</label>
        <DebounceInput @update:modelValue="state.toAddFilter = $event" />

        <div class="control mt-2">
          <div class="select is-multiple w-100">
            <select 
              @change="emit('selected', state.selectedList)" 
              v-model="state.toAddItemsSelected"
              multiple
              :size="props.size" 
              class="w-100"
              :disabled="props.isDisabled"
            >
              <option 
                v-for="i, idx in toAddItemsFiltered" 
                :key="idx" 
                @dblclick="includeOnDblClick(i)"
                :value="i[idFieldName]"
              >
                {{ i[fieldLabel] }}
              </option>
            </select>
          </div>
        </div>
      </div>
        
      <div class="is-flex">
        <button @click="includeSelected" class="button is-light mr-3 is-flex-grow-1">Adicionar</button>
        <button @click="includeAll" class="button is-light">Adicionar Tudo</button>
      </div>
    </div>

    <div class="column is-half">
      <div class="field">
        <label class="label">{{ selectedTitle }}</label>
        <DebounceInput @update:modelValue="state.selectedFilter = $event" />

        <div class="control mt-2">
          <div class="select is-multiple w-100">
            <select v-model="state.selectedItemsSelected" multiple :size="size" class="w-100">
              <option v-for="i, idx in selectedItemsFiltered" :key="idx" 
                @dblclick="removeOnDblClick(i)"
                :value="i[idFieldName]">{{ i[fieldLabel] }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="is-flex">
        <button @click="removeSelected" class="button is-light mr-3 is-flex-grow-1">Remover</button>
        <button @click="removeAll" class="button is-light">Remover Tudo</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import { Generic } from '../../interfaces/Generic';
import DebounceInput from './DebounceInput.vue';

const emit = defineEmits<{
  "selected": [value: Generic<any>[]  ],
}>()

interface Props {
  data: Generic<any>[];
  selected: Generic<any>[];
  fieldLabel: string;
  title?: string;  
  selectedTitle?: string;
  size?: number;
  isDisabled?: boolean;
  idFieldName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Título do campo',
  selectedTitle: 'Título dos selecionados',
  idFieldName: 'id',
  size: 8,
})

interface State {
  selectedList: Generic<any>[];
  toAddItemsSelected: Generic<any>[];
  selectedItemsSelected: Generic<any>[];
  toAddFilter: string;
  selectedFilter: string;
}

const state: State = reactive({
  selectedList: [],
  toAddItemsSelected: [],
  selectedItemsSelected: [],
  toAddFilter: '',
  selectedFilter: ''
})

watch(
  () => props.selected,
  (newSelectedList) => {

    props.data.push(...state.selectedList.splice(0))

    newSelectedList.forEach(e => {
      const itemIdx: number = props.data.findIndex(((i: any) => i[props.idFieldName] == e))
      if (itemIdx == -1) return

      const [ item ] = props.data.splice(itemIdx, 1)
      state.selectedList.push(item)
    })
    emit('selected', state.selectedList)
  }
)


const toAddItemsFiltered = computed(() => {
  return props.data.filter((e: any) => {
    return e[props.fieldLabel]?.toUpperCase().includes(state.toAddFilter.toUpperCase())
  })
})

const selectedItemsFiltered = computed(() => {
  return state.selectedList.filter(e => {
    return (e[props.fieldLabel] as string).toUpperCase().includes(state.selectedFilter.toUpperCase())
  })
})

function includeOnDblClick(i: any) {
  const [ item ] = props.data.splice(props.data.indexOf(i), 1)
  state.selectedList.push(item)
}

function includeSelected() {
  state.toAddItemsSelected.forEach((e) => {
    props.data.forEach((i: any, idx) => {
      if (i[props.idFieldName] == e) {
        const [ item ] = props.data.splice(idx, 1)
        state.selectedList.push(item)
      }
    })
  })
}

function includeAll() {
  toAddItemsFiltered.value.forEach((e: any) => {
    const [ item ] = props.data.splice(props.data.indexOf(e), 1)
    state.selectedList.push(item)
  })

  if (state.toAddItemsSelected.length === 0)
    emit('selected', state.selectedList)
}

function removeOnDblClick(i: any) {
  const [ item ] = state.selectedList.splice(state.selectedList.indexOf(i), 1)
  props.data.push(item)
}

function removeSelected() {
  state.selectedItemsSelected.forEach((e) => {
    state.selectedList.forEach((i, idx) => {
      if (i[props.idFieldName] == e) {
        const [ item ] = state.selectedList.splice(idx, 1)
        props.data.push(item)
      }
    })
  })
}

function removeAll() {
  selectedItemsFiltered.value.forEach(e => {
    const [ item ] = state.selectedList.splice(state.selectedList.indexOf(e), 1)
    props.data.push(item)
  })
}

</script>

<style lang="scss" scoped>
option {
  padding: 0.4rem 0.6rem !important
}

select {
  height: 258px !important;
}

.is-rounded {
  border-radius: 4px;
}
</style>