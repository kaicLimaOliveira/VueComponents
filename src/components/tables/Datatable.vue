<template>
  <div class="is-flex is-flex-direction-column w-100 box">
    <slot></slot>
    <div class="is-flex is-justify-content-space-between mb-3">

      <div class="is-flex is-align-items-center">
        <DebounceInput 
          v-if="props.enableInputSearch"
          :has-details-icon="true" 
          :details-label="props.searchInputDetailsLabel"
          :details-data="props.searchInputDetailsData" 
          @update:modelValue="state.search = $event"
        ></DebounceInput>
  
        <div v-if="props.enableChangeItemsPerPage" class="has-text-weight-medium ml-3">
          <label class="is-flex is-align-items-center">Mostrar 
            <select 
              v-model="state.itemsPerPage"
              class="button mx-2 px-2" 
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>  
      </div>

      <div class="is-flex">
        <div class="is-flex is-align-items-center" v-if="props.enableDateFilter">
          <!-- <DatePicker :start-date="dateFilterStart" @update:model-value="state.date = $event"></DatePicker> -->
        </div>
      </div>
    </div>

    <div class="table-container mb-0">
      <table v-show="!state.isLoading" class="table is-fullwidth has-text-left"
        :class="[{ 'is-bordered': isBordered, 'is-hoverable': isHoverable, 'is-striped': isStriped }, `table-padding-${tablePadding}`]">
        <thead>
          <tr class="is-clipped">
            <th v-for="header, key in computedHeaders" :key="key">
              <div @click="orderedFields(key as string)" class="is-flex">
                <span>{{ header }}</span>

                <div class="ml-3 is-relative" v-if="fieldExceptions(key as string) && props.enableOrdered">
                  <Transition name="slide-up">
                    <Icon v-if="state.ordered === 'normal'" icon="sort" class="is-absolute" />
                    <Icon v-else-if="state.ordered === 'up'" icon="sort-up" class="is-absolute" />
                    <Icon v-else-if="state.ordered === 'down'" icon="sort-down" class="is-absolute" />
                  </Transition>
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr 
            v-for="column, key in list[state.page - 1]" 
            :key="key"
            v-show="column !== undefined"
          >
            <td 
              v-for="row, tdKey in column" 
              :key="tdKey" 
              v-show="tdKey != 0" 
              class="vertical-align-middle is-clickable break-word"
              @click="selectItem((column)[0], 'view')"
            >
              <div v-if="row.html !== undefined" v-html="row.html"></div>
              <div v-else>{{ row }}</div>
            </td>
            
            <td v-if="props.enableUpdate || props.enableDelete" class="vertical-align-middle">
              <Icon 
                v-if="props.enableUpdate" 
                class="is-clickable has-text-link mr-4" 
                icon="edit"
                @click="selectItem((column)[0], 'update')"
              ></Icon>

              <Icon v-if="props.enableDelete" class="is-clickable has-text-danger" icon="times-circle"
                @click="selectItem((column)[0], 'delete')">
              </Icon>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <div v-if="state.data.length == 0 && !state.isLoading" class="mt-4">
            <span>Nenhum dado disponível...</span>
          </div>

          <div v-else class="is-flex has-text-weight-bold mt-3">
            Total de {{ state.data.length }} ite
            <span v-if="state.data.length != 1">ns</span>
            <span v-else>m</span>.
          </div>
        </tfoot>
      </table>

      <div v-show="state.isLoading" class="anim-container mb-5">
        <div v-for="_ in 3" class="is-flex">
          <div class="table-loader-anim is-flex-grow-1 mb-1 mr-1"></div>
          <div class="table-loader-anim is-flex-grow-1 mb-1 mr-1"></div>
          <div class="table-loader-anim is-flex-grow-1 mb-1"></div>
        </div>
      </div>
    </div>

    <Pagination v-model="state.page" :pages="tablePages" :showButtonsOnBounderies="props.showButtonsOnBounderies" />
  </div>
</template>

<script setup lang="ts">
// import DatePicker from "./Datepicker.vue";
import DebounceInput from "../forms/DebounceInput.vue";
import Pagination from "./Pagination.vue";

import { reactive, computed, watch, onMounted } from "vue";
import { Generic } from "../../interfaces/Generic";

interface Props {
  headers: Generic<string>;
  data: Generic<any>[];
  itemsPerPage: number;
  enableUpdate?: boolean;
  enableDelete?: boolean;
  idFieldName?: string;
  loadingDelay?: number;
  isBordered?: boolean;
  isStriped?: boolean;
  isHoverable?: boolean;
  tablePadding?: number;
  showButtonsOnBounderies?: boolean;
  enableDateFilter?: boolean;
  enableOrdered?: boolean;
  dateFilterStart?: Date;
  searchInputDetailsLabel?: string;
  searchInputDetailsData?: string[];
  enableChangeItemsPerPage?: boolean;
  enableInputSearch?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
  enableUpdate: true,
  enableDelete: true,
  idFieldName: 'id',
  loadingDelay: 400,
  isBordered: false,
  isStriped: true,
  isHoverable: true,
  tablePadding: 3,
  showButtonsOnBounderies: true,
  enableDateFilter: false,
  dateFilterStart: (_props) => new Date(),
  searchInputDetailsLabel: 'Você pode filtrar os seguintes campos:',
  enableChangeItemsPerPage: true,
  enableInputSearch: true
})


const emit = defineEmits<{
  "dateValue": [value: [Date, Date] ],
  "view": [value: object ],
  "update": [value: object ],
  "delete": [value: object ],
  "currentPage": [value: number ],
}>()


interface State {
  date: [Date, Date]
  search: string;
  data: Generic<any>[];
  page: number;
  isLoading: boolean;
  itemsPerPage: number;
  ordered: string;
}


const state: State = reactive({
  date: [new Date(), new Date()],
  search: '',
  data: [],
  page: 1,
  isLoading: false,
  itemsPerPage: 10,
  ordered: 'normal'
})


onMounted(() => {
  state.itemsPerPage = props.itemsPerPage
  state.data = props.data
})


const list = computed(() => {
  let pagesList: any[][][] = []
  const columnList = []

  for (let i = 0; i < state.data.length; i++) {

    const el = state.data[i];
    const rowList = []

    if (el === undefined) {
      columnList.push(el)
      continue
    }

    if (el.hasOwnProperty(props.idFieldName)) {
      rowList.unshift(el[props.idFieldName])
    }

    for (const h in props.headers) {
      Object.entries(el).forEach(([key, value]) => {
        if (h == key) {
          return rowList.push(value)
        }
      })
    }

    columnList.push(rowList)
  }

  const pagesLength = Math.ceil(columnList.length / state.itemsPerPage)
  for (let i = 0; i < pagesLength; i++) {
    pagesList.push(columnList.splice(0, state.itemsPerPage))
  }

  return pagesList
})


const computedHeaders = computed(() => {
  (props.enableUpdate || props.enableDelete) ? props.headers['options'] = 'Opções' : props.headers
  return props.headers
})


watch(
  () => state.isLoading,
  async () => {

    await new Promise(() => {
      setTimeout(() => state.isLoading = false, props.loadingDelay)
    })
  }
)


const offset = computed(() => (state.page - 1) * state.itemsPerPage)
const tablePages = computed(() =>  Math.ceil(state.data.length / state.itemsPerPage))


watch(
  () => state.page,
  (newValue) => {

    emit('currentPage', newValue)
    if (state.data.length <= offset.value) 
      state.data.length = offset.value + state.itemsPerPage
  }
)


watch(
  () => state.date,
  (newDate, oldDate) => {

    if (!oldDate) {
      emit('dateValue', newDate)
      return
    }

    const [nSt, nEd] = newDate
    const [oSt, oEd] = oldDate

    if (nSt.toLocaleDateString() != oSt.toLocaleDateString() || nEd.toLocaleDateString() != oEd.toLocaleDateString()) {
      emit('dateValue', newDate)
    }
  }
)


watch(
  () => state.search,
  () => {
    state.isLoading = true;
    state.data = props.data.filter((res) => {
      return Object.values(res)
        .toString()
        .toUpperCase()
        .includes(state.search.toUpperCase());
    })
  }
)

watch(
  () => state.data.length,
  (newValue) => {

    const limit = Math.ceil(newValue / state.itemsPerPage)
    if (limit < state.page && state.page != 1) {
      state.page--
    }
  }
)


function orderedFields(field: string) {
  switch (state.ordered) {
    case 'normal':
      state.ordered = 'up'
      break;
    case 'down':
      state.ordered = 'up'
      break;
    case 'up':
      state.ordered = 'down'
  }

  return state.data.sort((a, b) => {
    const ordered = a[field].localeCompare(b[field])
    return state.ordered === 'up' ? ordered : -ordered
  })
}


function selectItem(id: number, emitOption: any) {
  const selectedItem = state.data.find((res) => res.id === id);
  if (selectedItem) {
    emit(emitOption, selectedItem)
  }
}


const fieldExceptions = (key: string) => {
  const exceptions = ['options']  
  if (exceptions.includes(key)) {
    return false
  }
  return true
}
</script>

<style lang="scss" scoped>
.table-padding-1 th,
.table-padding-1 td {
  padding: 0.25em 0.5em;
}

.table-padding-2 th,
.table-padding-2 td {
  padding: 0.35em 0.65em;
}

.table-padding-3 th,
.table-padding-3 td {
  padding: 0.5em 0.75em;
}

.table-padding-4 th,
.table-padding-4 td {
  padding: 0.75em 1em;
}

.anim-container {
  height: 4rem;
  position: relative;
}

.table-loader-anim {
  background-color: rgba(128, 128, 128, 0.199);
  min-width: 100px;
  height: 25px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.table-loader-anim::after {
  content: '';
  background-color: rgba(255, 255, 255, 0.719);
  width: 30px;
  height: 150%;
  position: absolute;
  filter: blur(20px);
  top: 50%;
  left: -10%;
  transform: translateY(-50%);
  animation: table-loader-anim .7s infinite ease-in-out;
}

@keyframes table-loader-anim {
  0% {
    left: -10%;
  }

  100% {
    left: 110%;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
