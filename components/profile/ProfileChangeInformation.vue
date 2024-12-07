<script setup lang='ts'>
const profile = {
  name: 'John Doe',
  image: 'https://randomuser.me/api/port',
  role: 'Student',
  email: 'abc@example.com',
  phone: '1234567890',
  dateOfBirth: '01/01/2000',
  gender: 'Male',
  address: '123 Main St, City, Country',
  username: 'abc123',
  generation: '2023'
}
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
        <strong>Name:</strong> {{ profile.name }}
      </p>

      <p class="text-sm flex justify-between">
        <strong>Gender:</strong> {{ profile.gender }}
      </p>

      <p class="text-sm flex justify-between">
        <strong>Date of Birth:</strong> {{ profile.dateOfBirth }}
      </p>

      <p class="text-sm flex justify-between">
        <strong>Address:</strong> {{ profile.address }}
      </p>
    </CardContent>

    <CardContent class="flex flex-col gap-4">
      <h3 class="font-semibold">
        Contact Information
      </h3>

      <p class="text-sm flex justify-between">
        <strong>Username:</strong> {{ profile.username }}
      </p>

      <p class="text-sm flex justify-between">
        <strong>Generation:</strong> {{ profile.generation }}
      </p>
    </CardContent>
  </Card>
</template>