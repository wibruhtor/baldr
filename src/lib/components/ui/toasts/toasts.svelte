<script lang="ts" context="module">
	import { portal } from '$lib/actions/portal';
	import Toast from '$lib/components/ui/toasts/toast.svelte';
	import { toastStore } from '$lib/stores/toast.store';
</script>

<div
	class="fixed py-8 px-4 top-0 left-0 bottom-0 right-0 flex flex-col gap-4 items-end justify-end pointer-events-none"
	use:portal
>
	{#each $toastStore.toasts as toast (toast.id)}
		<Toast {...toast} />
	{/each}
</div>
