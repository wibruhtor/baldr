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
	let circleX = (numberToHsv(color).h / 360) * 100;

	$: hex = numberToHex(color);
	$: hsv = numberToHsv(color);
	$: circleHex = colord({ ...hsv, s: 100, v: 100, a: 1 }).toHex();

	const handleChange = (e: MouseEvent) => {
		if (!isPicking) return;
		const bounding = picker.getBoundingClientRect();
		const shiftX = Math.max(0, Math.min(e.x - bounding.x, bounding.width));
		const hue = (shiftX / bounding.width) * 360;
		circleX = (shiftX / bounding.width) * 100;
		color = rgbaToNumber(colord({ ...hsv, h: hue }).toRgb());
	};

	const handleMouseDown = (e: MouseEvent) => {
		isPicking = true;
		handleChange(e);
	};
</script>

<svelte:window on:mousemove={handleChange} on:mouseup={() => (isPicking = false)} />

<button
	bind:this={picker}
	class={cn('h-4 w-full rounded-full border relative', className)}
	style="background: linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
	on:mousedown={handleMouseDown}
>
	<div
		class="h-4 w-4 rounded-full border -translate-x-1/2 -translate-y-1/2 absolute"
		style={`background: ${circleHex}; left: ${circleX}%`}
	/>
</button>
