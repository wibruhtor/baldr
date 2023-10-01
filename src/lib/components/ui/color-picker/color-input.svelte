<script lang="ts" context="module">
	import Input from '$lib/components/ui/input/input.svelte';
	import type { InputEvents } from '$lib/components/ui/input/input.types';
	import { hexToNumber, numberToHex } from '$lib/utils/color-convertors';
	import { onDestroy } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
</script>

<script lang="ts">
	type $$Props = HTMLInputAttributes & { value?: number };
	type $$Events = InputEvents;

	export let value: $$Props['value'] = 0;

	let timeout: NodeJS.Timeout | null = null;

	const handleInput = (e: HTMLInputElement) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			value = hexToNumber(e.value);
		}, 500);
	};

	onDestroy(() => {
		if (timeout) clearTimeout(timeout);
	});
</script>

<Input
	{...$$restProps}
	value={numberToHex(value)}
	on:input={(e) => {
		handleInput(e.currentTarget);
	}}
/>
