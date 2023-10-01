<script lang="ts" context="module">
	import { numberToHex, numberToHsv, rgbaToNumber } from '$lib/utils/color-convertors';
	import { cn } from '$lib/utils/shadcn';
	import { colord } from 'colord';
</script>

<script lang="ts">
	let className: string | undefined = undefined;
	export { className as class };
	export let hue: number;
	export let saturation: number;
	export let value: number;
	export let pickerColor: string;

	let isPicking = false;
	let picker: HTMLElement;
	let circleX = saturation;
	let circleY = 100 - value;

	const handleChange = (e: MouseEvent) => {
		if (!isPicking) return;
		const bounding = picker.getBoundingClientRect();
		const shiftX = Math.max(0, Math.min(e.x - bounding.x, bounding.width));
		const shiftY = Math.max(0, Math.min(e.y - bounding.y, bounding.height));
		saturation = (shiftX / bounding.width) * 100;
		value = 100 - (shiftY / bounding.height) * 100;
		circleX = saturation;
		circleY = 100 - value;
	};

	const handleMouseDown = (e: MouseEvent) => {
		isPicking = true;
		handleChange(e);
	};
</script>

<svelte:window on:mousemove={handleChange} on:mouseup={() => (isPicking = false)} />

<button
	bind:this={picker}
	class={cn('aspect-video rounded-md border relative', className)}
	style={`background: linear-gradient(transparent, black), linear-gradient(to right, white, transparent); background-color: hsl(${hue}, 100%, 50%)`}
	on:mousedown={handleMouseDown}
>
	<div
		class="h-4 w-4 rounded-full border -translate-x-1/2 -translate-y-1/2 absolute"
		style={`background: ${pickerColor}; top: ${circleY}%; left: ${circleX}%`}
	/>
</button>
