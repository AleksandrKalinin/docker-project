<template>
  <div class="fileupload">
    <div class="fileupload__dragarea dragarea">
      <input
        accept="application/pdf"
        type="file"
        ref="uploadInput"
        id="uploadInput"
        multiple
        class="dragarea__input"
        @input="formatFiles"
      />
      <label
        for="uploadInput"
        class="dragarea__label"
        @drop="dropHandler($event)"
        @dragover="dragOverHandler($event)"
      >
        <div class="dragarea__text">
          <IconUpload />
          Drag and drop files here or click to upload
        </div>
        <p class="dragarea__filetypes">Accepted files types: PDF</p>
      </label>
    </div>
    <div class="fileupload__progressarea progressarea">
      <p class="progressarea__title">{{ progressStatus }}</p>
      <div
        :class="['progressarea-scroller', { 'progressarea-scroller_visible': isScrollVisible }]"
        ref="progressScroller"
      >
        <div class="progress" ref="progressContainer">
          <div
            v-for="file in uploadedFiles"
            :key="file.fileName"
            class="progress__item progress-item"
          >
            <IconFIle />
            <div class="progress-item__content">
              <div class="progress-item__info">
                <span class="progress-item__name">{{ file.fileName }}</span>
                <div class="progress-item__status">
                  {{ Math.floor(file.progress) }}%
                  <IconCheckmark v-if="file.progress === 100" class="icon" />
                </div>
              </div>
              <div class="progress-item__bar progress-bar">
                <div class="progress-bar__bg"></div>
                <div
                  class="progress-bar__fill"
                  :style="{ width: `${Math.floor(file.progress)}%` }"
                ></div>
              </div>
            </div>
            <div class="progress-item__cancel">
              <IconCancel class="icon" @click="deleteFile(file.fileName)" title="Delete item" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fileupload__buttons">
      <a class="button button_outlined">Continue</a>
      <a class="button button_filled">Cancel</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconUpload from './icons/IconUpload.vue'
import IconCancel from './icons/IconCancel.vue'
import IconCheckmark from './icons/IconCheckmark.vue'
import IconFIle from './icons/IconFIle.vue'
import { computed, ref } from 'vue'
import axios, { type AxiosProgressEvent } from 'axios'
import { useElementSize } from '@vueuse/core'

interface UploadedFile {
  fileName: string
  progress: number
  file: File
}

const uploadInput = ref<HTMLInputElement | null>(null)
const uploadedFiles = ref<UploadedFile[]>([])

const progressScroller = ref(null)
const progressContainer = ref(null)

const { height: progressScrollerHeight } = useElementSize(progressScroller)
const { height: progressContainerHeight } = useElementSize(progressContainer)

const isScrollVisible = computed(() => {
  if (progressScroller.value) {
    return progressContainerHeight.value > progressScrollerHeight.value
  } else {
    return false
  }
})

const progressStatus = computed(() => {
  if (uploadedFiles.value.length) {
    const uploaded = uploadedFiles.value.filter((file) => file.progress === 100).length
    return `${uploaded} out of ${uploadedFiles.value.length} uploaded`
  } else {
    return "You didn't upload any files yet"
  }
})

const formatFiles = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files as FileList)
  uploadFiles(files)
}

const uploadFiles = async (files: File[]) => {
  files.forEach((file) => {
    uploadedFiles.value.push({ fileName: file.name, file, progress: 0 })
  })

  const test = new Array(files.length).fill(0).map((_, i) => {
    return (async () => {
      const file = files[i]
      const formData = new FormData()
      formData.append('file', file)

      try {
        await axios.post('http://localhost:3001/upload', formData, {
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (progressEvent.progress) {
              uploadedFiles.value[i].progress = progressEvent.progress * 100
            }
          }
        })
      } catch (error) {
        console.error('Error uploading files:', error)
      }
    })()
  })

  await Promise.all(test)
}

const deleteFile = (name: string) => {
  uploadedFiles.value = uploadedFiles.value.filter((item) => item.fileName !== name)
}

const dropHandler = (ev: DragEvent): void => {
  ev.preventDefault()

  if (ev.dataTransfer?.items) {
    const files: File[] = []
    ;[...ev.dataTransfer.items].forEach(async (item) => {
      console.log('item', item)
      if (item.kind === 'file' && item.type === 'application/pdf') {
        const file = item.getAsFile() as File
        files.push(file)
      } else if (item.kind === 'file' && item.type !== 'application/pdf') {
        alert('Invalid item type!')
      }
    })
    uploadFiles(files)
  }
}

const dragOverHandler = (ev: DragEvent): void => {
  ev.preventDefault()
}
</script>

<style scoped lang="scss">
* {
  font-family: 'Inter', sans-serif;
}

.fileupload {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #181818;
  padding: 24px;
  max-width: 408px;

  &__buttons {
    display: flex;
    gap: 8px;
  }
}

.dragarea {
  &__input {
    display: none;
  }

  &__label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border: 1px solid #e1e1e1;
    border-style: dashed;
    padding: 12px;
    cursor: pointer;
  }

  &__text {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #e1e1e1;
    font-size: 14px;
  }

  &__filetypes {
    color: #e1e1e1;
    font-size: 12px;
  }
}

.progressarea {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__title {
    color: #5d9aee;
  }

  &-scroller {
    max-height: 188px;
    overflow-y: auto;

    &_visible {
      padding-right: 10px;
    }
  }
}

.progress {
  display: flex;
  flex-direction: column;
  gap: 32px;

  &-item {
    position: relative;
    display: flex;
    width: 100%;
    min-height: 36px;

    &:not(:last-child)::after {
      position: absolute;
      content: '';
      bottom: -16px;
      left: 0;
      background: #5e5e5e;
      height: 1px;
      width: 100%;
    }

    &__cancel {
      display: flex;
      height: 22.4px;
      align-items: center;
    }

    &__content {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0 8px 0 4px;
      gap: 8px;
    }

    &__info {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    &__name {
      font-size: 14px;
      color: #e1e1e1;
    }

    &__status {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      color: #e1e1e1;
    }
  }

  &-bar {
    display: flex;
    position: relative;
    width: 100%;
    height: 5px;

    &__bg {
      width: 100%;
      height: 5px;
      background: #aeccf6;
    }

    &__fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #5d9aee;
    }
  }
}

.button {
  padding: 4px 16px;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: 0.1s ease;

  &_outlined {
    border: 1px solid #5d9aee;
    color: #5d9aee;
    background: transparent;
    &:hover {
      color: #ffffff;
      background: #5d9aee;
    }
  }

  &_filled {
    color: #ffffff;
    background: #5d9aee;
    border: 1px solid #5d9aee;
    &:hover {
      color: #5d9aee;
      background: transparent;
    }
  }
}

.icon {
  min-width: 20px;
  min-height: 20px;
  max-width: 20px;
  max-height: 20px;
}

::-webkit-scrollbar {
  height: 6px;
  width: 6px;
  cursor: pointer;
}

::-webkit-scrollbar-track {
  background: #181818;
}

::-webkit-scrollbar-thumb {
  background-color: #5e5e5e;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #6b6b6b;
}
</style>
