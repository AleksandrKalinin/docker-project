<template>
  <div class="fileupload">
    <div class="fileupload__dragarea">
      <div class="dragarea__description">
        <div class="dragarea__text">
          <IconUpload />
          Drag and drop files here or upload
        </div>
        <p class="dragare__filetypes">Accepted files types: PDF</p>
      </div>
      <a class="button button_outlined">Upload</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconUpload from './icons/IconUpload.vue'
</script>

<style scoped>
* {
  font-family: 'Inter', sans-serif;
}

.button {
  padding: 8px 12px;
  font-size: 14px;
  text-decoration: none;
}

.button_outlined {
  border: 1px solid #5d9aee;
  color: #5d9aee;
  background: transparent;
}

.button_filled {
  color: #ffffff;
  background: #5d9aee;
}

.fileupload {
  background: #181818;
  padding: 24px;
}

.dragarea {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e1e1e1;
  padding: 12px;
}
</style>
