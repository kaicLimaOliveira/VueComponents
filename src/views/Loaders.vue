<template>
  <div class="is-flex is-flex-direction-column">
    <Messages title="Loader" content="Loader" />

    <WheelLoader></WheelLoader>
    <GoogleLoader></GoogleLoader>
  </div>
</template>

<script setup lang="ts">
import Messages from '../components/Messages.vue';
import GoogleLoader from '../components/loaders/GoogleLoader.vue';
import WheelLoader from '../components/loaders/WheelLoader.vue';


</script>