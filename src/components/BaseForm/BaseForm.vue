<template>
  <form class="form">
    <div class="form-field">
      <label class="form-field__label">Name</label>
      <input class="form-field__input" type="text" placeholder="Name" />
    </div>
    <div class="form-field">
      <label class="form-field__label">Password</label>
      <input class="form-field__input" type="text" placeholder="Password" />
    </div>
    <input type="submit" value="Submit" />
  </form>
</template>

<script setup lang="ts"></script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
</style>
