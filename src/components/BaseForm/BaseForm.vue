<template>
  <form class="form">
    <BaseInput v-model="formData.name" variant="contained" placeholder="Name" type="text" label="Enter your name" name="nameInput" />
    <BaseInput v-model="formData.password" variant="contained" placeholder="Password" type="password" label="Your password" name="passInput" />
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import BaseInput from '../BaseInput/BaseInput.vue';

const formData = reactive({
  name: "",
  password: ""
})
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
