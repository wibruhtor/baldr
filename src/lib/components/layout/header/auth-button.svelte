<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { authService } from '$lib/service/auth.service';
	import { authStore } from '$lib/stores/auth.store';
	import { onMount } from 'svelte';

	let authUrl = '#';

	onMount(() => {
		authService
			.getAuthorizeUrl()
			.then((data) => (authUrl = data.url))
			.catch(console.error);
	});

	const handleLogoutClick = () => {
		const accessToken = $authStore.accessToken;
		authStore.clear();
		if (accessToken) {
			authService.logout(accessToken);
		}
	};
</script>

{#if $authStore.isLoggedIn}
	<Button variant="secondary" on:click={handleLogoutClick}>Выйти</Button>
{:else}
	<Button href={authUrl}>Войти</Button>
{/if}
