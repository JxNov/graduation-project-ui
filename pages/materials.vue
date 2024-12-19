<script setup lang="ts">
const { $materialStore, $blockStore, $subjectStore } = useNuxtApp()

onMounted(async () => {
  await fetchData()
})

async function fetchData() {
  await Promise.all([
    $materialStore.fetchMaterialBlock(),
    $blockStore.fetchBlocks(),
    $subjectStore.fetchSubjects()
  ])
}
</script>

<template>
  <Materials :data="$materialStore.materialBlock" />
</template>
