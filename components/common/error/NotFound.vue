<script setup lang="ts">

</script>

<template>
  <div class='h-svh'>
    <div class='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
      <h1 class='text-[7rem] font-bold leading-tight'>404</h1>
      <!--      <span class='font-medium'>{{ $t('common.common.pageNotFound') }}</span>-->
      <!--      <p class='text-center text-muted-foreground mt-6'>{{ $t('common.tip.pageNotFound') }}</p>-->
      <span class='font-medium'>Page Not Found</span>
      <p class="text-center text-foreground/50">The page you're trying to access <br /> could not be found</p>
      <div class='mt-6 flex gap-4'>
        <NuxtLink to="/">
          <!--          <Button variant='outline'>{{ $t('common.common.backToHome') }}</Button>-->
          <Button variant='outline'>Back to Home</Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
