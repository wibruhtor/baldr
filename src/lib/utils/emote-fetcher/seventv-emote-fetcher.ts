import { type Emote, SeventvEmote } from "../emote";
import { emoteUrl } from "../emote-url";
import { type IEmoteFetcher } from "./emote-fetcher.interface";

type RawSeventvEmote = {
	id: string;
	name: string;
};

export class SeventvEmoteFetcher implements IEmoteFetcher {
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
		const result: {
      emotes: RawSeventvEmote[]
    } = await fetch(emoteUrl.seventv.global).then((res) => res.json());
    if (!Array.isArray(result.emotes)) return [];

    const emotes = result.emotes.map(
      (emote: RawSeventvEmote) => new SeventvEmote(
        'global', 
        emote.id, 
        emote.name, 
        emote
      )
    );

    return emotes;
  }

  async fetchChannelEmotes(channelId: string): Promise<Emote[]> {
		const result: {
      emote_set: {
        emotes: RawSeventvEmote[]
      }
    } = await fetch(emoteUrl.seventv.channel(channelId)).then((res) => res.json());
    if (!Array.isArray(result.emote_set.emotes)) return []
    return result.emote_set.emotes.map(
      (emote: RawSeventvEmote) => new SeventvEmote(
        channelId, 
        emote.id, 
        emote.name, 
        emote
      )
    );
  }
}