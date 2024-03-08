import { computed } from 'vue'
export default function useRetinaDisplay() {
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

  return { multiplier }
}
