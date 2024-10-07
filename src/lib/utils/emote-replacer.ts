import { BttvEmote, type Emote } from "./emote";

class EmoteReplacer {
	#twitchEmoteRegExp = /^:(.+?):$/g

	#overlayTemplate = `<img class="emote__overlay" src="{link}" alt="{name}"/>`

	#emoteTemplate = `<figure class="emote{class}">
  <img src="{link}" alt="{name}"/>
  {target}
</figure>
`

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
		return value.split(' ').map((v) => v.trim());
	}

	private replaceEmotes(value: string[], emotes: Emote[]) {
		const result: string[] = [];

		for (let i = 0; i < value.length; i++) {
			const part = value[i];
			const emote = emotes.find((e) => e.name === part);
			if (!emote) {
				result.push(part);
				continue
			}
			const nextEmote = emotes.find((e) => e.name === value[i + 1]);

			let emoteAsHtml = this.#emoteTemplate

			if (emote.isModifier && emote instanceof BttvEmote && nextEmote) {
				if (!nextEmote.isModifier)
					i += 1;
			
				let target = '';
				if (nextEmote.modifiers.includes('overlay')) {
					target = this.#overlayTemplate
						.replaceAll('{link}', nextEmote.toLink())
						.replaceAll('{name}', nextEmote.name);
				}

				emoteAsHtml = emoteAsHtml.replaceAll('{id}', nextEmote.id)
					.replaceAll('{name}', nextEmote.name)
					.replaceAll('{link}', nextEmote.toLink())
					.replaceAll('{class}', this.modifiersAsClass(emote))
					.replaceAll('{target}', target);
			} else {
				if (nextEmote && nextEmote.isModifier)
					i += 1;

				let target = '';
				if (nextEmote && nextEmote.modifiers.includes('overlay')) {
					target = this.#overlayTemplate
						.replaceAll('{link}', nextEmote.toLink())
						.replaceAll('{name}', nextEmote.name);
				}
				
				emoteAsHtml = emoteAsHtml.replaceAll('{id}', emote.id)
					.replaceAll('{name}', emote.name)
					.replaceAll('{link}', emote.toLink())
					.replaceAll('{class}', this.modifiersAsClass(nextEmote))
					.replaceAll('{target}', target);
			}

			result.push(emoteAsHtml);
		}

		return result;
	}

	private modifiersAsClass(emote: Emote | undefined) {
		if (!emote || !emote.isModifier) return '';
		const modifiers = Array.from(new Set(emote.modifiers));
		return ` ${modifiers.map(m => `emote--${m}`).join(' ')}`
	}
}

export const emoteReplacer = new EmoteReplacer();
