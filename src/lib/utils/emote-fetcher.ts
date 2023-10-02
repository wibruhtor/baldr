import type { BetterTtvEmote, Emote, FrankerFaceZEmote, SevenTvEmote, TwitchEmote } from "$lib/types/emote"
import { wetch } from "$lib/utils/wetch"

type EmoteRecord = {
  twitch: {
    global: TwitchEmote[],
    channel: TwitchEmote[]
  },
  seventv: {
    global: SevenTvEmote[],
    channel: SevenTvEmote[]
  },
  betterttv: {
    global: BetterTtvEmote[],
    channel: BetterTtvEmote[]
  },
  frankerfacez: {
    global: FrankerFaceZEmote[],
    channel: FrankerFaceZEmote[]
  }
};
const initialEmotes: Emote[] = []
const initialEmote: EmoteRecord = {
  twitch: {
    global: [],
    channel: []
  },
  seventv: {
    global: [],
    channel: []
  },
  betterttv: {
    global: [],
    channel: []
  },
  frankerfacez: {
    global: [],
    channel: []
  }
}

class EmoteFetcher {
  private emotes = initialEmotes;
  private emote = initialEmote
  
  getEmotes(): Emote[] {
    return this.emotes;
  }

  getEmoteRecord(): EmoteRecord {
    return this.emote;
  }

  async fetch(channelId: string): Promise<Emote[]> {
    const [
      twitchGlobal,
      twitchChannel,
      sevenTvGlobal,
      sevenTvChannel,
      betterTtvGlobal,
      betterTtvChannel,
      frankerFaceZGlobal,
      frankerFaceZChannel
    ] = await Promise.allSettled([
      this.fetchTwitchGlobal(),
      this.fetchTwitchChannel(channelId),
      this.fetchSevenTvGlobal(),
      this.fetchSevenTvChannel(channelId),
      this.fetchBetterTtvGlobal(),
      this.fetchBetterTtvChannel(channelId),
      this.fetchFrankerFaceZGlobal(),
      this.fetchFrankerFaceZChannel(channelId)
    ])

    this.emotes = initialEmotes
    this.emote = initialEmote
    if (twitchGlobal.status === "fulfilled") {
      this.emote.twitch.global = twitchGlobal.value
      this.emotes.push(...twitchGlobal.value)
    } else {
      console.error("Fail load twitch global emotes", twitchGlobal.reason)
    }
    if (twitchChannel.status === "fulfilled") {
      this.emote.twitch.channel = twitchChannel.value
      this.emotes.push(...twitchChannel.value)
    } else {
      console.error("Fail load twitch channel emotes", twitchChannel.reason)
    }
    if (sevenTvGlobal.status === 'fulfilled') {
      this.emote.seventv.global = sevenTvGlobal.value
      this.emotes.push(...sevenTvGlobal.value.map(v => {
        const imageUrls: Record<string, string> = {}
        v.urls.forEach(v => imageUrls[v[0]] = v[1])
        const max = Math.max(...Object.keys(imageUrls).map((v) => Number.parseInt(v))).toString()
        return {
          id: v.id,
          name: v.name,
          image: imageUrls[max]
        }
      }))
    } else {
      console.error("Fail load seventv global emotes", sevenTvGlobal.reason)
    }
    if (sevenTvChannel.status === 'fulfilled') {
      this.emote.seventv.channel = sevenTvChannel.value
      this.emotes.push(...sevenTvChannel.value.map(v => {
        const imageUrls: Record<string, string> = {}
        v.urls.forEach(v => imageUrls[v[0]] = v[1])
        const max = Math.max(...Object.keys(imageUrls).map((v) => Number.parseInt(v))).toString()
        return {
          id: v.id,
          name: v.name,
          image: imageUrls[max]
        }
      }))
    } else {
      console.error("Fail load seventv channel emotes", sevenTvChannel.reason)
    }
    if (betterTtvGlobal.status === 'fulfilled') {
      this.emote.betterttv.global = betterTtvGlobal.value
      this.emotes.push(...betterTtvGlobal.value.map(v => {
        return {
          id: v.id,
          name: v.code,
          image: 'https://cdn.betterttv.net/emote/'+v.id+'/3x.webp'
        }
      }))
    } else {
      console.error("Fail load betterttv global emotes", betterTtvGlobal.reason)
    }
    if (betterTtvChannel.status === 'fulfilled') {
      this.emote.betterttv.channel = betterTtvChannel.value
      this.emotes.push(
        ...betterTtvChannel.value.map(v => {
          return {
            id: v.id,
            name: v.code,
            image: 'https://cdn.betterttv.net/emote/'+v.id+'/3x.webp'
          }
        })
      )
    } else {
      console.error("Fail load betterttv channel emotes", betterTtvChannel.reason)
    }
    if (frankerFaceZGlobal.status === 'fulfilled') {
      this.emote.frankerfacez.global = frankerFaceZGlobal.value
      this.emotes.push(
        ...frankerFaceZGlobal.value.map(v => {
          const max = Math.max(...Object.keys(v.urls).map((v) => Number.parseInt(v))).toString()
          return {
            id: v.id,
            name: v.name,
            image: v.urls[max]
          }
        })
      )
    } else {
      console.error("Fail load frankerfacez global emotes", frankerFaceZGlobal.reason)
    }
    if (frankerFaceZChannel.status === 'fulfilled') {
      this.emote.frankerfacez.channel = frankerFaceZChannel.value
      this.emotes.push(
        ...frankerFaceZChannel.value.map(v => {
          const max = Math.max(...Object.keys(v.urls).map((v) => Number.parseInt(v))).toString()
          return {
            id: v.id,
            name: v.name,
            image: v.urls[max]
          }
        })
      )
    } else {
      console.error("Fail load frankerfacez channel emotes", frankerFaceZChannel.reason)
    }

    return this.emotes
  }

  async fetchTwitchGlobal(): Promise<TwitchEmote[]> {
    return wetch<TwitchEmote[]>('/v1/twitch/emotes/global')
  }

  async fetchTwitchChannel(channelId: string): Promise<TwitchEmote[]> {
    return wetch<TwitchEmote[]>('/v1/twitch/emotes/'+channelId)
  }

  async fetchSevenTvGlobal(): Promise<SevenTvEmote[]> {
    return wetch<SevenTvEmote[]>('/emotes/global', undefined, 'https://7tv.io/v2')
  }

  async fetchSevenTvChannel(channelId: string): Promise<SevenTvEmote[]> {
    return wetch<SevenTvEmote[]>('/users/'+channelId+'/emotes', undefined, 'https://7tv.io/v2')
  }

  async fetchBetterTtvGlobal(): Promise<BetterTtvEmote[]> {
    return wetch<BetterTtvEmote[]>('/cached/emotes/global', undefined, 'https://api.betterttv.net/3')
  }

  async fetchBetterTtvChannel(channelId: string): Promise<BetterTtvEmote[]> {
    return wetch<FetchBetterTTVChannelResponse>('/cached/users/twitch/'+channelId, undefined, 'https://api.betterttv.net/3')
        .then(v => [...v.channelEmotes, ...v.sharedEmotes])
  }

  async fetchFrankerFaceZGlobal(): Promise<FrankerFaceZEmote[]> {
    return wetch<FetchFrankerFaceZGlobalResponse>('/set/3', undefined, 'https://api.frankerfacez.com/v1')
      .then(v => v.set.emoticons)
  }

  async fetchFrankerFaceZChannel(channelId: string): Promise<FrankerFaceZEmote[]> {
    return wetch<FetchFrankerFaceZChannelResponse>('/room/id/'+channelId, undefined, 'https://api.frankerfacez.com/v1')
      .then(v => {
        const emotes: FrankerFaceZEmote[] = []
        Object.keys(v.sets).forEach(key => emotes.push(...v.sets[key].emoticons))
        return emotes
      })
  }
}

type FetchBetterTTVChannelResponse = {
  channelEmotes: BetterTtvEmote[]
  sharedEmotes: BetterTtvEmote[]
}

type FetchFrankerFaceZGlobalResponse = {
  set: {
    emoticons: FrankerFaceZEmote[]
  }
}

type FetchFrankerFaceZChannelResponse = {
  sets: Record<string, {emoticons: FrankerFaceZEmote[]}>
}

export const emoteFetcher = new EmoteFetcher()