import { emoteUrl } from "../emote-url";
import type { Emote } from "./emote";

export class SeventvEmote implements Emote {
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
    return emoteUrl.seventv.cdn(this.id, 4, 'avif');
  }

  toObject(): Record<string, unknown> {
    return {
      source: 'seventv',
      channel: this.channel,
      id: this.id,
      name: this.name,
      raw: this.rawData,
    }
  }
}