
export const emoteUrl = {
  twitch: {
    global: 'https://wibruhtor-api.bruhabruh.ru/v1/twitch/emotes/global',
    channel: (id: string) => `https://wibruhtor-api.bruhabruh.ru/v1/twitch/emotes/${id}`,
    cdn: (id: string, size: number) => `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/${size}.0`
  },
  bttv: {
    global: 'https://api.betterttv.net/3/cached/emotes/global',
    channel: (id: string) => `https://api.betterttv.net/3/cached/users/twitch/${id}`,
    cdn: (id: string, size: number) => `https://cdn.betterttv.net/emote/${id}/${size}x.webp`
  },
  seventv: {
    global: 'https://7tv.io/v3/emote-sets/global',
    channel: (id: string) => `https://7tv.io/v3/users/twitch/${id}`,
    cdn: (id: string, size: number, format: 'avif' | 'webp') => `https://cdn.7tv.app/emote/${id}/${size}x.${format}`
  },
  ffz: {
    sets: {
      Global: 3,
      Modifier: 1532818
    },
    set: (id: string | number) => `https://api.frankerfacez.com/v1/set/${id}`,
    channel: (id: string) => `https://api.frankerfacez.com/v1/room/id/${id}`,
    cdn: (id: string, size: number) => `https://cdn.frankerfacez.com/emote/${id}/${size}`,
    cdnAnimated: (id: string, size: number) => `https://cdn.frankerfacez.com/emote/${id}/animated/${size}.webp`
  }
}
