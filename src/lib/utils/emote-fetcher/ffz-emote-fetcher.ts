import { type Emote, FfzEmote } from "../emote";
import { emoteUrl } from "../emote-url";
import { type IEmoteFetcher } from "./emote-fetcher.interface";

type RawFfzEmote = {
  id: string,
  name: string
};

export class FfzEmoteFetcher implements IEmoteFetcher {
  async fetchEmotes(channelId: string): Promise<Emote[]> {
    const [globalEmotes, channelEmotes] = await Promise.allSettled([
      this.fetchGlobalEmotes(),
      this.fetchChannelEmotes(channelId),
    ])

    const emotes: Emote[] = [];

    if (globalEmotes.status === 'fulfilled')
      emotes.push(...globalEmotes.value)
    if (channelEmotes.status === 'fulfilled')
      emotes.push(...channelEmotes.value);

    return emotes;
  }

  async fetchGlobalEmotes(): Promise<Emote[]> {
    const [globalEmotes, modifierEmotes] = await Promise.allSettled([
      this.fetchGlobalEmotesSet(emoteUrl.ffz.sets.Global),
      this.fetchGlobalEmotesSet(emoteUrl.ffz.sets.Modifier),
    ])

    const emotes: Emote[] = [];

    if (globalEmotes.status === 'fulfilled')
      emotes.push(...globalEmotes.value)
    if (modifierEmotes.status === 'fulfilled')
      emotes.push(...modifierEmotes.value);

    return emotes;
  }

  async fetchChannelEmotes(channelId: string): Promise<Emote[]> {
		const result: {
      sets: Record<string, {
        emoticons: RawFfzEmote[]
      }>
    } = await fetch(emoteUrl.ffz.channel(channelId)).then((res) => res.json());
    const emoticons = Object.values(result.sets).flatMap(set => set.emoticons);
    if (!Array.isArray(emoticons)) return [];

    const emotes = emoticons.map(
      (emote: RawFfzEmote) => new FfzEmote(
        channelId, 
        emote.id, 
        emote.name, 
        emote
      )
    );

    return emotes;
  }

  private async fetchGlobalEmotesSet(set: string | number): Promise<Emote[]> {
		const result: {
      set: {
        emoticons: RawFfzEmote[]
      }
    } = await fetch(emoteUrl.ffz.set(set)).then((res) => res.json());
    if (!Array.isArray(result.set.emoticons)) return [];

    const emotes = result.set.emoticons.map(
      (emote: RawFfzEmote) => new FfzEmote(
        'global', 
        emote.id, 
        emote.name, 
        emote
      )
    );

    return emotes;
  }
}