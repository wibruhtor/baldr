<script lang="ts" context="module">
	import { numberToHex } from '$lib/utils/color-convertors';
	import ChatMessages from '$lib/components/widget/chat-widget/chat-messages.svelte';
	import type { ChatSettings, ChatType } from '$lib/types/api/entity/chat-settings';
	import { cn } from '$lib/utils/shadcn';
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	const reversedChatTypes: ChatType[] = [
		'default-reverse',
		'block-reverse',
		'alternative-block-reverse',
	];
</script>

<script lang="ts">
	export let settings: ChatSettings;
	let style = '';

	let isDefault = settings.chatType === 'default' || settings.chatType === 'default-reverse';
	let isReversed = reversedChatTypes.includes(settings.chatType);

	$: fontStyle = [
		`font-family: ${settings.font.fontFamily}${settings.font.fontFamily && ', '}Inter, sans-serif`,
		`font-size: ${settings.font.fontSize}vh`,
		'line-height: 1.5em',
		`font-weight: ${settings.font.textFontWeight}`,
	];
	$: colorStyle =
		settings.chatType === 'default' || settings.chatType === 'default-reverse'
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
	$: paddingStyle =
		settings.chatType === 'default' || settings.chatType === 'default-reverse'
			? [
					`padding-top:${settings.size.paddingTop}vh`,
					`padding-right:${settings.size.paddingRight}vh`,
					`padding-bottom:${settings.size.paddingBottom}vh`,
					`padding-left:${settings.size.paddingLeft}vh`,
			  ]
			: [];
	$: marginStyle = [
		`margin-top:${settings.size.marginTop}vh`,
		`margin-right:${settings.size.marginRight}vh`,
		`margin-bottom:${settings.size.marginBottom}vh`,
		`margin-left:${settings.size.marginLeft}vh`,
	];
	$: style = [...fontStyle, ...colorStyle, ...radiusStyle, ...paddingStyle, ...marginStyle].join(
		';',
	);
</script>

<div
	class={cn(
		'flex overflow-hidden',
		isDefault ? 'gap-[0.5vh]' : 'gap-[1vh]',
		isReversed ? 'flex-col-reverse' : 'flex-col',
	)}
	{style}
	transition:fade={{ duration: 200, easing: quintOut }}
>
	<ChatMessages />
</div>
