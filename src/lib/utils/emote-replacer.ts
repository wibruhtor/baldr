import type { Emote } from "$lib/types/emote";

class EmoteReplacer {
  replace(value: string, emotes: Emote[] = []) {
    const sanitized = this.sanitize(value);
    const split = this.split(sanitized);
    const replaced = this.replaceEmotes(split, emotes);
    return replaced.filter(Boolean) as string[];
  }

  private sanitize(value: string) {
    return value.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  private split(value: string) {
    return value.split(' ').map(v => v.trim())
  }

  private replaceEmotes(value: string[], emotes: Emote[]) {
    const emoteNames = emotes.map(v => this.sanitize(v.name));
    return value.map(v => {
      if (!emoteNames.includes(v)) return v
      const emote = emotes.find(e => this.sanitize(e.name) === v);
      if (!emote) return null
      return `<img class="emote" src="${emote.image}" alt="${emote.name}"/>`
    })
  }
}

export const emoteReplacer = new EmoteReplacer()
