<script lang="ts" context="module">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Popover } from '$lib/components/ui/popover';
	import { PopoverTrigger } from '$lib/components/ui/popover';
	import PopoverContent from '$lib/components/ui/popover/popover-content.svelte';
	import { numberToHex } from '$lib/utils/color-convertors';
	import AlphaPicker from '$lib/components/ui/color-picker/alpha-picker.svelte';
	import HuePicker from '$lib/components/ui/color-picker/hue-picker.svelte';
	import Picker from '$lib/components/ui/color-picker/picker.svelte';
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

	$: hex = numberToHex(color);
</script>

<Popover positioning={{ placement }}>
	<PopoverTrigger class={className} asChild let:builder>
		<Button builders={[builder]} size="icon" variant="outline">
			<div class="w-4 h-4 rounded-full border" style={`background: ${hex}`} />
		</Button>
	</PopoverTrigger>
	<PopoverContent class="grid grid-cols-1 gap-2">
		<Picker bind:color />
		<HuePicker bind:color />
		<AlphaPicker bind:color />
	</PopoverContent>
</Popover>
