<script setup lang='ts'>
const profile = {
  name: 'John Doe',
  image: 'https://randomuser.me/api/port',
  role: 'Student',
  email: 'abc@example.com',
  phone: '1234567890'
}
</script>

<template>
  <Card class="col-span-3 h-fit">
    <CardHeader class="flex flex-row profiles-start gap-4 select-none">
      <Avatar size="base">
        <AvatarImage :src="profile.image || ''" :alt="profile.name" />
        <AvatarFallback>{{ profile.name.split(' ').map((name: string) => name[0]).join('') }}</AvatarFallback>
      </Avatar>

      <div>
        <CardTitle class="text-lg">{{ profile.name }}</CardTitle>
        <CardDescription>{{ profile.role }}</CardDescription>
      </div>
    </CardHeader>

    <CardContent class="flex flex-col gap-2">
      <p class="text-sm flex justify-between">
        <strong>Email:</strong> {{ profile.email }}
      </p>

      <p class="text-sm flex justify-between">
        <strong>Phone:</strong> {{ profile.phone }}
      </p>
    </CardContent>
  </Card>
</template>