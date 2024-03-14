<template>
  <div v-if="props.isLoading">
    <div class="p-4 is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
      <div class="anim-circle anim"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';


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


watch(
  () => props.isLoading,
  (newValue) => {
    if (newValue) {
      if (props.timeout != undefined) {
        setTimeout(() => emit("timeoutEnded", false), props.timeout * 100);
      }
    }
  }
)
</script>

<style scoped>
.anim-circle {
  border-radius: 50%;
  border: 4px solid transparent;
}

.anim {
  height: 100px;
  width: 100px;
  border-top-color: rgb(73, 73, 73) !important;
  border-top: 3px solid;
  animation: anim1 .8s infinite cubic-bezier(0.77, .35, 0.3, .6);
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