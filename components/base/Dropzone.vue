<script setup lang="ts">
import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'vue'
import { type FileRejectReason, useDropzone } from 'vue3-dropzone'
import {
  UploadIcon,
  FileTextIcon,
  ImageIcon,
  TrashIcon
} from '@radix-icons/vue'

interface DropzoneProps {
  containerClass?: HTMLAttributes['class'],
  dropZoneClass?: HTMLAttributes['class'],
  maxSize?: number,
  showFilesList?: boolean,
  showErrorMessage?: boolean,
  onDrop?: (acceptedFiles: File[], fileRejections: FileRejectReason[]) => void
}

const props = withDefaults(defineProps<DropzoneProps>(), {
  maxSize: 20,
  showFilesList: true,
  showErrorMessage: true
})

const filesUploaded = ref<File[]>([])
const errorMessage = ref<string>('')

const onDrop = (acceptedFiles: File[], fileRejections: FileRejectReason[]) => {
  if (acceptedFiles.some(file => file.size > props.maxSize * 1024 * 1024)) {
    errorMessage.value = `File size exceeds the limit of ${props.maxSize} MB`
    return
  }

  if (acceptedFiles.some(file => filesUploaded.value.some(f => f.name === file.name))) {
    errorMessage.value = 'File already exists'
    return
  }

  if (props.onDrop) {
    props.onDrop(acceptedFiles, fileRejections)
  } else {
    filesUploaded.value.push(...acceptedFiles)
    if (fileRejections.length > 0) {
      let _errorMessage = `Could not upload ${fileRejections[0].file}`
      if (fileRejections.length > 1) {
        _errorMessage += `, and ${fileRejections.length - 1} other files.`
      }
      errorMessage.value = _errorMessage
    } else {
      errorMessage.value = ''
    }
  }
}

const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

const truncate = (text: string, length: number) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}

const deleteUploadedFile = (index: number) => {
  filesUploaded.value.splice(index, 1)
}
</script>

<template>
  <div :class="cn('flex flex-col gap-2 max-w-96', props.containerClass)">
    <div
      v-bind="getRootProps()"
      :class="cn('flex justify-center items-center w-full h-32 border-dashed border-2 border-gray-200 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all select-none cursor-pointer', props.dropZoneClass)"
    >
      <input v-bind="getInputProps()" />

      <div v-if="isDragActive" class="text-sm font-medium">
        Drop your files here!
      </div>

      <div v-else class="flex items-center flex-col gap-1.5">
        <div class="flex items-center flex-row gap-0.5 text-sm font-medium">
          <UploadIcon class="mr-2 h-4 w-4" />
          Upload files
        </div>

        <div v-if="maxSize" class="text-xs text-gray-400 font-medium">
          Max. file size: {{ props.maxSize }} MB
        </div>
      </div>
    </div>

    <span v-if="errorMessage" class="text-xs text-red-600 mt-3">{{ errorMessage }}</span>

    <ScrollArea
      v-if="showFilesList && filesUploaded.length > 0"
      :class="cn('flex flex-col gap-2 w-full', filesUploaded.length > 2 ? 'max-h-72' : 'h-fit', 'mt-2', filesUploaded.length > 0 ? 'pb-2' : '')"
      class="rounded-md border p-4"
    >
      <div class="w-full">
        <div v-for="(fileUploaded, index) in filesUploaded" :key="index"
             class="flex justify-between items-center flex-row w-full h-16 mt-2 px-4 border-solid border-2 border-gray-200 rounded-lg shadow-sm">
          <div class="flex items-center flex-row gap-4 h-full">
            <component
              :is="fileUploaded.type.includes('image') ? ImageIcon : FileTextIcon"
              class="text-primary w-6 h-6"
            />

            <div class="flex flex-col gap-0">
              <div class="text-[0.85rem] font-medium leading-snug">
                {{ truncate(fileUploaded.name.split('.').slice(0, -1).join('.'), 30) }}
              </div>

              <div class="text-[0.7rem] text-gray-500 leading-tight">
                .{{ fileUploaded.name.split('.').pop() }} • {{ (fileUploaded.size / (1024 * 1024)).toFixed(2) }} MB
              </div>
            </div>
          </div>

          <div
            class="p-2 rounded-full border-solid border-2 border-gray-100 shadow-sm hover:bg-accent transition-all select-none cursor-pointer"
            @click="deleteUploadedFile(index)"
          >
            <TrashIcon class="text-primary w-5 h-5" />
          </div>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>
