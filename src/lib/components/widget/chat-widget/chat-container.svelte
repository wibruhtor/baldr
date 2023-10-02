<script lang="ts" context="module">
	import { numberToHex } from '$lib/utils/color-convertors';
	import ChatMessages from '$lib/components/widget/chat-widget/chat-messages.svelte';
	import type { ChatSettings } from '$lib/types/api/entity/chat-settings';
</script>

<script lang="ts">
	export let settings: ChatSettings;
	let style = '';

	$: fontStyle = [
		`font-family: ${settings.font.fontFamily}${settings.font.fontFamily && ', '}Inter, sans-serif`,
		`font-size: ${settings.font.fontSize}vh`,
		'line-height: 1.5em',
		`font-weight: ${settings.font.textFontWeight}`,
	];
	$: colorStyle =
		settings.chatType === 'default'
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
	$: paddingStyle = [
		`padding-top:${settings.size.paddingTop}vh`,
		`padding-right:${settings.size.paddingRight}vh`,
		`padding-bottom:${settings.size.paddingBottom}vh`,
		`padding-left:${settings.size.paddingLeft}vh`,
	];
	$: marginStyle = [
		`top:${settings.size.marginTop}vh`,
		`right:${settings.size.marginRight}vh`,
		`bottom:${settings.size.marginBottom}vh`,
		`left:${settings.size.marginLeft}vh`,
	];
	$: style = [...fontStyle, ...colorStyle, ...radiusStyle, ...paddingStyle, ...marginStyle].join(
		';',
	);
</script>

<div class="fixed flex flex-col gap-[0.5vh]" {style}>
	<ChatMessages />
</div>
