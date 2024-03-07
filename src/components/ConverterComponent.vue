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
import { computed, ref} from 'vue'
import { useDevicePixelRatio } from '@vueuse/core'
import { useElementSize } from '@vueuse/core'

const PPI = computed(() => (96 / (pixelRatio.value * 100)) * 100)

const targetElement = ref(null)

const { width, height } = useElementSize(targetElement)
const { pixelRatio } = useDevicePixelRatio()

const widthInCm = computed(() => {
  console.log('PPI value', PPI.value)
  return ((width.value / PPI.value) * 2.54).toFixed(2)
})

const heightInCm = computed(() => {
  return ((height.value / PPI.value) * 2.54).toFixed(2)
})

const widthInInches = computed(() => {
  return (width.value / PPI.value).toFixed(2)
})

const heightInInches = computed(() => {
  return (height.value / PPI.value).toFixed(2)
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
