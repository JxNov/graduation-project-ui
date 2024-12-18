<script setup lang='ts'>
const { $userStore } = useNuxtApp()
</script>

<template>
  <Card class="col-span-8">
    <CardHeader class="flex flex-row profiles-start gap-4">
      <h2 class="text-lg font-semibold">
        Thông tin cá nhân
      </h2>
    </CardHeader>

    <CardContent class="flex flex-col gap-4 border-t pt-6">
      <h3 class="font-semibold">
        Chi tiết cá nhân
      </h3>

      <p class="text-sm flex justify-between">
        <strong>Tên:</strong> {{ $userStore.userDetail?.name }}
      </p>

      <p class="text-sm flex justify-between">
        <strong>Giới tính:</strong> {{ $userStore.userDetail?.gender }}
      </p>

      <p class="text-sm flex justify-between">
        <strong>Ngày sinh:</strong> {{ $userStore.userDetail?.dateOfBirth }}
      </p>

      <p class="text-sm flex justify-between">
        <strong>Địa chỉ:</strong> {{ $userStore.userDetail?.address }}
      </p>
    </CardContent>
  </Card>
</template>