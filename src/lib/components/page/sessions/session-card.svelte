<script lang="ts">
	import { Eye, EyeOff } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { sessionsService, type Session } from '$lib/service/sessions.service';
	import { UAParser } from 'ua-parser-js';
	import { browser, version } from '$app/environment';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import { authStore } from '$lib/stores/auth.store';
	import { createEventDispatcher } from 'svelte';

	export let session: Session;

	const dispatch = createEventDispatcher();

	const ua = new UAParser(session.userAgent).getResult();
	let showIp = false;

	const dtf = new Intl.DateTimeFormat(undefined, {
		dateStyle: 'short',
		timeStyle: 'short',
	});

	let deleteIsLoading = false;
	const handleDeleteClick = async () => {
		if (!$authStore.accessToken) return;
		deleteIsLoading = true;
		sessionsService
			.deleteSession(session.id, $authStore.accessToken)
			.then((v) => {
				dispatch('deleted');
				deleteIsLoading = false;
			})
			.catch((e) => {
				console.error(e);
				deleteIsLoading = false;
			});
	};
</script>

<Card>
	<CardHeader>
		<CardTitle>Cессия</CardTitle>
	</CardHeader>
	<CardContent class="grid grid-cols-1 gap-4">
		<div class="flex flex-col gap-2">
			<Label for="name">ID</Label>
			<div class="flex gap-2">
				<Input name="id" value={session.id} readonly />
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<Label for="name">IP</Label>
			<div class="flex gap-2">
				<Input
					name="ip"
					class="w-0 flex-1"
					value={session.ip}
					type={showIp ? 'text' : 'password'}
					readonly
				/>
				<Button on:click={() => (showIp = !showIp)} variant="outline" size="icon">
					{#if showIp}
						<Eye class="h-4 w-4" />
					{:else}
						<EyeOff class="h-4 w-4" />
					{/if}
				</Button>
			</div>
		</div>
		{#if ua.browser.name}
			<div class="flex flex-col gap-2">
				<Label for="name">Браузер</Label>
				{#if ua.browser.version}
					<Input name="browser" value={`${ua.browser.name}/${ua.browser.version}`} readonly />
				{:else}
					<Input name="browser" value={ua.browser.name} readonly />
				{/if}
			</div>
		{/if}
		{#if ua.os.name}
			<div class="flex flex-col gap-2">
				<Label for="name">Операционная система</Label>
				{#if ua.os.version}
					<Input name="browser" value={`${ua.os.name} ${ua.os.version}`} readonly />
				{:else}
					<Input name="browser" value={ua.os.name} readonly />
				{/if}
			</div>
		{/if}
		<div class="flex flex-col gap-2">
			<Label for="name">Авторизован</Label>
			<Input name="authorizedAt" value={dtf.format(new Date(session.authorizedAt))} readonly />
		</div>
		<div class="flex flex-col gap-2">
			<Label for="name">Последнее обновление</Label>
			<Input name="refreshedAt" value={dtf.format(new Date(session.refreshedAt))} readonly />
		</div>
	</CardContent>
	{#if session.id != $authStore.sessionId}
		<CardFooter>
			<Button variant="destructive" disabled={deleteIsLoading} on:click={handleDeleteClick}>
				Удалить
			</Button>
		</CardFooter>
	{/if}
</Card>
