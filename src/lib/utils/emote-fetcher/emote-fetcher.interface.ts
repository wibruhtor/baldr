import { type Emote } from "../emote";

export interface IEmoteFetcher {
  fetchEmotes(channelId: string): Promise<Emote[]>;

  fetchGlobalEmotes(): Promise<Emote[]>;

  fetchChannelEmotes(channelId: string): Promise<Emote[]>;
}