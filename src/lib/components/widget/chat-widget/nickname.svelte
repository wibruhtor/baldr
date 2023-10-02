<script lang="ts" context="module">
	import { chatStore } from '$lib/components/widget/chat-widget/chat-store';
	import type { ChatSettings } from '$lib/types/api/entity/chat-settings';
	import type { ChatMessage } from '$lib/types/chat/chat-message';
	import { numberToHex } from '$lib/utils/color-convertors';
	import { colord } from 'colord';
</script>

<script lang="ts">
	export let nickname: string;
	export let color: string | null;

	$: customColor = ($chatStore.settings as ChatSettings).color.customNicknames.find(
		(v) => v.nickname.toLowerCase() === nickname.toLowerCase(),
	);

	let nicknameColor = color;
	$: {
		if (customColor) {
			nicknameColor = `linear-gradient(to right, ${numberToHex(
				customColor.startColor,
			)}, ${numberToHex(customColor.endColor)})`;
		} else if (($chatStore.settings as ChatSettings).color.gradientOnlyForCustomNicknames) {
			nicknameColor =
				color || numberToHex(($chatStore.settings as ChatSettings).color.nicknameColor);
		} else {
			const startColor =
				color || numberToHex(($chatStore.settings as ChatSettings).color.nicknameColor);
			const endColor = colord(startColor).lighten(0.1).toHex();
			nicknameColor = `linear-gradient(to right, ${startColor}, ${endColor})`;
		}
	}
</script>

<span
	class="decoration-clone whitespace-normal"
	style={`color: transparent; background: ${nicknameColor}; background-clip: text; font-weight: ${$chatStore.settings?.font.nicknameFontWeight}`}
	>{nickname}</span
>
