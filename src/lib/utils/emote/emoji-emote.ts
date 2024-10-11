import { emoteUrl } from "../emote-url";
import type { Emote, EmoteModifier } from "./emote";

export class EmojiEmote implements Emote {
  readonly channel: string;
  readonly id: string;
  readonly name: string;
  readonly modifiers: EmoteModifier[];
  readonly rawData: unknown;
  
  get isModifier(): boolean {
    return this.modifiers.length > 0
  }

  constructor(
    id: string, 
    name: string,
  ) {
    this.channel = 'emoji';
    this.id = `${id}`;
    this.name = name;
    this.modifiers = []
    this.rawData = undefined;
  }

  toLink(): string {
    return emoteUrl.emoji.cdn(this.id);
  }

  toObject(): Record<string, unknown> {
    return {
      source: 'emoji',
      channel: this.channel,
      id: this.id,
      name: this.name,
      raw: this.rawData,
    }
  }
}