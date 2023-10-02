import type { ChatSettings } from "$lib/types/api/entity/chat-settings"
import type { TwitchBadge } from "$lib/types/api/entity/twitch-badge"
import type { TwitchUserInfo } from "$lib/types/api/entity/twitch-user-info"
import type { ChatMessage } from "$lib/types/chat/chat-message"
import type { Emote } from "$lib/types/emote"
import { banWordReplacer } from "$lib/utils/ban-word-replacer"
import { emoteReplacer } from "$lib/utils/emote-replacer"
import { linkReplacer } from "$lib/utils/link-replacer"
import { writable } from "svelte/store"

export const chatStoreContextKey = 'chat-widget-store'

export type ChatStore = {
  userInfo: TwitchUserInfo
  settings: ChatSettings,
  emotes: Emote[]
  badges: TwitchBadge[]
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
          let linkFree = banWordFree;
          if (v.settings.hide.hideLinks) {
            linkFree = linkReplacer.replace(linkFree, v.settings.hide.linkReplacement);
          }
          const parsed = emoteReplacer.replace(linkFree, v.emotes).join(' ')
            
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
    },
    removeMessage(id: string) {
      update(v => ({...v, messages: v.messages.filter(m => m.id !== id)}))
    },
    removeMessagesOfUser(nickname: string) {
      update(v => ({...v, messages: v.messages.filter(m => m.nickname !== nickname)}))
    },
    clear() {
      update(v => ({...v, messages: []}))
    }
  }
}