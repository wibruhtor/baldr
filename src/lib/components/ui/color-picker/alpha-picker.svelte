<script lang="ts" context="module">
	import { cn } from '$lib/utils/shadcn';
	import { colord } from 'colord';
</script>

<script lang="ts">
	let className: string | undefined = undefined;
	export { className as class };
	export let alpha: number;
	export let circleColor: string;

	let isPicking = false;
	let picker: HTMLElement;
	let circleX = alpha * 100;

	$: pickerHex = colord({ ...colord(circleColor).toRgb(), a: 1 }).toHex();
	$: {
		const result = colord({ ...colord(circleColor).toRgb(), a: alpha }).toHex();
		if (result !== circleColor) {
			circleColor = result;
		}
	}

	const handleChange = (e: MouseEvent) => {
		if (!isPicking) return;
		const bounding = picker.getBoundingClientRect();
		const shiftX = Math.max(0, Math.min(e.x - bounding.x, bounding.width));
		alpha = shiftX / bounding.width;
		circleX = alpha * 100;
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
	style={`background: linear-gradient(to right, transparent, ${pickerHex})`}
	on:mousedown={handleMouseDown}
>
	<div
		class="h-4 w-4 rounded-full border -translate-x-1/2 -translate-y-1/2 absolute"
		style={`background: ${circleColor}; left: ${circleX}%`}
	/>
</button>
