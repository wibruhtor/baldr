import { emoteUrl } from "../emote-url";
import type { Emote } from "./emote";

export class TwitchEmote implements Emote {
  readonly channel: string;
  readonly id: string;
  readonly name: string;
  readonly rawData: unknown;

  constructor(channel: string, id: string, name: string, rawData: unknown = undefined) {
    this.channel = channel;
    this.id = `${id}`;
    this.name = name;
    this.rawData = rawData;
  }

  toLink(): string {
    return emoteUrl.twitch.cdn(this.id, 4);
  }

  toObject(): Record<string, unknown> {
    return {
      source: 'twitch',
      channel: this.channel,
      id: this.id,
      name: this.name,
      raw: this.rawData,
    }
  }
}