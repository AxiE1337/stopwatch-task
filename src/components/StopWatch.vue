<script setup lang="ts">
import calculateTime from '../utils/calculateTime'
import type { IStopwatch } from '../types'
import { stopwatchesState } from '../store'
import { ref } from 'vue'

defineProps<{ stopwatch: IStopwatch }>()

const isPlaying = ref<boolean>(false)

let elapsed = 0
let start = 0

const handlePlay = (id: number) => {
  const index = stopwatchesState.findIndex((i) => i.id == id)
  if (stopwatchesState[index].interval) return
  isPlaying.value = true
  start = Date.now() - elapsed
  stopwatchesState[index].interval = setInterval(() => {
    elapsed = Date.now() - start
    stopwatchesState[index].seconds = Math.floor(elapsed / 1000)
  }, 500)
}
const handleStop = (id: number) => {
  const index = stopwatchesState.findIndex((i) => i.id == id)
  if (typeof stopwatchesState[index].interval === 'number') {
    clearInterval(stopwatchesState[index].interval)
    stopwatchesState[index].interval = 0
    isPlaying.value = false
    elapsed = Date.now() - start
  }
}
const handleReset = (id: number) => {
  const index = stopwatchesState.findIndex((i) => i.id == id)
  clearInterval(stopwatchesState[index].interval)
  stopwatchesState[index].interval = 0
  stopwatchesState[index].seconds = 0
  isPlaying.value = false
  elapsed = 0
  start = 0
}
</script>

<template>
  <div class="stopwatch">
    <div
      :class="[
        `stopwatch__seconds ${isPlaying && 'stopwatch__seconds_playing'}`,
      ]"
    >
      <h1>{{ calculateTime(stopwatch.seconds) }}</h1>
    </div>
    <div
      :class="[`stopwatch__line ${isPlaying && 'stopwatch__line_playing'}`]"
    ></div>
    <div :class="[`stopwatch__btns ${isPlaying && 'stopwatch__btns_playing'}`]">
      <button v-if="!isPlaying" @click="handlePlay(stopwatch.id)">
        <img
          :class="isPlaying && 'btn__svg_playing'"
          src="../assets/play-btn.svg"
          alt="play-btn"
        />
      </button>
      <button v-if="isPlaying" @click="handleStop(stopwatch.id)">
        <img
          v-if="!isPlaying"
          class="btn__svg"
          src="../assets/stop-btn.svg"
          alt="stop-btn"
        />
        <img
          v-if="isPlaying"
          class="btn__svg_playing"
          src="../assets/stop-btn-w.svg"
          alt="stop-btn"
        />
      </button>
      <button @click="handleReset(stopwatch.id)">
        <img
          v-if="!isPlaying"
          class="btn__svg"
          src="../assets/reset-btn.svg"
          alt="reset-btn"
        />
        <img
          v-if="isPlaying"
          class="btn__svg"
          src="../assets/reset-btn-w.svg"
          alt="reset-btn"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.stopwatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 225px;
  height: 120px;
  background: #696969;
}
.stopwatch__seconds {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.stopwatch__seconds > h1 {
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 21px;
  text-align: center;
  color: #9e9e9e;
}
.stopwatch__seconds_playing > h1 {
  color: #ffffff;
}
.stopwatch__line {
  display: fixed;
  top: 50%;
  height: 1px;
  width: 100%;
  background-color: #9e9e9e;
}
.stopwatch__line_playing {
  background-color: white;
}
.stopwatch__btns {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1rem;
}
.stopwatch__btns > button {
  background: none;
  color: #ffffff;
  border: none;
}
</style>
