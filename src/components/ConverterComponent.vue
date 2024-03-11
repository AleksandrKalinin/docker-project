<!-- <template>
  <div class="main">
    <div class="controls">
      <div class="controls__block">
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
      <div class="controls__block">
        <p>
          Offset left in pixels
          {{ offsetXInPx }}
        </p>
        <p>
          Offset top in pixels
          {{ offsetYInPx }}
        </p>
        <p>
          Offset left in centimeters
          {{ offsetXInCm }}
        </p>
        <p>
          Offset top in centimeters
          {{ offsetYInCm }}
        </p>
        <p>
          Offset left in inches
          {{ offsetXInInches }}
        </p>
        <p>
          Offset top in inches
          {{ offsetYInInches }}
        </p>
      </div>
    </div>
    <div class="content">
      <div class="content__wrapper">
        <div
          class="element"
          ref="targetElement"
          draggable
          @mousedown="startDragging"
          @mousemove="dragging"
          @mouseup="stopDragging"
          :style="[
            { width: width === 0 ? '400px' : `${width}px` },
            { height: height === 0 ? '400px' : `${height}px` },
            { left: offsetXInPx === 0 ? '0' : `${offsetXInPx}px` },
            { top: offsetYInPx === 0 ? '0' : `${offsetYInPx}px` }
          ]"
        >
        <div class="element__wrap">
          <span class="element__resize"></span>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDevicePixelRatio } from '@vueuse/core'
import { useElementSize } from '@vueuse/core'

const targetElement = ref<HTMLElement | null>(null)

const { width, height } = useElementSize(targetElement)
const { pixelRatio } = useDevicePixelRatio()

const multiplier = computed(() => {
  const val =
    (window.matchMedia &&
      (window.matchMedia(
        'only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)'
      ).matches ||
        window.matchMedia(
          'only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)'
        ).matches)) ||
    (window.devicePixelRatio && window.devicePixelRatio > 1.3)
  if (val) {
    return 2
  } else return 1
})

const effectivePPI = computed(() => 96 * pixelRatio.value)
// effectionPPI calculation if element width/height should preserve inital value

// const effectivePPI = computed(() => (96 / (pixelRatio.value * 100)) * 100 * multiplier.value)
// effectionPPI calculation if element width/height should scale when user zooming in/changing display scale

const widthInCm = computed(() => {
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

const isDragging = ref(false)

const offsetX = ref(0)
const offsetY = ref(0)

const offsetXInPx = ref(40)
const offsetYInPx = ref(40)

const offsetXInCm = computed(() => {
  return ((offsetXInPx.value / effectivePPI.value) * multiplier.value * 2.54).toFixed(2)
})

const offsetYInCm = computed(() => {
  return ((offsetYInPx.value / effectivePPI.value) * multiplier.value * 2.54).toFixed(2)
})

const offsetXInInches = computed(() => {
  return ((offsetXInPx.value / effectivePPI.value) * multiplier.value).toFixed(2)
})

const offsetYInInches = computed(() => {
  return ((offsetYInPx.value / effectivePPI.value) * multiplier.value).toFixed(2)
})

const startDragging = (event: MouseEvent) => {
  event.preventDefault()
  if (targetElement.value) {
    offsetX.value = event.clientX - targetElement.value.offsetLeft
    offsetY.value = event.clientY - targetElement.value.offsetTop
  }

  isDragging.value = true
}
const dragging = (event: MouseEvent) => {
  if (isDragging.value) {
    offsetXInPx.value = event.clientX - offsetX.value
    offsetYInPx.value = event.clientY - offsetY.value
  }
}
const stopDragging = () => {
  isDragging.value = false
}
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
  gap: 24px;
  margin-right: 30px;

  .controls__block {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}

.content {
  width: calc(100% - 300px);
  height: 100%;
  border: 1px solid #e1e1e1;
  overflow-x: auto;
  overflow-y: auto;

  &__wrapper {
    width: auto;
    height: auto;
    position: relative;
  }
}

.element {
  overflow: auto;
  background: cornflowerblue;
  position: absolute;

  &__wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  &__resize {
    display: none;
    position: absolute;
    bottom: 0;
    right: 0;
    background: red;
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }

  &:hover {
      .element__resize {
        display: block;
      }
    }
}
</style> -->

<template>
  <div class="main">
    <div class="controls">
      <div class="controls__block">
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
      <div class="controls__block">
        <p>
          Offset left in pixels
          {{ offsetXInPx }}
        </p>
        <p>
          Offset top in pixels
          {{ offsetYInPx }}
        </p>
        <p>
          Offset left in centimeters
          {{ offsetXInCm }}
        </p>
        <p>
          Offset top in centimeters
          {{ offsetYInCm }}
        </p>
        <p>
          Offset left in inches
          {{ offsetXInInches }}
        </p>
        <p>
          Offset top in inches
          {{ offsetYInInches }}
        </p>
      </div>
    </div>
    <div class="content">
      <div class="content__wrapper">
        <div
          class="element"
          ref="targetElement"
          draggable
          @mousedown="startDragging"
          @mousemove="dragging"
          @mouseup="stopDragging"
          :style="[
            { width: width === 0 ? '400px' : `${width}px` },
            { height: height === 0 ? '400px' : `${height}px` },
            { left: offsetXInPx === 0 ? '0' : `${offsetXInPx}px` },
            { top: offsetYInPx === 0 ? '0' : `${offsetYInPx}px` }
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useDevicePixelRatio } from '@vueuse/core'
import { useElementSize } from '@vueuse/core'
import useRetinaDisplay from './composables/useRetinaDisplay'

const targetElement = ref<HTMLElement | null>(null)

const { width, height } = useElementSize(targetElement)
const { pixelRatio } = useDevicePixelRatio()
const { multiplier } = useRetinaDisplay()

const calcScreenPPI = computed(() => {
  const el = document.createElement('div')
  el.style.width = '1in'
  document.body.appendChild(el)
  const dpi = el.offsetWidth * pixelRatio.value
  el.remove()
  return dpi
})

const displayProperties = computed(() => {
  const screenDPI = calcScreenPPI.value
  console.log("window screen width", window.screen.width)
  // const screenWidth = window.screen.width / pixelRatio.value * multiplier.value // Horizontal resolution in pixels
  // const screenHeight = window.screen.height / pixelRatio.value * multiplier.value // Vertical resolution in pixels

  const screenWidth = window.screen.width * multiplier.value
  const screenHeight = window.screen.height * multiplier.value
  const diagonalInPixels = Math.sqrt(Math.pow(screenWidth, 2) + Math.pow(screenHeight, 2)) // Diagonal resolution in pixels
  const diagonalInInches = diagonalInPixels / screenDPI // Assuming standard PPI of 96

  return {
    horizontalResolution: screenWidth,
    verticalResolution: screenHeight,
    diagonalInInches: diagonalInInches
  }  
})

// 2,286,144
// 964,324
// 3,250,468
// 1802.9054329054533080967927071109

// 3,686,400
// 1,166,400
// 4,852,800

// 1507984
// 477,481
// 1985465
// 11.75

// 2,359,296
// 746,496
// 3105792
// 1,762.3257360658386526552050737959

// const calcDevicePPI = computed(() => {
//   const { horizontalResolution, verticalResolution, diagonalInInches } = displayProperties.value
//   const diagonal = Number(diagonalInInches.toFixed(2))
//   const ppi = Math.sqrt(Math.pow(horizontalResolution, 2) + Math.pow(verticalResolution, 2)) / diagonal 
//   console.log("computed ppi - calc device ppi", ppi)
//   return ppi  
// })

const effectivePPI = computed(() => calcScreenPPI.value)

// effectionPPI calculation if element width/height should scale when user zooming in/changing display scale

// const effectivePPI = computed(() => (calcScreenPPI.value / (pixelRatio.value * 100)) * 100)
// effectionPPI calculation if element width/height should preserve inital value even if it change it's size visually

const widthInCm = computed(() => {
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

const isDragging = ref(false)

const offsetX = ref(0)
const offsetY = ref(0)

const offsetXInPx = ref(40)
const offsetYInPx = ref(40)

const offsetXInCm = computed(() => {
  return ((offsetXInPx.value / effectivePPI.value) * multiplier.value * 2.54).toFixed(2)
})

const offsetYInCm = computed(() => {
  return ((offsetYInPx.value / effectivePPI.value) * multiplier.value * 2.54).toFixed(2)
})

const offsetXInInches = computed(() => {
  return ((offsetXInPx.value / effectivePPI.value) * multiplier.value).toFixed(2)
})

const offsetYInInches = computed(() => {
  return ((offsetYInPx.value / effectivePPI.value) * multiplier.value).toFixed(2)
})

const startDragging = (event: MouseEvent) => {
  event.preventDefault()
  if (targetElement.value) {
    offsetX.value = event.clientX - targetElement.value.offsetLeft
    offsetY.value = event.clientY - targetElement.value.offsetTop
  }

  isDragging.value = true
}

const dragging = (event: MouseEvent) => {
  if (isDragging.value) {
    offsetXInPx.value = event.clientX - offsetX.value
    offsetYInPx.value = event.clientY - offsetY.value
  }
}

const stopDragging = () => {
  isDragging.value = false
}

watchEffect(() => {
  console.log("multiplicator", multiplier.value)
  console.log("screen DPI", calcScreenPPI.value)
  console.log('Horizontal Resolution:', displayProperties.value.horizontalResolution)
  console.log('Vertical Resolution:', displayProperties.value.verticalResolution)
  console.log('Diagonal Size (in inches):', Number(displayProperties.value.diagonalInInches.toFixed(2)))
  console.log('effective PPI', effectivePPI.value)
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
  gap: 24px;
  margin-right: 30px;

  &__block {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}

.content {
  width: calc(100% - 300px);
  height: 100%;
  border: 1px solid #e1e1e1;
  overflow-x: auto;
  overflow-y: auto;

  &__wrapper {
    width: auto;
    height: auto;
    position: relative;
  }
}

.element {
  overflow: auto;
  background: cornflowerblue;
  position: absolute;
}
</style>
