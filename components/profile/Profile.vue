<script setup lang="ts">
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
