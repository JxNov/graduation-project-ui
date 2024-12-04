import { z } from 'zod'

export const chatPreviewSchema = z.object({
  id: z.number(),
  title: z.string()
})

export type ChatPreview = z.infer<typeof chatPreviewSchema>

export const chatSchema = z.object({
  conversationId: z.number(),
  messages: z.array(z.object({
    messageID: z.number(),
    message: z.string(),
    isRead: z.boolean(),
    name: z.string(),
    username: z.string()
  }))
})

export type Chat = z.infer<typeof chatSchema>
