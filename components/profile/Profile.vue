<script setup lang="ts">
import { getImageFirebase } from '~/utils/imageFirebase'

const { $authStore, $userStore } = useNuxtApp()

onMounted(async () => {
  if (!$userStore.userDetail) {
    await $userStore.fetchUserDetail($authStore.user.username)
  }

  if (!$authStore.avatar.startsWith('http')) {
    $authStore.avatar = await getImageFirebase($authStore.user.username, $authStore.user.image)
  }
})
</script>

<template>
  <ClientOnly>
    <Tabs default-value="account" orientation="vertical">
      <TabsList>
        <TabsTrigger value="account">
          Account
        </TabsTrigger>

        <TabsTrigger value="change">
          Change Information
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-12">
          <ProfileIdCard />
          <ProfilePersonalInformation />
        </div>
      </TabsContent>

      <TabsContent value="change">
        <ProfileChangeInformation />
      </TabsContent>
    </Tabs>
  </ClientOnly>
</template>
