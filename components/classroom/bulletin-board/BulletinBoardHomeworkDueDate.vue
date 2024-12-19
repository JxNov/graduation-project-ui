<script setup lang="ts">
const props = defineProps<{
  data: any
}>()
</script>

<template>
  <Card
    class="transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:bg-muted/50 cursor-pointer select-none"
  >
    <CardHeader
      class="flex flex-row justify-between items-start gap-4 p-3"
    >
      <div class="flex flex-row items-start gap-4">
        <Avatar>
          <AvatarImage :src="data?.teacherImage" :alt="data?.teacherName" />
          <AvatarFallback>
            {{ data?.teacherName.split(' ').map((name: string) => name[0]).join('') }}
          </AvatarFallback>
        </Avatar>

        <div>
          <CardTitle>
            {{ data?.title }}
          </CardTitle>
          <CardDescription>
            {{ data?.dueDate }}
          </CardDescription>
        </div>
      </div>
    </CardHeader>
  </Card>
</template>
