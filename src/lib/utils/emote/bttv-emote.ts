import { emoteUrl } from "../emote-url";
import type { Emote, EmoteModifier } from "./emote";

export class BttvEmote implements Emote {
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
    const possibleModifiers: (EmoteModifier | false)[] = [
      name === 'c!' && 'cursed',
      name === 'h!' && 'flip-x',
      name === 'v!' && 'flip-y',
      name === 'w!' && 'grow-x',
      name === 'l!' && 'rotate-left',
      name === 'r!' && 'rotate-right',
      name === 'p!' && 'rainbow',
      name === 's!' && 'shake',
    ];
    this.modifiers = possibleModifiers.filter(v => !!v)
    this.rawData = rawData;
  }

  toLink(): string {
    return emoteUrl.bttv.cdn(this.id, 3);
  }

  toObject(): Record<string, unknown> {
    return {
      source: 'bttv',
      channel: this.channel,
      id: this.id,
      name: this.name,
      raw: this.rawData,
    }
  }
}