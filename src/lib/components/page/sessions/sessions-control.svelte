<script lang="ts" context="module">
	import SessionCard from '$lib/components/page/sessions/session-card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { sessionsService } from '$lib/service/sessions.service';
	import { authStore } from '$lib/stores/auth.store';
	import type { Session } from '$lib/types/api/entity/session';
</script>

<script lang="ts">
	export let sessions: Session[];

	let deleteIsLoading = false;

	const handleDeleteAllExcludeCurrentClick = async () => {
		const accessToken = $authStore.accessToken;
		if (!accessToken) return;
		deleteIsLoading = true;
		sessionsService
			.deleteAllExcludeCurrent(accessToken)
			.then(async () => {
				sessions = (await sessionsService.getAllSesssions(accessToken)).sessions;
				deleteIsLoading = false;
			})
			.catch((e) => {
				console.error(e);
				deleteIsLoading = false;
			});
	};
</script>

<article class="grid grid-cols-1 gap-4">
	<header class="flex gap-4">
		<h2 class="typography-h3">Все сессии</h2>
		<Button
			variant="destructive"
			disabled={deleteIsLoading}
			on:click={handleDeleteAllExcludeCurrentClick}
		>
			Удалить все сессии, кроме текущей
		</Button>
	</header>
	<div class="grid grid-cols-3 gap-4">
		{#each sessions as session (session.id)}
			<SessionCard
				{session}
				on:deleted={() => (sessions = sessions.filter((s) => s.id !== session.id))}
			/>
		{/each}
	</div>
</article>
