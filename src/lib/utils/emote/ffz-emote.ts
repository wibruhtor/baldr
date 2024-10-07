import { emoteUrl } from "../emote-url";
import type { Emote, EmoteModifier } from "./emote";

export class FfzEmote implements Emote {
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
      && 'modifier_flags' in rawData
      && typeof rawData.modifier_flags === 'number'
    ) {
      const possibleModifiers: (EmoteModifier | 0)[] = [
        (rawData.modifier_flags & 0x1 << 0) && 'hidden',
        (rawData.modifier_flags & 0x1 << 1) && 'flip-x',
        (rawData.modifier_flags & 0x1 << 2) && 'flip-y',
        (rawData.modifier_flags & 0x1 << 3) && 'grow-x',
        (rawData.modifier_flags & 0x1 << 11) && 'rainbow',
        (rawData.modifier_flags & 0x1 << 12) && 'red',
        (rawData.modifier_flags & 0x1 << 13) && 'shake',
        (rawData.modifier_flags & 0x1 << 14) && 'cursed',
        (rawData.modifier_flags & 0x1 << 15) && 'jam',
        (rawData.modifier_flags & 0x1 << 16) && 'bounce',
      ];
      this.modifiers = possibleModifiers.filter(v => v !== 0)
    }
    this.rawData = rawData;
  }

  toLink(): string {
    return emoteUrl.ffz.cdn(this.id, 4);
  }

  toObject(): Record<string, unknown> {
    return {
      source: 'ffz',
      channel: this.channel,
      id: this.id,
      name: this.name,
      raw: this.rawData,
    }
  }
}