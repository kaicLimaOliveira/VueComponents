<template>
  <article class="message" :class="props.className">
    <div class="message-header">
      <p>{{ props.title }}</p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      {{ props.content }}
    </div>
  </article>
</template>

<script setup lang="ts">

interface Props {
  title: string;
  content: string;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {})
</script>