<template>
  <div class="alert">
    <TransitionGroup name="alert">
      <div v-for="alert, key in alertStore.alerts" :key="key" class="alert-container" @click="alertStore.remove(alert)">
        <div :class="alert.type" class="alert-container-bar"></div>
        <div class="alert-container-content">
          <span class="alert-container-content-title">{{ alert.title }}</span>
          <span class="alert-container-content-text" v-html="alert.content"></span>
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

.alert {
  width: 100%;

  &-container {
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

      &-title {
        display: block;
        font-weight: 700
      }

      &-text {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}


.info {
  background-color: #209cee;
}

.danger {
  background-color: #f14668;
}

.success {
  background-color: #4ce691;
}

.warning {
  background-color: #ffe08a;
}
</style>