<script lang="ts" context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/shadcn';
</script>

<script lang="ts">
	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div class={cn('flex items-center p-6 pt-0', className)} {...$$restProps}>
	<slot />
</div>
