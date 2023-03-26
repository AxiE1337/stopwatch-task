<script setup lang="ts">
import StopWatch from './components/StopWatch.vue'
import { stopwatchesState } from './store'

const handleAdd = () => {
  stopwatchesState.push({ id: Date.now(), interval: 0, seconds: 0 })
}
</script>

<template>
  <div class="app">
    <div v-for="stopwatch in stopwatchesState">
      <StopWatch :stopwatch="stopwatch" />
    </div>
    <div class="stopwatch-add">
      <button @click="handleAdd">
        <img src="./assets/add-btn.svg" alt="add-btn" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  gap: 2rem;
  margin: 5rem 0;
}
.stopwatch-add {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 225px;
  height: 120px;
  background: #696969;
}
.stopwatch-add > button {
  background: none;
  border: none;
}
@media (max-width: 768px) {
  .app {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 485px) {
  .app {
    grid-template-columns: 1fr;
  }
}
</style>
