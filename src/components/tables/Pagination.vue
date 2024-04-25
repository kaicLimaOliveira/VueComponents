<template>
  <div class="pagination">
    <div class="pagination-previous-button">
      <button 
        class="button"
        :class="!isPrevControlsActive && !showButtonsOnBounderies ? 'is-invisible' : 'control-items-active'"
        @click="goToPrev"
      >
        Anterior
      </button>
    </div>

    <div class="pagination-pages">
      <span v-for="page, key in pagination" :key="key">
        <Transition name="slide">
          <button 
            v-if="page" 
            class="page p-3 m-1 is-clickable" 
            type="button" 
            :aria-label="`Page ${page}`"
            :class="{ 'page-active': isActive(page) }"
            :style="`background-color: ${isActive(page) ? '' : 'transparent'};`" @click="updatePageHandler(page)"
          >
            {{ page }}
          </button>
        </Transition>
        </span>
    </div>

    <div class="pagination-next-button">
      <button 
        class="button"
        :class="!isNextControlsActive && !showButtonsOnBounderies ? 'is-invisible' : 'control-items-active'"
        @click="goToNext"
      >
        Próximo
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface PaginationProps {
  pages: number;
  modelValue: number;
  rangeSize?: number;
  showButtonsOnBounderies?: boolean;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  pages: 0,
  rangeSize: 1,
  modelValue: 0,
  showButtonsOnBounderies: false,
})

const emit = defineEmits<{
  "update:modelValue": [value: number ]
}>()
const isActive = (page: number) => page === props.modelValue;


const pagination = computed(() => {
  const { pages, modelValue, rangeSize } = props;

  const res: (number | null)[] = [];
  const minPaginationElems = 5 + rangeSize * 2;

  let rangeStart = pages <= minPaginationElems ? 1 : modelValue - rangeSize;
  let rangeEnd = pages <= minPaginationElems ? pages : modelValue + rangeSize;

  rangeEnd = Math.min(rangeEnd, pages);
  rangeStart = Math.max(rangeStart, 1);

  if (pages > minPaginationElems) {
    const isStartBoundaryReached = rangeStart - 1 < 3;
    const isEndBoundaryReached = pages - rangeEnd < 3;

    if (isStartBoundaryReached) {
      rangeEnd = minPaginationElems - 2;
      for (let i = 1; i < rangeStart; i++) {
        res.push(i);
      }
    } else {
      res.push(1, null);
    }

    if (isEndBoundaryReached) {
      rangeStart = pages - (minPaginationElems - 3);
      for (let i = rangeStart; i <= pages; i++) {
        res.push(i);
      }
    } else {
      for (let i = rangeStart; i <= rangeEnd; i++) {
        res.push(i);
      }
      res.push(null, pages);
    }
  } else {
    for (let i = rangeStart; i <= rangeEnd; i++) {
      res.push(i);
    }
  }

  return res;
});

const isPrevControlsActive = computed(() => props.modelValue > 1);
const isNextControlsActive = computed(() => props.modelValue < props.pages);


function updatePageHandler(params: number) {
  emit("update:modelValue", params);
}


function goToPrev() {
  if (isPrevControlsActive.value) 
    emit("update:modelValue", props.modelValue - 1);
}


function goToNext() {
  if (isNextControlsActive.value) 
    emit("update:modelValue", props.modelValue + 1);
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;

  &-previous {
    display: flex;
    align-items: center;
    margin-right: 4px;

    button {
      background-color: hsl(0, 0%, 100%);
      border-color: hsl(0, 0%, 86%);
      border-width: 1px;
      color: hsl(0, 0%, 21%);
      cursor: pointer;
      justify-content: center;
      padding-bottom: calc(0.5em - 1px);
      padding-left: 1em;
      padding-right: 1em;
      padding-top: calc(0.5em - 1px);
      text-align: center;
      white-space: nowrap;
    }
  }

  &-pages {
    display: flex;
    .page {
      background-color: #ebe9e9;
      border: 1px solid hsl(0, 0%, 86%);
      color: #3f4244;
      min-width: 2rem;
      transition: box-shadow 0.2s;
      border-radius: 4px;
      transition: .17s;

      &:hover {
        filter: brightness(0.9);
      }

      &-active {
        background-color: var(--link) !important;
        color: #fff;
      }
    }
  }

  &-next {
    display: flex;
    align-items: center;
    margin-right: 4px;
  }
}

.control-items-active {
  fill: #000;
  transition: fill 0.2s ease-in-out;

  &:hover {
    fill: #000;
    transition: fill 0.2s ease-in-out;
  }
}

.page {
  background-color: #ebe9e9;
  border: 1px solid hsl(0, 0%, 86%);
  color: #3f4244;
  min-width: 2rem;
  transition: box-shadow 0.2s;
  border-radius: 4px;
  transition: .17s;

  &:hover {
    filter: brightness(0.9);
  }

  &-active {
    background-color: var(--link) !important;
    color: #fff;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
