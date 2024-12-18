<script setup lang="ts">
import { Activity, ArrowUpRight, CreditCard, DollarSign, Users } from 'lucide-vue-next'

const data = [
  { name: 'Jan', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Feb', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Mar', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Apr', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'May', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jun', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 }
]

const valueFormatter = (tick: number | Date) => typeof tick === 'number' ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}` : ''

</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-3xl font-bold tracking-tight">
        Bảng điều khiển
      </h2>
    </div>
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <div class="grid gap-4 lg:grid-cols-4 md:grid-cols-2 md:gap-8">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Số khóa học sinh
            </CardTitle>
            <DollarSign class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              2
            </div>
            <p class="text-xs text-muted-foreground">
              2 khóa học sinh
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Số giáo viên
            </CardTitle>
            <Users class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              333
            </div>
            <p class="text-xs text-muted-foreground">
              333 giáo viên
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Số lượng học sinh
            </CardTitle>
            <CreditCard class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              666
            </div>
            <p class="text-xs text-muted-foreground">
              666 học sinh
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Số lượng lớp học
            </CardTitle>
            <Activity class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              666
            </div>
            <p class="text-xs text-muted-foreground">
              666 lớp học
            </p>
          </CardContent>
        </Card>
      </div>
      <div class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 md:gap-8">
        <Card class="xl:col-span-2">
          <CardHeader class="flex flex-row items-center">
            <div class="grid gap-2">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Recent transactions from your store.
              </CardDescription>
            </div>
            <Button as-child size="sm" class="ml-auto gap-1">
              <a href="#">
                View All
                <ArrowUpRight class="h-4 w-4" />
              </a>
            </Button>
          </CardHeader>
          <CardContent>
            <BarChart :data="data" index="name" :categories="['total', 'predicted']" :y-formatter="(tick, i) => {
              return typeof tick === 'number'
                ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                : ''
            }" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent class="grid gap-8">
            <DonutChart index="name" :category="'total'" :data="data" :value-formatter="valueFormatter" />

            <div class="grid gap-4">
              <div class="flex flex-row items-center justify-between">
                <div class="text-sm font-medium">
                  Total Sales
                </div>
                <div class="text-sm font-medium">
                  {{ valueFormatter(data.reduce((acc, curr) => acc + curr.total, 0)) }}
                </div>
              </div>
              <div class="flex flex-row items-center justify-between">
                <div class="text-sm font-medium">
                  Predicted Sales
                </div>
                <div class="text-sm font-medium">
                  {{ valueFormatter(data.reduce((acc, curr) => acc + curr.predicted, 0)) }}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>
