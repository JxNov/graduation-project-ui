<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'blank'
})

const title = 'Đăng nhập'
const description = 'Nhập email của bạn dưới đây để đăng nhập vào tài khoản của bạn'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '',
  twitterImage: '',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <LayoutAuth>
    <div class="grid mx-auto max-w-sm gap-6">
      <div class="grid gap-2 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">
          Đăng nhập
        </h1>
        <p class="text-balance text-sm text-muted-foreground">
          Nhập email của bạn dưới đây để đăng nhập vào tài khoản của bạn
        </p>
      </div>
      <AuthSignIn />
    </div>
  </LayoutAuth>
</template>
