<script setup lang="ts">
import { FontBoldIcon, FontItalicIcon, ListBulletIcon, UnderlineIcon } from '@radix-icons/vue'
import Underline from '@tiptap/extension-underline'

const props = defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const editor = useEditor({
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    emits('update:modelValue', editor.getHTML())
  },
  extensions: [TiptapStarterKit, Underline],
  editorProps: {
    attributes: {
      class: 'prose rounded-b-md max-w-none border p-4 min-h-[10rem] max-h-[10rem] overflow-y-auto outline-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border'
    }
  }
})

onBeforeUnmount(() => {
  unref(editor)?.destroy()
})
</script>

<template>
  <div>
    <div v-if="editor"
         class="flex items-center flex-wrap gap-x-1 border-t border-l border-r p-2 rounded-t-md">
      <Button
        size="sm"
        variant="ghost"
        type="button"
        class="p-2 hover:text-muted-foreground"
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'bg-accent hover:text-accent-foreground': editor.isActive('bold') }"
      >
        <FontBoldIcon class="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        type="button"
        class="p-2 hover:text-muted-foreground"
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'bg-accent hover:text-accent-foreground': editor.isActive('italic') }"
      >
        <FontItalicIcon class="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        type="button"
        class="p-2 hover:text-muted-foreground"
        @click="editor.chain().focus().toggleUnderline().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'bg-accent hover:text-accent-foreground': editor.isActive('underline') }"
      >
        <UnderlineIcon class="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        type="button"
        class="p-2 hover:text-muted-foreground"
        @click="editor.chain().focus().toggleBulletList().run()"
        :disabled="!editor.can().chain().focus().toggleBulletList().run()"
        :class="{ 'bg-accent hover:text-accent-foreground': editor.isActive('bulletList') }"
      >
        <ListBulletIcon class="h-4 w-4" />
      </Button>
    </div>

    <TiptapEditorContent :editor="editor" />
  </div>
</template>
