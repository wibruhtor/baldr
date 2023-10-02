<script lang="ts" context="module">
	import type { ChatSettings } from '$lib/types/api/entity/chat-settings';
	import type { ChatMessage } from '$lib/types/chat/chat-message';
	import Nickname from '$lib/components/widget/chat-widget/nickname.svelte';
	import Text from '$lib/components/widget/chat-widget/text.svelte';
	import { numberToHex } from '$lib/utils/color-convertors';
</script>

<script lang="ts">
	export let chatMessage: ChatMessage;
	export let settings: ChatSettings;

	$: isColumn =
		settings.chatType === 'alternative-block' || settings.chatType === 'alternative-block-reverse';

	$: paddingStyle =
		settings.chatType !== 'default' && settings.chatType !== 'default-reverse'
			? [
					`padding-top:${settings.size.paddingTop}vh`,
					`padding-right:${settings.size.paddingRight}vh`,
					`padding-bottom:${settings.size.paddingBottom}vh`,
					`padding-left:${settings.size.paddingLeft}vh`,
			  ]
			: [];
	$: colorStyle =
		settings.chatType !== 'default' && settings.chatType !== 'default-reverse'
			? [
					`color:${numberToHex(settings.color.textColor)}`,
					`background-color:${numberToHex(settings.color.backgroundColor)}`,
			  ]
			: [];
	$: radiusStyle = [
		`border-top-left-radius:${settings.size.borderTopLeftRadius}vh`,
		`border-top-right-radius:${settings.size.borderTopRightRadius}vh`,
		`border-bottom-left-radius:${settings.size.borderBottomLeftRadius}vh`,
		`border-bottom-right-radius:${settings.size.borderBottomRightRadius}vh`,
	];

	$: style = [...paddingStyle, ...colorStyle, ...radiusStyle].join(';');
</script>

<p class={isColumn ? 'flex flex-col' : undefined} {style}>
	<Nickname {settings} nickname={chatMessage.nickname} color={chatMessage.color} /><Text
		text={chatMessage.text}
	/>
</p>
