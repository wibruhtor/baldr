<script lang="ts" context="module">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils/shadcn';
	import { buttonVariants, type Props, type Events } from './button.types';
</script>

<script lang="ts">
	type $$Props = Props;
	type $$Events = Events;

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let variant: $$Props['variant'] = 'primary';
	export let size: $$Props['size'] = 'md';
	export let builders: $$Props['builders'] = [];
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</ButtonPrimitive.Root>
