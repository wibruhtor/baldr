import { BttvEmote, type Emote } from "../emote";
import { emoteUrl } from "../emote-url";
import { type IEmoteFetcher } from "./emote-fetcher.interface";

type RawBttvEmote = {
	id: string;
	code: string;
};

export class BttvEmoteFetcher implements IEmoteFetcher {
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
		const result = await fetch(emoteUrl.bttv.global).then((res) => res.json());
    if (!Array.isArray(result)) return [];

    const emotes = result.map(
      (emote: RawBttvEmote) => new BttvEmote(
        'global', 
        emote.id, 
        emote.code, 
        emote
      )
    );

    return emotes;
  }

  async fetchChannelEmotes(channelId: string): Promise<Emote[]> {
		const result: {
      channelEmotes: RawBttvEmote[];
      sharedEmotes: RawBttvEmote[]
    } = await fetch(emoteUrl.bttv.channel(channelId)).then((res) => res.json());
    const emotes: Emote[] = []
    if (Array.isArray(result.channelEmotes)) {
      result.channelEmotes.forEach(
        (emote: RawBttvEmote) => emotes.push(
          new BttvEmote(
            channelId, 
            emote.id, 
            emote.code, 
            emote
          )
        )
      );
    }
    if (Array.isArray(result.sharedEmotes)) {
      result.sharedEmotes.forEach(
        (emote: RawBttvEmote) => emotes.push(
          new BttvEmote(
            channelId, 
            emote.id, 
            emote.code, 
            emote
          )
        )
      );
    }

    return emotes;
  }
}