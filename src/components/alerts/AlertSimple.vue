<template>
  <div class="w-100">
    <TransitionGroup name="alert">
      <div v-for="alert in alertStore.alerts" :key="alert.id" class="alert" @click="alertStore.remove(alert)">
        <div :class="alert.type" class="alert-bar"></div>
        <div class="alert-content">
          <span class="has-text-weight-bold has-text-grey-dark is-block">{{ alert.title }}</span>
          <span class="has-text-grey fs-14 has-text-weight-medium" v-html="alert.content"></span>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useAlertStore } from '../../stores/alertStore';

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
  position: fixed;
  top: 0;
  width: 100%;
  min-height: 100vh;
  z-index: 1001;
  padding: 30px;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.alert {
  width: 100%;
  min-height: 100px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  margin-bottom: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.144);
  max-width: 350px;
  pointer-events: all;
  cursor: pointer;

  &-bar {
    min-width: 12px;
  }

  &-content {
    flex-grow: 1;
    background-color: white;
    padding: 5px 8px;
  }
}

</style>