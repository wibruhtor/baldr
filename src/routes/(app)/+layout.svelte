<script lang="ts">
	import Header from '$lib/components/layout/header/header.svelte';
	import { authStore } from '$lib/stores/auth.store';
	import '../../app.css';

	export let data: { accessToken: string | null; refreshToken: string | null };

	if (data.accessToken && data.refreshToken) {
		authStore.set(data.accessToken, data.refreshToken);
	}
</script>

<Header />
<main class="grid grid-cols-1 gap-8 py-12">
	<slot />
</main>
