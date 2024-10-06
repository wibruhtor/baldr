import type { Emote } from "../emote";
import { BttvEmoteFetcher } from "./bttv-emote-fetcher";
import { type IEmoteFetcher } from "./emote-fetcher.interface";
import { FfzEmoteFetcher } from "./ffz-emote-fetcher";
import { SeventvEmoteFetcher } from "./seventv-emote-fetcher";
import { TwitchEmoteFetcher } from "./twitch-emote-fetcher";

export class EmoteFetcher implements IEmoteFetcher {
  #twitch = new TwitchEmoteFetcher();
  #bttv = new BttvEmoteFetcher();
  #seventv = new SeventvEmoteFetcher();
  #ffz = new FfzEmoteFetcher();

  async fetchEmotes(channelId: string): Promise<Emote[]> {
    return this.fetchEmotesMap(fetcher => fetcher.fetchEmotes(channelId));
  }

  async fetchGlobalEmotes(): Promise<Emote[]> {
    return this.fetchEmotesMap(fetcher => fetcher.fetchGlobalEmotes());
  }
  
  async fetchChannelEmotes(channelId: string): Promise<Emote[]> {
    return this.fetchEmotesMap(fetcher => fetcher.fetchChannelEmotes(channelId));
  }

  private async fetchEmotesMap(fn: (fetcher: IEmoteFetcher) => Promise<Emote[]>): Promise<Emote[]> {
    const [
      twitchEmotes, 
      bttvEmotes,
      seventvEmotes,
      ffzEmotes,
    ] = await Promise.allSettled([
      fn(this.#twitch),
      fn(this.#bttv),
      fn(this.#seventv),
      fn(this.#ffz),
    ])

    const emotes: Emote[] = [];

    if (twitchEmotes.status === 'fulfilled') 
      emotes.push(...twitchEmotes.value);
    if (bttvEmotes.status === 'fulfilled') 
      emotes.push(...bttvEmotes.value);
    if (seventvEmotes.status === 'fulfilled') 
      emotes.push(...seventvEmotes.value);
    if (ffzEmotes.status === 'fulfilled') 
      emotes.push(...ffzEmotes.value);

    return emotes;
  }
}

export const emoteFetcher = new EmoteFetcher();