<template>
  <form ref="uploadForm" @submit="(e) => submitData(e)">
    <input type="file" ref="uploadInput" multiple @change="uploadFiles" />
    <input type="submit" value="Upload" />
  </form>
  <button @click="() => console.log('Done')">Alert</button>
  <div class="preloaders">
    <div v-for="item in uploadedFiles" :key="item.name" class="progress-bar">
      <span class="progress-name">{{ item.fileName }}</span>
      <div ref="progress" id="progress" :style="{ width: `${item.progress}%` }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const uploadForm = ref(null)
const uploadInput = ref<HTMLInputElement | null>(null)
const uploadedFiles = ref([])

const submitData = (e: SubmitEvent) => {
  console.log('event', e)
  e.preventDefault()

  const fileupload = uploadInput.value as HTMLInputElement
  const files = fileupload.files as FileList

  if (fileupload) {
    const file = files[0]
    const formData = new FormData()
    formData.append('file', file)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/upload', true)
    xhr.upload.onprogress = (e) => {
      console.log('progress', e)
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100
        progressBar.value = percentComplete
      }
    }
    xhr.send(formData)
  }
}

const uploadFiles = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files)

  files.forEach((file) => {
    uploadedFiles.value.push({ fileName: file.name, file, progress: 0 })
  })

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        onUploadProgress: (progressEvent) => {
          uploadedFiles.value[i].progress = progressEvent.progress * 100
        }
      })

      console.log('Upload completed:', response.data)
    } catch (error) {
      console.error('Error uploading files:', error)
    }
  }
}
</script>

<style scoped>
.preloaders {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 0;
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 20px;
  background-color: #ddd;
}

.progress-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
}

#progress {
  height: 100%;
  background-color: #4caf50;
  transition: 0.1s ease;
}

#preloader {
  /* animation properties */
  animation-name: my-animation;
  animation-duration: 2s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  /* other properties */
  width: 300px;
  height: 100px;
  border-radius: 10px;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

@keyframes my-animation {
  from {
    background-color: #ff7a59;
    width: 300px;
    top: 10px;
  }
  to {
    background-color: #33475b;
    width: 50px;
    top: 100px;
  }
}
</style>
