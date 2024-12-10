<script setup lang="ts">
import { PlusIcon } from '@radix-icons/vue'
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button type="button">
        <PlusIcon class="w-6 h-6 mr-1" />
        Create Homework
      </Button>
    </DrawerTrigger>

    <DrawerContent class="h-full">
      <div class="mx-auto w-full max-w-screen-xl">
        <DrawerHeader>
          <DrawerTitle>Create Homework</DrawerTitle>
          <DrawerDescription>Fill in the form below to create a new homework.</DrawerDescription>
        </DrawerHeader>


        <DrawerFooter>
          <Button>Submit</Button>

          <DrawerClose as-child>
            <Button variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>