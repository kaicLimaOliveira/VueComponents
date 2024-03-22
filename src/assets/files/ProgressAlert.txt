<template>
  <div class="w-100">
    <TransitionGroup name="alert">
      <div v-for="alert, key in alertStore.alerts" :key="key" class="alert w-100 is-flex is-clickable mb-3"
        @click="alertStore.remove(alert)">
        <div class="is-flex-grow-1" :class="alert.type">
          <div class="columns p-2">
            <div class="column is-2 mt-3">
              <Icon :icon="alert.icon" class="fa-2x has-text-white"></Icon>
            </div>

            <div class="column mt-1">
              <span class="has-text-weight-bold has-text-white is-block">{{ alert.title }}</span>
              <span class="has-text-white fs-14 has-text-weight-medium" v-html="alert.content"></span>
            </div>

            <div class="column is-1 mr-2" @click="alertStore.remove(alert)">
              <Icon icon="xmark" class="close-x has-text-white"></Icon>
            </div>
          </div>
          <progress class="progress is-small is-gradient" max="100"></progress>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useAlertStore } from "../../stores/alertStore";

const alertStore = useAlertStore()
</script>

<style lang="scss" scoped>
.alert-enter-active,
.alert-leave-active {
  transition: all 0.35s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.alert-container {
  top: 0;
  z-index: 1001;
  pointer-events: none;
}

.progress.is-gradient {
  opacity: .75;
  border-radius: 0px;
}

.progress:indeterminate {
  background-image: linear-gradient(to right, rgb(255, 255, 255) 30%, rgb(241, 241, 241) 60%);
}

.alert {
  min-height: 100px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.144);
  max-width: 350px;
  pointer-events: all;

  &-bar {
    min-width: 12px;
  }

  .close-x:hover {
    filter: brightness(0.9);
  }
}
</style>