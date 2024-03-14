<template>
  <article class="message" :class="props.className">
    <div v-if="props.messageHeader" class="message-header">
      <p>{{ props.title }}</p>
      <button v-if="props.closedOption" class="delete" aria-label="delete"></button>
    </div>

    <div v-html="props.content" class="message-body">
    </div>
  </article>
</template>

<script setup lang="ts">

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