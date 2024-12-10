<script setup lang="ts">
const learningInformation = [
  {
    id: 1,
    title: 'Thông báo học bổng học kỳ 1',
    category: 'learning'
  },
  {
    id: 2,
    title: 'Thông báo học bổng học kỳ 1',
    category: 'learning'
  },
  {
    id: 3,
    title: 'Thông báo học bổng học kỳ 1',
    category: 'learning'
  },
  {
    id: 4,
    title: 'Thông báo học bổng học kỳ 1',
    category: 'learning'
  },
  {
    id: 5,
    title: 'Thông báo học bổng học kỳ 1',
    category: 'learning'
  },
  {
    id: 6,
    title: 'Thông báo học bổng học kỳ 1',
    category: 'learning'
  }
]

const eventInformation = [
  {
    id: 7,
    title: 'Thông báo đăng ký BHYT đối với học sinh',
    category: 'event'
  },
  {
    id: 8,
    title: 'Thông báo đăng ký BHYT đối với học sinh',
    category: 'event'
  },
  {
    id: 9,
    title: 'Thông báo đăng ký BHYT đối với học sinh',
    category: 'event'
  },
  {
    id: 10,
    title: 'Thông báo đăng ký BHYT đối với học sinh',
    category: 'event'
  },
  {
    id: 11,
    title: 'Thông báo đăng ký BHYT đối với học sinh',
    category: 'event'
  },
  {
    id: 12,
    title: 'Thông báo đăng ký BHYT đối với học sinh',
    category: 'event'
  }
]

const tuitionInformation = [
  {
    id: 13,
    title: 'Thông báo thu học phí học kỳ 1',
    category: 'tuition'
  },
  {
    id: 14,
    title: 'Thông báo thu học phí học kỳ 1',
    category: 'tuition'
  },
  {
    id: 15,
    title: 'Thông báo thu học phí học kỳ 1',
    category: 'tuition'
  },
  {
    id: 16,
    title: 'Thông báo thu học phí học kỳ 1',
    category: 'tuition'
  },
  {
    id: 17,
    title: 'Thông báo thu học phí học kỳ 1',
    category: 'tuition'
  },
  {
    id: 18,
    title: 'Thông báo thu học phí học kỳ 1',
    category: 'tuition'
  }
]
</script>

<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <HomeItem :data="learningInformation" />
    <HomeItem :data="eventInformation" />
    <HomeItem :data="tuitionInformation" />
  </div>
</template>
