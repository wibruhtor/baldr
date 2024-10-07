import { emoteUrl } from "../emote-url";
import type { Emote, EmoteModifier } from "./emote";

export class SeventvEmote implements Emote {
  readonly channel: string;
  readonly id: string;
  readonly name: string;
  readonly modifiers: EmoteModifier[];
  readonly rawData: unknown;
  
  get isModifier(): boolean {
    return this.modifiers.length > 0
  }

  constructor(
    channel: string, 
    id: string, 
    name: string,
    rawData: unknown = undefined
  ) {
    this.channel = channel;
    this.id = `${id}`;
    this.name = name;
    this.modifiers = []
    if (
      typeof rawData === "object" 
      && !Array.isArray(rawData) 
      && rawData
      && 'flags' in rawData
      && 'data' in rawData
      && typeof rawData.flags === 'number'
      && typeof rawData.data === 'object'
      && rawData.data
      && 'flags' in rawData.data
      && typeof rawData.data.flags === 'number'
    ) {
      const possibleModifiers: (EmoteModifier | 0)[] = [
        rawData.flags & 0x1 << 0 && rawData.data.flags & 0x1 << 8 && 'overlay'
      ];
      this.modifiers = possibleModifiers.filter(v => v !== 0)
    }
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