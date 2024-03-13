<template>
  <div class="modal-loader is-flex is-justify-content-center is-align-items-center">
    <div class="anim-container">

      <div class="is-flex mb-6">
        <div class="modal-loader-anim medium-item is-flex-grow-1"></div>
        <div class="is-flex-grow-1"></div>
        <div class="is-flex-grow-1"></div>
      </div>
      
      <div
        v-for="i, key in Math.floor(docHeight / 82)"
        :key="key"
      >
        <div v-if="i > 1" class="mb-5">
          <div class="is-flex">
            <div class="modal-loader-anim small-item is-flex-grow-1 mb-1"></div>
            <div class="is-flex-grow-5 mb-1"></div>
          </div>
          <div class="is-flex">
            <div class="modal-loader-anim big-item is-flex-grow-2 mb-1"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const docHeight = ref(0)

onMounted(() => {
  docHeight.value = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
})
</script>

<style scoped>
.modal-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: white;
  z-index: 1001;
}

.anim-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
}

.modal-loader-anim {
  background-color: rgba(128, 128, 128, 0.199);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.big-item {
  height: 35px;
}

.small-item {
  height: 15px;
}

.medium-item {
  height: 25px;
}

.modal-loader-anim::after {
  content: '';
  background-color: rgba(255, 255, 255, 0.226);
  width: 100px;
  height: 350px;
  position: absolute;
  filter: blur(25px);
  top: 50%;
  left: -10%;
  transform: translateY(-50%) rotate(45deg);
  animation: modal-loader-anim .8s infinite ease-in-out;
}

@keyframes modal-loader-anim {
  0% {
    left: -150%;
  }

  100% {
    left: 150%;
  }
}
</style>