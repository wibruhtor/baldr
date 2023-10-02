import type { Emote } from "$lib/types/emote";

export const replaceEmotes = (value: string, emotes: Emote[]) => {
  const sanitized = value.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const split = sanitized.split(' ').map(v => v.trim())
  const emoteNames = emotes.map(v => v.name);
  
  return split.map(v => {
    if (!emoteNames.includes(v)) return v
    return replaceEmote(v, emotes)
  }).filter(Boolean)
}

const replaceEmote = (value: string, emotes: Emote[]) => {
  const emote = emotes.find(v => v.name === value);
  if (!emote) return null
  return `<img class="emote" src="${emote.image}" alt="${emote.name}"/>`
}