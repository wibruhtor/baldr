<script lang="ts" context="module">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Popover } from '$lib/components/ui/popover';
	import { PopoverTrigger } from '$lib/components/ui/popover';
	import PopoverContent from '$lib/components/ui/popover/popover-content.svelte';
	import { numberToHex, numberToHsv, rgbaToNumber } from '$lib/utils/color-convertors';
	import AlphaPicker from '$lib/components/ui/color-picker/alpha-picker.svelte';
	import HuePicker from '$lib/components/ui/color-picker/hue-picker.svelte';
	import Picker from '$lib/components/ui/color-picker/picker.svelte';
	import { colord } from 'colord';
</script>

<script lang="ts">
	let className: string | undefined = undefined;
	export { className as class };
	export let color: number;
	export let placement:
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'right'
		| 'right-start'
		| 'right-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'left'
		| 'left-start'
		| 'left-end' = 'bottom-start';
	let hsv = numberToHsv(color);
	let hue = hsv.h;
	let saturation = hsv.s;
	let value = hsv.v;
	let alpha = hsv.a;

	$: hex = numberToHex(color);
	$: color = rgbaToNumber(colord({ h: hue, s: saturation, v: value, a: alpha }).toRgb());
	$: pickerColor = colord({ h: hue, s: saturation, v: value, a: 1 }).toHex();
	$: circleColor = colord({ h: hue, s: 100, v: 100, a: 1 }).toHex();
</script>

<Popover positioning={{ placement }}>
	<PopoverTrigger class={className} asChild let:builder>
		<Button builders={[builder]} size="icon" variant="outline">
			<div class="w-4 h-4 rounded-full border" style={`background: ${hex}`} />
		</Button>
	</PopoverTrigger>
	<PopoverContent class="grid grid-cols-1 gap-2">
		<Picker bind:saturation bind:value {hue} {pickerColor} />
		<HuePicker bind:hue {circleColor} />
		<AlphaPicker bind:alpha {circleColor} />
	</PopoverContent>
</Popover>
