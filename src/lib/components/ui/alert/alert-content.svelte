<script lang="ts">
	import { cn } from '$lib/utils/shadcn';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div class={cn(className)} {...$$restProps}>
	<slot />
</div>
