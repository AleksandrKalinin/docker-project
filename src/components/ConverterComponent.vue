<template>
  <div class="main">
    <div class="controls">
      <label class="label">
        Width in pixels
        <input type="number" v-model.number="width" />
      </label>
      <label class="label">
        Height in pixels
        <input type="number" v-model.number="height" />
      </label>
      <p>
        Width in centimeters
        {{ widthInCm }}
      </p>
      <p>
        Height in centimeters
        {{ heightInCm }}
      </p>
      <p>
        Width in inches
        {{ widthInInches }}
      </p>
      <p>
        Height in inches
        {{ heightInInches }}
      </p>
    </div>
    <div class="content">
      <div class="content__wrapper">
        <div
          class="element"
          ref="targetElement"
          draggable
          :style="[
            { width: width === 0 ? '400px' : `${width}px` },
            { height: height === 0 ? '400px' : `${height}px` }
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDevicePixelRatio } from '@vueuse/core'
import { useElementSize } from '@vueuse/core'

const targetElement = ref(null)

const { width, height } = useElementSize(targetElement)
const { pixelRatio } = useDevicePixelRatio()

const multiplier = computed(() => {
  const val = (window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3)
  console.log(val);  
  if (val) {
    return 2
  } else return 1
})

const effectivePPI = computed(() => (96 * pixelRatio.value));
// effectionPPI calculation if element width/height should preserve inital value

// const effectivePPI = computed(() => (96 / (pixelRatio.value * 100)) * 100 * multiplier.value)
// effectionPPI calculation if element width/height should scale when user zooming in/changing display scale

const widthInCm = computed(() => {
  console.log("pixelRatio.value", pixelRatio.value)
  console.log("multiplier", multiplier.value)
  console.log("actual width", ((width.value / effectivePPI.value) * multiplier.value * 2.54).toFixed(2))
  return ((width.value / effectivePPI.value) * multiplier.value * 2.54).toFixed(2)
})

const heightInCm = computed(() => {
  return ((height.value / effectivePPI.value) * multiplier.value * 2.54).toFixed(2)
})

const widthInInches = computed(() => {
  return ((width.value / effectivePPI.value) * multiplier.value).toFixed(2)
})

const heightInInches = computed(() => {
  return ((height.value / effectivePPI.value) * multiplier.value).toFixed(2)
})

</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100vh;
  display: flex;
}

.controls {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-right: 30px;
}

.content {
  width: calc(100% - 300px);
  height: 100%;
  border: 1px solid #e1e1e1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  overflow-y: auto;

  &__wrapper {
    width: auto;
    height: auto;
  }
}

.element {
  resize: both;
  overflow: auto;
  background: cornflowerblue;
}
</style>
