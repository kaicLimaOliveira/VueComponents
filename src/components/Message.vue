<template>
  <Transition name="slide-fade">
    <article v-if="state.openedMessage" class="message ts-3" :class="props.className">
      <div v-if="props.messageHeader" class="message-header">
        <p>{{ props.title }}</p>
        <button 
          v-if="props.closedOption" 
          @click="state.openedMessage = false"
          class="delete" 
          aria-label="delete"
        ></button>
      </div>
  
      <div v-html="props.content" class="message-body content">
      </div>
    </article>
  </Transition>
</template>

<script setup lang="ts">
import { reactive } from 'vue';


interface State {
  openedMessage: boolean;
}

const state: State = reactive({
  openedMessage: true,
})


interface Props {
  title: string;
  content: string;
  className?: string;
  closedOption?: boolean;
  messageHeader?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  closedOption: true,
  messageHeader: true,
})
</script>

<style scoped lang="scss">
.message {
  height: fit-content;
}

.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>