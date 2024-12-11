<script setup lang='ts'>
const { $userStore } = useNuxtApp()
</script>

<template>
  <Card class="col-span-9">
    <CardHeader class="flex flex-row profiles-start gap-4">
      <h2 class="text-lg font-semibold">
        Personal Information
      </h2>
    </CardHeader>

    <CardContent class="flex flex-col gap-4 border-t pt-6">
      <h3 class="font-semibold">
        Personal Details
      </h3>

      <p class="text-sm flex justify-between">
        <strong>Name:</strong> {{ $userStore.userDetail?.name }}
      </p>

      <p class="text-sm flex justify-between">
        <strong>Gender:</strong> {{ $userStore.userDetail?.gender }}
      </p>

      <p class="text-sm flex justify-between">
        <strong>Date of Birth:</strong> {{ $userStore.userDetail?.date_of_birth }}
      </p>

      <p class="text-sm flex justify-between">
        <strong>Address:</strong> {{ $userStore.userDetail?.address }}
      </p>
    </CardContent>
  </Card>
</template>