export type EmoteModifier = 
  | 'hidden'
  | 'flip-x'
  | 'flip-y'
  | 'grow-x'
  | 'rainbow'
  | 'red'
  | 'shake'
  | 'cursed'
  | 'jam'
  | 'bounce'
  | 'rotate-left'
  | 'rotate-right'
  | 'overlay';

export interface Emote {
  readonly channel: string;
  readonly id: string;
  readonly name: string;
  readonly isModifier: boolean;
  readonly modifiers: EmoteModifier[];
  readonly rawData: unknown;

  toLink(): string;

  toObject(): Record<string, unknown>;
}