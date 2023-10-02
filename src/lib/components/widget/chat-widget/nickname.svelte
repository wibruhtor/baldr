<script lang="ts" context="module">
	import type { ChatSettings } from '$lib/types/api/entity/chat-settings';
	import type { ChatMessage } from '$lib/types/chat/chat-message';
	import { numberToHex } from '$lib/utils/color-convertors';
	import { colord } from 'colord';
</script>

<script lang="ts">
	export let nickname: string;
	export let color: string | null;
	export let settings: ChatSettings;

	$: customColor = settings.color.customNicknames.find(
		(v) => v.nickname.toLowerCase() === nickname.toLowerCase(),
	);

	let nicknameColor = color;
	$: {
		if (customColor) {
			nicknameColor = `linear-gradient(to right, ${numberToHex(
				customColor.startColor,
			)}, ${numberToHex(customColor.endColor)})`;
		} else if (settings.color.gradientOnlyForCustomNicknames) {
			nicknameColor = color || numberToHex(settings.color.nicknameColor);
		} else {
			let startColor = color || numberToHex(settings.color.nicknameColor);
			const endColor = colord(startColor).lighten(0.1).toHex();
			startColor = colord(startColor).darken(0.1).toHex();
			nicknameColor = `linear-gradient(to right, ${startColor}, ${endColor})`;
		}
	}
</script>

<span
	class="decoration-clone whitespace-normal"
	style={`color: transparent; background: ${nicknameColor}; background-clip: text; font-weight: ${settings.font.nicknameFontWeight}`}
	>{nickname}</span
>
