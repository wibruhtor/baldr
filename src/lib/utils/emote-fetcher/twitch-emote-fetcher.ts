import { type Emote, TwitchEmote } from "../emote";
import { emoteUrl } from "../emote-url";
import { type IEmoteFetcher } from "./emote-fetcher.interface";

type RawTwitchEmote = {
	id: string;
	name: string;
};


export class TwitchEmoteFetcher implements IEmoteFetcher {
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
		const result = await fetch(emoteUrl.twitch.global).then((res) => res.json());
    if (!Array.isArray(result)) return [];

    const emotes = result.map(
      (emote: RawTwitchEmote) => new TwitchEmote(
        'global', 
        emote.id, 
        emote.name, 
        emote
      )
    );

    return emotes;
  }

  async fetchChannelEmotes(channelId: string): Promise<Emote[]> {
		const result = await fetch(emoteUrl.twitch.channel(channelId)).then((res) => res.json());
    if (!Array.isArray(result)) return [];

    const emotes = result.map(
      (emote: RawTwitchEmote) => new TwitchEmote(
        channelId, 
        emote.id, 
        emote.name, 
        emote
      )
    );

    return emotes;
  }
}