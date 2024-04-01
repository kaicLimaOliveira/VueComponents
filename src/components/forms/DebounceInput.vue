<template>
  <div class="control has-icons-left" :class="{ 'has-icons-right': hasDetailsIcon }">
    <input 
      class="input" 
      :class="{ 'has-icons-right': props.hasDetailsIcon }" 
      type="text" 
      :placeholder="props.placeholder"
      @input="handleInput" 
    />

    <span class="icon is-left">
      <Icon icon="magnifying-glass" class="has-text-grey-light"></Icon>
    </span>

    <span v-if="props.hasDetailsIcon" class="icon is-right is-clickable details-icon">
      <Icon icon="ellipsis-v" class="has-text-grey-light ts-15"></Icon>

      <Transition name="fade">
        <div 
          class="details-box has-text-left has-text-grey fs-13 p-5 has-background-white z-500"
          :class="[props.detailsPosition === 'right' ? 'details-right' : 'details-bottom']"
        >
          <span>{{ props.detailsLabel }}</span>
          <span class="triangle"></span>
          <ul class="mt-1">
            <li v-for="detail, key in props.detailsData" :key="key" class="ml-5">
              {{ detail }}
            </li>
          </ul>
        </div>
      </Transition>
    </span>
  </div>
</template>
    
<script setup lang="ts">
import { debounce } from '../../composables/Debounce';


const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void,
}>()

interface Props {
  placeholder?: string;
  delay?: number;
  hasDetailsIcon?: boolean;
  detailsLabel?: string;
  detailsData?: string[];
  detailsPosition?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Pesquisar...',
  delay: 0.5,
  hasDetailsIcon: false,
  detailsLabel: 'Você pode filtrar os seguintes campos:',
  detailsPosition: 'right',
})


const handleInput = (event: Event) => {
  const inputValue =  (event.target as HTMLInputElement).value
  triggerDebounce(inputValue);
}

const triggerDebounce = debounce((text: string) => emit('update:modelValue', text), props.delay * 1000)
</script>
    
<style lang="scss" scoped>
.details-icon {

  &:hover svg {
    color: grey !important;
  }

  &:hover .details-box {
    display: block;
  }
}

.details-box {
  display: none;
  position: absolute;
  border-radius: 6px;
  box-shadow: -1px 6px 18px rgb(0 0 0 / 14%);
  width: 300px;

  &.details-right {
    left: 50px;
  }

  &.details-bottom {
    top: 35px;
  }

  & li {
    list-style-type: disc;
  }
}

.triangle {
  position: absolute;
  width: 0; 
  height: 0; 
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid rgb(255, 255, 255);
  left: -3%;
  top: 38%;
}
</style>
    