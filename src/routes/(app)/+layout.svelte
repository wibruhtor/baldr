<script lang="ts">
	import Header from '$lib/components/layout/header/header.svelte';
	import { authStore } from '$lib/stores/auth.store';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	if (data.accessToken && data.refreshToken) {
		authStore.set(data.accessToken, data.refreshToken);
	}
</script>

<Header />
<main class="grid grid-cols-1 gap-8 py-12">
	<slot />
</main>
