<template>
  <div :class="[variantClass, 'input']">
    <label class="input__label">{{ label }}</label>
    <div class="input-wrapper">
      <span class="input-wrapper__icon">
        <slot></slot>
      </span>
      <input :modelValue="modelValue" @input="handleInput" class="input__value" :type="type" :placeholder="placeholder" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type HTMLInputType =
  | 'text'
  | 'password'
  | 'number'
  | 'email'
  | 'url'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'color'
  | 'checkbox'
  | 'radio'
  | 'file'
  | 'hidden'
  | 'image'
  | 'range'
  | 'search'
  | 'tel'

type InputVariant = 'contained' | 'outlined'

interface BaseInputProps {
  name?: string
  modelValue?: string | number | boolean | Date
  type?: HTMLInputType
  placeholder?: string
  label?: string
  variant?: InputVariant
}

const props = withDefaults(defineProps<BaseInputProps>(), {
  name: '',
  modelValue: '',
  type: 'text',
  placeholder: '',
  label: '',
  variant: 'contained',
})

const emits = defineEmits<(e: 'update:modelValue', value: string) => void>();

const variantClass = computed(() => `input_${props.variant}`);

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emits('update:modelValue', target.value);
  };
</script>

<style scoped>

    * {
      box-sizing: border-box;
    }
    
    .input {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;      
      font-family: 'Open Sans', sans-serif;
      min-width: 200px;
      max-width: 250px;
    }

    .input__value {
      background: transparent;
      font-size: 14px;
      padding-left: 8px;
      line-height: 20px;
      border: none;
      width: 100%;
    }

    .input__value:focus-within {
      outline: none;
    }

    .input_contained {
      .input-wrapper{
        background-color: #E4E4E4;
      }
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      background: transparent;
      color: #444444;
      border: 1px solid #E4E4E4;
      border-radius: 10px;
      padding: 12px;
      height: 46px;
      width: 100%;
    }

    .input-wrapper__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      :deep(i) {
        width: 100%;
        height: 100%;
        display: block;
        color: inherit;
      }

      :deep(path) {
        color: #e4e4e4;
      }
    }

</style>
