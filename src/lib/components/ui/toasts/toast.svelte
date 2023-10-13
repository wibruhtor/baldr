<script lang="ts" context="module">
	import AlertContent from '$lib/components/ui/alert/alert-content.svelte';
	import AlertDescription from '$lib/components/ui/alert/alert-description.svelte';
	import AlertTitle from '$lib/components/ui/alert/alert-title.svelte';
	import Alert from '$lib/components/ui/alert/alert.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toastStore } from '$lib/stores/toast.store';
	import type { SvelteComponentConstructor } from '$lib/types/svelte-component-constructor';
	import { X } from 'lucide-svelte';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	export let id: number;
	export let variant: 'default' | 'destructive';
	export let title: string;
	export let description: string | null;
	export let icon: SvelteComponentConstructor | null;
	export let closeButton: boolean;
	export let timeout: number;

	let closeTimestamp = 0;
	let progress = timeout > 0 ? 100 : 0;

	const close = () => {
		toastStore.close(id);
	};

	const closeStep: FrameRequestCallback = (_) => {
		const remaining = closeTimestamp - Date.now();
		progress = Math.min((remaining / timeout) * 100, 100);
		if (progress <= 0) {
			close();
		} else {
			requestAnimationFrame(closeStep);
		}
	};

	onMount(() => {
		if (timeout > 0) {
			closeTimestamp = Date.now() + timeout;
			requestAnimationFrame(closeStep);
		}
	});
</script>

<Alert class="w-full max-w-xs pointer-events-auto" {variant}>
	{#if icon}
		{@const IconComponent = icon}
		<IconComponent class="h-4 min-w-[1rem] self-start" />
	{/if}
	<AlertContent>
		<AlertTitle>{title}</AlertTitle>
		{#if description}
			<AlertDescription>
				{description}
			</AlertDescription>
		{/if}
	</AlertContent>
	{#if closeButton}
		<Button on:click={close} class="min-w-[2.25rem] ml-auto" size="icon" variant="ghost">
			<X class="h-4 w-4" />
		</Button>
	{/if}
	{#if progress}
		<div style={`width: ${progress}%`} class="bg-current h-0.5 absolute bottom-0 left-0" />
	{/if}
</Alert>
