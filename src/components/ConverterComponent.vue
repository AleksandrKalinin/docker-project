<template>
  <div class="main">
    <div class="controls">
      <input type="text" v-model="valueInPixels"  />
      <input type="text" v-model="valueInCm" />
      <input type="text" v-model="valueInInches" />
    </div>
    <div class="area">

      <div class="pdf" ref="pdf">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import { useDevicePixelRatio } from '@vueuse/core'
  import { useElementSize } from '@vueuse/core'

  const PPI = computed(() => 
    pixelRatio.value * 96
  )

  const pdf = ref(null)

  const { width, height } = useElementSize(pdf)
  const { pixelRatio } = useDevicePixelRatio()

  // watch(width, () => {
  //   console.log(pixelRatio.value)
  // })

  const widthInCm = computed(() => {
    return width.value / PPI.value * 2.54
  })

  const heightInCm = computed(() => {
    return height.value / PPI.value * 2.54
  })

  watch(width, () => {
    console.log("width",  widthInCm.value)
  })

  watch(height, () => {
    console.log("height",  heightInCm.value)
  })


  const valueInPixels = ref(0)
  const valueInCm = ref(0)
  const valueInInches = ref(0)


</script>

<style scoped>
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

  .area {
    width: calc(100% - 300px);
    height: 100%;
    border: 1px solid #E1E1E1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pdf {
    width: 400px;
    height: 400px;
    resize: both;
    overflow: auto;
    background: cornflowerblue;
  }
</style>