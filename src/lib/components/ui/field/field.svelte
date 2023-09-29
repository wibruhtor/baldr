<script lang="ts" context="module">
	import Label from '$lib/components/ui/label/label.svelte';
	import { hash } from '$lib/utils/hash';
	import { cn } from '$lib/utils/shadcn';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		label?: string;
		for?: string;
		description?: string | null;
		error?: boolean;
	};
</script>

<script lang="ts">
	type $$Props = HTMLAttributes<HTMLDivElement> & Props;

	export let label: $$Props['label'] = '';
	export let htmlFor: $$Props['for'] = hash();
	export { htmlFor as for };
	export let description: $$Props['description'] = null;
	export let error: $$Props['error'] = false;
</script>

<div {...$$restProps}>
	{#if label}
		<Label for={htmlFor} class="mb-2">{label}</Label>
	{/if}
	<slot id={htmlFor} />
	{#if description}
		<p class={cn('typography-muted mt-1', error && 'text-destructive')}>
			{description}
		</p>
	{/if}
</div>
