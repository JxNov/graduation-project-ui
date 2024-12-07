<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const preview = ref<string | null>(null)

const constraints = {
  audio: false,
  video: true
}

const draw = () => {
  if (videoRef.value && canvasRef.value && ctx.value) {
    ctx.value.drawImage(videoRef.value, 0, 0, canvasRef.value.width, canvasRef.value.height)
    requestAnimationFrame(draw)
  }
}

const setStream = (stream: MediaStream) => {
  if (videoRef.value) {
    videoRef.value.srcObject = stream
    videoRef.value.play()

    requestAnimationFrame(draw)
  }
}

const capture = () => {
  if (canvasRef.value) {
    preview.value = canvasRef.value.toDataURL()
  }
}

const stopCamera = () => {
  if (videoRef.value && videoRef.value.srcObject) {
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
      .then(setStream)
      .catch((error) => {
        console.error('Error accessing the camera: ', error)
      })
  }
})

onBeforeUnmount(() => {
  stopCamera()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center pt-6">
    <video ref="videoRef" autoplay playsinline muted hidden></video>

    <canvas ref="canvasRef" class="bg-black rounded-md w-full aspect-[4/3]"></canvas>

    <div class="flex items-center justify-center py-4">
      <Button type="button" @click="capture">Capture</Button>

      <Button type="button" variant="default" @click="stopCamera">Stop</Button>
    </div>

    <div class="flex items-center justify-center py-4">
      <img :src="preview || ''" alt="Preview" class="rounded-md aspect-[4/3]" />
    </div>
  </div>
</template>
