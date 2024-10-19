<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})

onMounted(() => {
  document.title = 'Login'
})
</script>

<template>
  <LayoutAuth>
    <div class="grid mx-auto max-w-sm gap-6">
      <div class="grid gap-2 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">
          Login
        </h1>
        <p class="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <AuthSignIn/>
    </div>
  </LayoutAuth>
</template>
