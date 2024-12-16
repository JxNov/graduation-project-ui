<script setup lang="ts">
const { $materialStore, $blockStore, $subjectStore } = useNuxtApp()

onMounted(async () => {
  await fetchData()
})

async function fetchData() {
  const promises = []

  if (!$materialStore.materialBlock.length) {
    promises.push($materialStore.fetchMaterialBlock())
  }

  if (!$blockStore.blocks.length) {
    promises.push($blockStore.fetchBlocks())
  }

  if (!$subjectStore.subjects.length) {
    promises.push($subjectStore.fetchSubjects())
  }

  await Promise.all(promises)
}
</script>

<template>
  <Materials :data="$materialStore.materialBlock" />
</template>
