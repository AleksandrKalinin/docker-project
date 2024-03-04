<script setup lang="ts">
import {ref} from 'vue'
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import IconChevron from '@/components/icons/IconChevron.vue';
import BaseForm from '@/components/BaseForm/BaseForm.vue';
const value = ref('')
</script>

<template>
  <div class="page">
    <!-- <BaseInput v-model="value" variant="contained" placeholder="Name" type="text" label="Enter your name" name="nameInput">
      <IconSearch />
    </BaseInput>

    <BaseInput v-model="value" variant="contained" placeholder="Name" type="text" label="Enter your name" name="nameInput">
      <IconChevron />
    </BaseInput> -->

    <BaseForm />
  </div>
</template>

<style scoped>

</style>
