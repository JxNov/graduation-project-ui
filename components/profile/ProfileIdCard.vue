<script setup lang='ts'>
const { $authStore, $userStore } = useNuxtApp()
</script>

<template>
  <Card class="col-span-4 h-fit">
    <CardHeader class="flex flex-row profiles-start gap-4 select-none">
      <Avatar size="base">
        <AvatarImage :src="$authStore.avatar || ''" :alt="$authStore.user.name" />
        <AvatarFallback>{{ $authStore.user.name.split(' ').map((name: string) => name[0]).join('') }}</AvatarFallback>
      </Avatar>

      <div>
        <CardTitle class="text-lg">{{ $authStore.user.name }}</CardTitle>
        <CardDescription>
          {{ $authStore.user.roles.join(', ') }}
        </CardDescription>
      </div>
    </CardHeader>

    <CardContent class="flex flex-col gap-2">
      <p class="text-sm flex justify-between">
        <strong>Email:</strong> {{ $userStore.userDetail?.email }}
      </p>

      <p class="text-sm flex justify-between">
        <strong>Phone:</strong> {{ $userStore.userDetail?.phoneNumber }}
      </p>
    </CardContent>
  </Card>
</template>