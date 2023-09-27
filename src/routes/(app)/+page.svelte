<script lang="ts">
	import AuthButton from '$lib/components/layout/header/auth-button.svelte';
	import Settings from '$lib/components/page/settings.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { authStore } from '$lib/stores/auth.store';
</script>

<section class="container">
	{#if $authStore.isLoggedIn}
		<Settings />
	{:else}
		<Card class="min-w-0 max-w-sm w-full mx-auto">
			<CardHeader>
				<CardTitle>Авторизация</CardTitle>
				<CardDescription>Для работы нужно авторизоваться</CardDescription>
			</CardHeader>
			<CardFooter>
				<AuthButton />
			</CardFooter>
		</Card>
	{/if}
</section>
