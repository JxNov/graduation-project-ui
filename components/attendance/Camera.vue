<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const preview = ref<string | null>(null)

const constraints = {
  audio: false,
  video: true
}

const Draw = () => {
  if (videoRef.value && canvasRef.value && ctx.value) {
    ctx.value.drawImage(videoRef.value, 0, 0, canvasRef.value.width, canvasRef.value.height)
    requestAnimationFrame(Draw)
  }
}

const SetStream = (stream: MediaStream) => {
  if (videoRef.value) {
    videoRef.value.srcObject = stream
    videoRef.value.play()

    requestAnimationFrame(Draw)
  }
}

const Capture = () => {
  if (canvasRef.value) {
    preview.value = canvasRef.value.toDataURL()
  }
}

const StopCamera = () => {
  if (videoRef.value) {
    const stream = videoRef.value.srcObject as MediaStream
    const tracks = stream.getTracks()

    tracks.forEach((track) => {
      track.stop()
    })

    videoRef.value.srcObject = null
    ctx.value?.clearRect(0, 0, canvasRef.value?.width || 0, canvasRef.value?.height || 0)
    preview.value = null
  }
}

onMounted(async () => {
  if (videoRef.value && canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d')

    await navigator.mediaDevices.getUserMedia(constraints)
      .then(SetStream)
      .catch((error) => {
        console.error('Error accessing the camera: ', error)
      })
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <video ref="videoRef" autoplay playsinline muted hidden></video>

    <canvas ref="canvasRef" width="1280" height="800" class="bg-black rounded-3xl"></canvas>

    <div class="flex items-center justify-center py-4">
      <Button type="button" @click="Capture">Capture</Button>

      <Button type="button" variant="default" @click="StopCamera">Stop</Button>
    </div>

    <div class="flex items-center justify-center py-4">
      <img :src="preview || ''" alt="Preview" class="rounded-3xl" />
    </div>
  </div>
</template>
