<script setup lang="ts">
import { themes } from '@/lib/registry/themes'

const { theme, radius, setTheme, setRadius } = useCustomize()

type Color =
  | 'zinc'
  | 'slate'
  | 'stone'
  | 'gray'
  | 'neutral'
  | 'red'
  | 'rose'
  | 'orange'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'violet'

// Create an array of color values
const allColors: Color[] = [
  'zinc',
  'rose',
  'blue',
  'green',
  'orange',
  'red',
  'slate',
  'stone',
  'gray',
  'neutral',
  'yellow',
  'violet'
]

const RADII = [0, 0.25, 0.5, 0.75, 1]

// Whenever the theme value changes, update the document class list
watch(theme, () => {
  setClassTheme()
})

// Whenever the radius value changes, update the document style
watch(radius, () => {
  setStyleRadius()
})

function setClassTheme() {
  document.documentElement.classList.replace(
    document.documentElement.classList[0],
    `theme-${theme.value}`
  )
}

function setStyleRadius() {
  document.documentElement.style.setProperty('--radius', `${radius.value}rem`)
}

function backgroundColor(color: Color) {
  const bg = themes.find(theme => theme.name === color)
  return `hsl(${bg?.activeColor.light})`
}

const colorMode = useColorMode()
</script>

<template>
  <div class="grid gap-6">
    <div class="grid space-y-1">
      <h1 class="text-md text-foreground font-semibold">
        Tùy chỉnh
      </h1>
      <p class="text-xs text-muted-foreground">
        Chọn một kiểu và màu cho các thành phần của bạn
      </p>
    </div>
    <div class="space-y-1.5">
      <Label>
        {{ $t('auth.customize.color.title') }}
      </Label>
      <div class="grid grid-cols-3 gap-2">
        <template v-for="color in allColors" :key="color">
          <Button class="justify-start flex-col md:flex-row h-full gap-2" variant="outline"
            :class="{ 'border-primary border-2': theme === color }" @click="setTheme(color)">
            <span class="h-5 w-5 flex items-center justify-center rounded-full"
              :style="{ backgroundColor: backgroundColor(color) }">
              <Icon v-if="theme === color" name="i-radix-icons-check" size="16" class="text-white" />
            </span>
            <span class="text-xs capitalize">
              {{ $t(`auth.customize.color.${color}`) }}
            </span>
          </Button>
        </template>
      </div>
    </div>
    <div class="space-y-1.5">
      <Label>
        Độ bo góc
      </Label>
      <div class="grid grid-cols-5 gap-2">
        <template v-for="r in RADII" :key="r">
          <Button class="justify-center gap-2" variant="outline" :class="{ 'border-primary border-2': radius === r }"
            @click="setRadius(r)">
            <span class="text-xs capitalize">{{ r }}</span>
          </Button>
        </template>
      </div>
    </div>
    <div class="space-y-1.5">
      <Label>
        Chủ đề
      </Label>
      <div class="grid grid-cols-3 gap-2">
        <Button class="justify-center gap-2" variant="outline"
          :class="{ 'border-primary border-2': colorMode.preference === 'light' }"
          @click="colorMode.preference = 'light'">
          <Icon name="i-ph-sun-dim-duotone" size="16" />
          <span class="text-xs capitalize">
            Sáng
          </span>
        </Button>
        <Button class="justify-center gap-2" variant="outline"
          :class="{ 'border-primary border-2': colorMode.preference === 'dark' }"
          @click="colorMode.preference = 'dark'">
          <Icon name="i-ph-moon-stars-duotone" size="16" />
          <span class="text-xs capitalize">
            Tối
          </span>
        </Button>
        <Button class="justify-center gap-2" variant="outline"
          :class="{ 'border-primary border-2': colorMode.preference === 'system' }"
          @click="colorMode.preference = 'system'">
          <Icon name="i-lucide-monitor" size="16" />
          <span class="text-xs capitalize">
            Hệ thống
          </span>
        </Button>
      </div>
    </div>
  </div>
</template>
