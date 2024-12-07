<script setup lang="ts">
import HomeworkStudentSubmit from './HomeworkStudentSubmit.vue'
</script>

<template>
  <div class="xl:px-16 mt-10">
    <Card>
      <CardHeader class="flex flex-row justify-between items-center gap-4 select-none">
        <div class="flex flex-col items-start gap-4">
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Time</CardDescription>
        </div>

        <div class="flex flex-row items-center gap-4">
          <div class="flex flex-row items-start gap-10">
            <div class="border-l-2 pl-4">
              <p class="text-4xl pb-2">0</p>
              <CardDescription>Đã nộp</CardDescription>
            </div>

            <div class="border-l-2 pl-4">
              <p class="text-4xl pb-2">0</p>
              <CardDescription>Đã giao</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent class="grid grid-cols-12 gap-4 border-t pt-6">
        <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2">
          <HomeworkStudentSubmit />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2">
          <HomeworkStudentSubmit />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2">
          <HomeworkStudentSubmit />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2">
          <HomeworkStudentSubmit />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2">
          <HomeworkStudentSubmit />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2">
          <HomeworkStudentSubmit />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2">
          <HomeworkStudentSubmit />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2">
          <HomeworkStudentSubmit />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2">
          <HomeworkStudentSubmit />
        </div>
      </CardContent>
    </Card>
  </div>
</template>

