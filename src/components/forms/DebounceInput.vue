<template>
  <div class="debounce">
    <input 
      class="debounce-input" 
      type="text" 
      :placeholder="props.placeholder"
      @input="handleInput" 
    />

    <span class="icon-left">
      <Icon icon="magnifying-glass" />
    </span>

    <span v-if="props.hasDetailsIcon" class="icon-right details-icon">
      <Icon icon="ellipsis-v" />

      <Transition name="fade">
        <div 
          class="details-box"
          :class="[props.detailsPosition === 'right' ? 'details-right' : 'details-bottom']"
        >
          <span>{{ props.detailsLabel }}</span>
          <span class="triangle"></span>
          <ul>
            <li v-for="detail, key in props.detailsData" :key="key">
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
.debounce {
  box-sizing: border-box;
  clear: both;
  position: relative;

  &-input {
    background-color: hsl(0, 0%, 100%);
    color: #7d7d7d;
    max-width: 100%;
    width: 100%;
    align-items: center;
    border: 1px solid hsl(0, 0%, 86%);
    border-radius: 4px;
    box-shadow: none;
    font-size: 1rem;
    height: 2.5em;
    display: inline-flex;
    justify-content: flex-start;
    line-height: 1.5;
    position: relative;
    vertical-align: top;
    outline: none;
    padding: 8px 25px 8px 40px;
  }

  .icon-left {
    position: absolute;
    top:0; 
    left:0;
    border: none;
    height: 2.5rem;
    display: flex;
    align-items: center;
    padding-left: 10px;

    svg {
      color: #b5b5b5;
    }
  }

  .icon-right {
    position: absolute;
    top:0; 
    right:0;
    border: none;
    cursor: pointer;
    height: 2.5rem;
    display: flex;
    align-items: center;
    padding-right: 12px;

    svg {
      color: #b5b5b5;
      transition: .15s;
    }
  }

  .details-icon {
    &:hover svg {
      color: grey !important;
    }

    &:hover .details-box {
      display: block;
    }

    .details-box {
      display: none;
      position: absolute;
      border-radius: 6px;
      box-shadow: -1px 6px 18px rgb(0 0 0 / 14%);
      width: 300px;
      text-align: left;
      padding: 1.5rem;
      background-color: #fff;
      color: #7a7a7a;
      z-index: 500;
      font-size: 12px;
      
      &.details-right {
        left: 40px;
      }

      &.details-bottom {
        top: 35px;
      }

      ul {
        margin-top: 4px;
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
    }
  }

}
</style>
    