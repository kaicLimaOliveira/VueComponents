<template>
  <div v-if="props.isLoading">
    <div class="anim">
      <div class="anim-circle anim"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const emit = defineEmits<{
  timeoutEnded: [value: boolean]
}>()

interface Props {
  isLoading: boolean;
  timeout?: number;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})


onMounted(() => {
  if (props.timeout != undefined) {
    setTimeout(() => emit("timeoutEnded", false), props.timeout * 1000);
  }
})
</script>

<style scoped lang="scss">
.anim {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  &-circle {
    border-radius: 50%;
    border: 4px solid transparent;
    height: 100px;
    width: 100px;
    border-top-color: rgb(73, 73, 73) !important;
    border-top: 3px solid;
    animation: anim1 .8s infinite cubic-bezier(0.77, .35, 0.3, .6);
  }
}

@keyframes anim1 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>