<script setup lang="ts">
import { getImageFirebase } from '~/utils/imageFirebase'

const { $authStore, $userStore } = useNuxtApp()
const useIdFunction = () => useId()

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
  <Tabs default-value="account">
    <TabsList>
      <TabsTrigger as-child value="account">
        Tài khoản
      </TabsTrigger>

      <TabsTrigger as-child value="change">
       Thay đổi thông tin
      </TabsTrigger>
    </TabsList>

    <TabsContent value="account" :id="useIdFunction">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-12">
        <ProfileIdCard />
        <ProfilePersonalInformation />
      </div>
    </TabsContent>

    <TabsContent value="change" :id="useIdFunction">
      <ProfileChangeInformation />
    </TabsContent>
  </Tabs>
</template>
