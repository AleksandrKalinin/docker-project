import { computed } from 'vue'
export default function useRetinaDisplay() {
  const multiplier = computed(() => {
    const val = navigator.userAgent.indexOf('Macintosh') !== -1;
      
    if (val) {
      return 2
    } else return 1
  })

  return { multiplier }
}
