<script setup lang="ts">
import * as faceapi from 'face-api.js'
import { getAllImagesFirebase } from '~/utils/imageFirebase'
import { listAll, ref as firebaseRef } from 'firebase/storage'
import { storage } from '~/config/firebase.config'
import type { Ref } from 'vue'

const { $attendanceStore, $bus } = useNuxtApp()

const labels = ref<{ label: string; images: string[] }[]>([])
const detectedFaces = ref<string[]>([])
const videoStream = ref<MediaStream | null>(null)
const webcamStarted = ref<boolean>(false)
const modelsLoaded = ref<boolean>(false)
const studentPresent = ref<string>('')
const isLoading = ref<boolean>(false)

async function loadModels() {
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models')
  ])
  modelsLoaded.value = true
}

function startWebcam() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    })
    .then((stream) => {
      videoStream.value = stream
      setStream(stream)
    })
    .catch((error) => {
      console.error(error)
    })
}

function setStream(stream: MediaStream) {
  const video = document.getElementById('video') as HTMLVideoElement
  video.srcObject = stream
  video.play()

  requestAnimationFrame(() => {
    const { width, height } = video.getBoundingClientRect()
    video.width = width
    video.height = height
  })
}

async function listFolders() {
  const listRef = firebaseRef(storage, 'images')
  const list = await listAll(listRef)

  for (const itemRef of list.prefixes) {
    const name = itemRef.name
    const images = []

    for (let i = 1; i <= 5; i++) {
      const [url] = await getAllImagesFirebase(itemRef.name, `${itemRef.name}_image${i}.png`)
      images.push(url)
    }

    labels.value.push({
      label: name,
      images
    })
  }
}

function markAttendance(detectedFaces: Ref<string[]>) {
  studentPresent.value = detectedFaces.value[0]
}

async function sendAttendanceDataToServer() {
  isLoading.value = true
  const shifts = new Date().getHours() < 12 ? 'Morning' : 'Afternoon'

  try {
    const response = await $attendanceStore.updateStudentAttendance(studentPresent.value, { shifts })

    if (!response) {
      throw new Error('Điểm danh thất bại')
    }

    studentPresent.value = ''
    detectedFaces.value = []
    isLoading.value = false
    $bus.emit('close-dialog-attendance', false)
  } catch (error) {
    isLoading.value = false
    throw error
  }
}

async function getLabeledFaceDescriptions() {
  const labeledDescriptors = labels.value.map((label) => {
    return label.images.map(async (image) => {
      const img = await faceapi.fetchImage(image)
      const detections = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor()

      if (detections) {
        return new faceapi.LabeledFaceDescriptors(label.label, [detections.descriptor])
      }
    })
  })

  return Promise.all(labeledDescriptors.flat()).then((descriptors) => descriptors.filter((descriptor) => descriptor !== undefined))
}

async function handleVideoPlay() {
  const video = document.getElementById('video') as HTMLVideoElement
  const videoContainer = document.querySelector('.video-container') as HTMLDivElement

  const labeledFaceDescriptors = await getLabeledFaceDescriptions()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors)

  const canvas = faceapi.createCanvasFromMedia(video)
  canvas.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'z-[999]')
  videoContainer.appendChild(canvas)

  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)

  const ctx = canvas.getContext('2d')

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video)
      .withFaceLandmarks()
      .withFaceDescriptors()

    const resizedDetections = faceapi.resizeResults(detections, displaySize)

    ctx?.clearRect(0, 0, canvas.width, canvas.height)

    const results = resizedDetections.map((d) => {
      return faceMatcher.findBestMatch(d.descriptor)
    })
    detectedFaces.value = results.map((result) => result.label)
    markAttendance(detectedFaces)

    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result.toString()
      })
      drawBox.draw(canvas)
    })
  }, 100)
}

function updateOtherElements() {
  loadModels().then(() => {
    startWebcam()
    webcamStarted.value = true
  })

  const video = document.getElementById('video') as HTMLVideoElement
  video.addEventListener('play', handleVideoPlay)
}

function stopWebcam() {
  if (videoStream.value) {
    videoStream.value.getTracks().forEach((track) => track.stop())
    videoStream.value = null
  }
}

onMounted(async () => {
  await listFolders()
  updateOtherElements()
})

onBeforeUnmount(() => {
  stopWebcam()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center pt-6">
    <div
      class="video-container flex justify-center items-center relative w-full overflow-hidden bg-primary-foreground shadow-md"
    >
      <video id="video" width="600" height="450" class="w-[600px] h-[350px]" autoplay />
    </div>

    <div class="flex items-center justify-center py-4">
      <Button
        type="button"
        @click="sendAttendanceDataToServer"
        :disabled="isLoading"
      >
        Điểm danh
      </Button>
    </div>
  </div>
</template>

