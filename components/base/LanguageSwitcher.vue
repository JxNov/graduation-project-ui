<script setup lang="ts">
const { locales, locale, setLocale } = useI18n()

const availableLocales = computed(() => locales.value)

const changeLocale = (localeCode: string) => {
  setLocale(localeCode)
}

const checkLocale = (localeCode: string) => {
  return locale.value === localeCode
}
</script>

<template>
  <DropdownMenuSub>
    <DropdownMenuSubTrigger>
      <span>Language</span>
    </DropdownMenuSubTrigger>

    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        <DropdownMenuItem
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="changeLocale(locale.code)"
        >
          <Icon :name="`emojione-v1:flag-for-${locale.flag}`" size="16" />
          <span class="ml-2">{{ locale.name }}</span>
          <Icon
            v-if="checkLocale(locale.code)"
            name="i-radix-icons-check"
            size="16"
            class="ml-4"
          />
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
</template>
