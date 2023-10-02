
export type Emote = {
  name: string,
  image: string
}

export type TwitchEmote = {
  id: string,
  name: string,
  image: string
}

export type SevenTvEmote = {
  id: string,
  name: string,
  urls: [string, string][]
}

export type BetterTtvEmote = {
  id: string,
  code: string,
}

export type FrankerFaceZEmote = {
  id: number,
  name: string,
  urls: Record<string, string>
}