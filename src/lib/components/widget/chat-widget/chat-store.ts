import type { ChatSettings } from "$lib/types/api/entity/chat-settings"
import type { TwitchUserInfo } from "$lib/types/api/entity/twitch-user-info"
import type { ChatMessage } from "$lib/types/chat/chat-message"
import type { Emote } from "$lib/types/emote"
import { writable } from "svelte/store"


export type ChatStore = {
  userInfo: TwitchUserInfo | null
  settings: ChatSettings | null,
  emotes: Emote[]
  messages: ChatMessage[]
  banWords: string[]
}

const createChatStore = (initialState: ChatStore) => {
  const { subscribe, update } = writable(initialState)

  return {
    subscribe,
    setUserInfo(userInfo: TwitchUserInfo) {
      update(v => ({...v, userInfo}))
    },
    setChatSettings(chatSettings: ChatSettings) {
      update(v => ({...v, settings: chatSettings}))
    },
    setEmotes(emotes: Emote[]) {
      update(v => ({...v, emotes}))
    },
    setBanWords(banWords: string[]) {
      update(v => ({...v, banWords}))
    },
    addMessage(message: ChatMessage) {
        update(v => {
          if (v.settings && message.text.startsWith(v.settings.hide.hideMessagePattern)) return v
          if (v.settings && v.settings.hide.nicknames.map(v => v.toLowerCase()).includes(message.nickname.toLowerCase())) return v
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

export const chatStore = createChatStore({
  userInfo: null, 
  settings: null, 
  emotes: [],
  messages: [],
  banWords: []
})