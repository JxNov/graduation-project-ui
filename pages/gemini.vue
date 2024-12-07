<script setup lang="ts">
// const { $geminiStore } = useNuxtApp()
//
// onMounted(async () => {
//   await $geminiStore.fetchGeminis()
// })

const data = [
  {
    id: 1,
    title: '1 + 1',
    content: [
      {
        question: 'What is 1 + 1?',
        answer: '2'
      },
      {
        question: 'What is 1 + 2?',
        answer: '3'
      }
    ]
  },
  {
    id: 2,
    title: '2 + 2',
    content: [
      {
        question: 'What is 2 + 2?',
        answer: '4'
      },
      {
        question: 'What is 2 + 3?',
        answer: '5'
      },
      {
        question: 'What is 2 + 4?',
        answer: '6'
      }
    ]
  }
]

</script>

<template>
  <GeminiLayout :data="data" />
</template>