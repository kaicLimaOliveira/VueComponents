<template>
  <div 
    class="is-relative"
    @mouseenter="state.show = true"
    @mouseleave="state.show = false"
  >
    <slot></slot>
    <Transition name="fade">
      <div 
        v-show="state.show && props.isActive"
        class="popover"
        :class="props.position"
        :style="{
          'width': props.width, 
          transform: `translate(${props.translateX}, ${props.translateY})`,
          fontSize: props.fontSize,
          fontWeight: props.fontWeight,
          color: props.fontColor,
          padding: props.boxPadding
        }"
      >
        <div 
          class="box-edge"
          :class="props.position"
        ></div>
        <span class="is-block mb-1">
          {{ props.title }}
        </span>
        <span>
          {{ props.content }}
        </span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';


interface State {
  show: boolean;
}

interface Props {
  title?: string;
  content: string;
  width?: string;
  position?: string;
  translateX?: string;
  translateY?: string;
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  boxPadding?: string;
  isActive?: boolean;
}

const state: State = reactive({
  show: false,
})

const props = withDefaults(defineProps<Props>(), {
  title: '',
  content: '',
  width: '320px',
  position: 'is-right',
  fontSize: '13px',
  fontWeight: 'normal',
  fontColor: 'grey',
  boxPadding: '8px',
  isActive: true,
})

</script>

<style lang="scss" scoped>
.popover {
  position: absolute;
  font-size: 13px;
  border-radius: 6px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.096);
  background-color: white;
  border: 1px solid rgb(221, 221, 221);
  padding: 8px;
  z-index: 300;

  & .box-edge {
    position: absolute;
    width: 7px;
    height: 7px;
    background-color: rgb(255, 255, 255);
    border-right: 1px solid rgb(221, 221, 221);
    border-top: 1px solid rgb(221, 221, 221);

    &.is-right {
      left: -4px;
      top: 50%;
      transform: translateY(-50%) rotate(225deg);
    }

    &.is-left {
      right: -4px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }

    &.is-top {
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%) rotate(135deg);
    }

    &.is-bottom {
      top: -4px;
      left: 50%;
      transform: translateX(-50%) rotate(-45deg);
    }
  }

  &.is-right {
    top: 50%;
    left: 140%;
    transform: translateY(-50%);
  }

  &.is-left {
    top: 50%;
    right: 140%;
    transform: translateY(-50%);
  }

  &.is-top {
    left: 50%;
    bottom: 140%;
    transform: translateX(-50%);
  }
  
  &.is-bottom {
    left: 50%;
    top: 140%;
    transform: translateX(-50%);
  } 
}
</style>
