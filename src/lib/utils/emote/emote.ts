export interface Emote {
  readonly channel: string;
  readonly id: string;
  readonly name: string;
  readonly rawData: unknown;

  toLink(): string;

  toObject(): Record<string, unknown>;
}