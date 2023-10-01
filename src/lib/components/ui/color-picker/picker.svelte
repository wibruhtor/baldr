<script lang="ts" context="module">
	import { numberToHex, numberToHsv, rgbaToNumber } from '$lib/utils/color-convertors';
	import { cn } from '$lib/utils/shadcn';
	import { colord } from 'colord';
</script>

<script lang="ts">
	let className: string | undefined = undefined;
	export { className as class };
	export let color: number;

	let isPicking = false;
	let picker: HTMLElement;
	let circleX = 50;
	let circleY = 50;

	$: hsv = numberToHsv(color);
	$: hex = colord(hsv).toHex();

	const handleChange = (e: MouseEvent) => {
		if (!isPicking) return;
		const bounding = picker.getBoundingClientRect();
		const shiftX = Math.max(0, Math.min(e.x - bounding.x, bounding.width));
		const shiftY = Math.max(0, Math.min(e.y - bounding.y, bounding.height));
		const saturation = (shiftX / bounding.width) * 100;
		const value = (shiftY / bounding.height) * 100;
		circleX = saturation;
		circleY = value;
		color = rgbaToNumber(colord({ ...hsv, s: saturation, v: 100 - value }).toRgb());
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
	style={`background: linear-gradient(transparent, black), linear-gradient(to right, white, transparent); background-color: hsl(${hsv.h}, 100%, 50%)`}
	on:mousedown={handleMouseDown}
>
	<div
		class="h-4 w-4 rounded-full border -translate-x-1/2 -translate-y-1/2 absolute"
		style={`background: ${hex}; top: ${circleY}%; left: ${circleX}%`}
	/>
</button>
