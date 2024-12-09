<script setup lang="ts">
import { CameraIcon } from '@radix-icons/vue'
import type { VNode } from 'vue'

const isHidden = ref<boolean>(false)
const images = ref<VNode[]>([])
const capturedImages = reactive<{ id: number; image: string }[]>([])

const emits = defineEmits<{
  // (e: 'update:modelValue', capturedImages: { id: number; image: string }[]): void
  (e: 'update:modelValue', imagesInput: File[]): void
}>()

const openCamera = (buttonId: string) => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
      const video: HTMLVideoElement = document.createElement('video')
      video.srcObject = stream
      document.body.appendChild(video)
      video.play()

      setTimeout(() => {
        const capturedImage = captureImage(video)
        stream.getTracks().forEach((track) => track.stop())
        document.body.removeChild(video)

        const imgElement: HTMLImageElement = document.getElementById(buttonId + '-captured-image') as HTMLImageElement
        imgElement.src = capturedImage

        const hiddenInput: HTMLInputElement = document.getElementById(buttonId + '-captured-image-input') as HTMLInputElement
        hiddenInput.value = capturedImage

        const id = parseInt(buttonId.split('_')[1])
        const index = capturedImages.findIndex((image) => image.id === id)
        capturedImages[index].image = capturedImage
      }, 500)
    })
    .catch((error) => {
      console.error('Error accessing the camera: ', error)
    })
}

const takeMultipleImages = async () => {
  isHidden.value = true

  for (let i = 1; i <= 5; i++) {
    images.value.push(createImageBox(i))
    await captureImageWithDelay(i)
  }
}

const createImageBox = (i: number) => {
  const imgId = `image_${i}-captured-image`
  const inputId = `image_${i}-captured-image-input`

  return h('div', {
    class: 'relative max-w-[calc(20%-1rem)] cursor-pointer rounded-md overflow-hidden'
  }, [
    h('img', {
      id: imgId,
      class: 'max-w-full h-auto object-cover'
    }),
    h('div', {
      class: 'absolute inset-0 bg-primary-foreground/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300',
      onClick: () => openCamera(`image_${i}`)
    }, [
      h(CameraIcon, { class: 'w-20 h-20 text-primary' })
    ]),
    h('input', {
      type: 'hidden',
      id: inputId,
      name: `capturedImage${i}`
    })
  ])
}

const captureImageWithDelay = async (i: number) => {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    const video: HTMLVideoElement = document.createElement('video')
    video.srcObject = stream
    document.body.appendChild(video)
    await video.play()

    await new Promise((resolve) => setTimeout(resolve, 300))

    const capturedImage = captureImage(video)

    stream.getTracks().forEach((track) => track.stop())
    document.body.removeChild(video)

    const imgElement: HTMLImageElement = document.getElementById(`image_${i}-captured-image`) as HTMLImageElement
    imgElement.src = capturedImage

    const hiddenInput: HTMLInputElement = document.getElementById(`image_${i}-captured-image-input`) as HTMLInputElement
    hiddenInput.value = capturedImage
    capturedImages.push({
      id: i,
      image: capturedImage
    })
  } catch (error) {
    console.error('Error accessing the camera: ', error)
  }
}

function captureImage(video: HTMLVideoElement) {
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
  context.drawImage(video, 0, 0, canvas.width, canvas.height)

  return canvas.toDataURL('image/png')
}

watch(capturedImages, (newValue) => {
  // emits('update:modelValue', newValue)
  const imagesInput = newValue.map((image) => {
    const byteString = atob(image.image.split(',')[1])
    const mimeString = image.image.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    const blob = new Blob([ab], { type: mimeString })
    return new File([blob], `image_${image.id}.png`, { type: mimeString })
  })

  emits('update:modelValue', imagesInput)
})
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row profiles-start gap-4 select-none">
      Take Multiple Images
    </CardHeader>

    <CardContent class="min-h-64">
      <div
        class="flex justify-center cursor-pointer rounded-md overflow-hidden"
        @click="takeMultipleImages"
        :class="{ 'hidden': isHidden }"
      >
        <div class="w-full h-52 bg-primary-foreground flex items-center justify-center">
          <CameraIcon class="w-12 h-12 text-primary" />
        </div>
      </div>

      <div id="multiple-images" class="flex gap-6">
        <template v-for="(image, index) in images" :key="index">
          <component :is="image"></component>
        </template>
      </div>
    </CardContent>
  </Card>
</template>
