<script lang="ts" context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/shadcn';
	import type { HeadingLevel } from './card.types';
</script>

<script lang="ts">
	type $$Props = HTMLAttributes<HTMLHeadingElement> & {
		tag?: HeadingLevel;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let tag: $$Props['tag'] = 'h3';
</script>

<svelte:element
	this={tag}
	class={cn('font-semibold leading-none tracking-tight', className)}
	{...$$restProps}
>
	<slot />
</svelte:element>
