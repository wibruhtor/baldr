import type { ChatSettings } from "$lib/types/api/entity/chat-settings"
import type { TwitchUserInfo } from "$lib/types/api/entity/twitch-user-info"
import type { ChatMessage } from "$lib/types/chat/chat-message"
import type { Emote } from "$lib/types/emote"
import { banWordReplacer } from "$lib/utils/ban-word-replacer"
import { emoteReplacer } from "$lib/utils/emote-replacer"
import { writable } from "svelte/store"

export const chatStoreContextKey = 'chat-widget-store'

export type ChatStore = {
  userInfo: TwitchUserInfo
  settings: ChatSettings,
  emotes: Emote[]
  messages: ChatMessage[]
  banWords: string[]
}

export type WritableChatStore = ReturnType<typeof createChatStore>

export const createChatStore = (initialState: ChatStore) => {
  const { subscribe, update } = writable(initialState)

  return {
    subscribe,
    addMessage(message: ChatMessage) {
        update(v => {
          if (message.text.startsWith(v.settings.hide.hideMessagePattern)) return v
          if (v.settings.hide.nicknames.map(v => v.toLowerCase()).includes(message.nickname.toLowerCase())) return v
          
          const banWordFree = banWordReplacer.replace(message.text,
            v.settings.hide.banWordReplacement,
            v.banWords,
          )
          const parsed = emoteReplacer.replace(banWordFree, v.emotes).join(' ')
            
          if (parsed.trim().length === 0) return v
          message.text = parsed;

          const messages = [
            ...v.messages,
            message
          ]
          .toSorted((a, b) => b.timestamp - a.timestamp)
          .slice(0, v.settings?.size.maxMessages || 50);

          return { ...v, messages }
        })
    }
  }
}