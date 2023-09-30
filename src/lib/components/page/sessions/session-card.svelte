<script lang="ts" context="module">
	import { Eye, EyeOff } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { sessionsService } from '$lib/service/sessions.service';
	import { UAParser } from 'ua-parser-js';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import { authStore } from '$lib/stores/auth.store';
	import { createEventDispatcher } from 'svelte';
	import type { Session } from '$lib/types/api/entity/session';

	const dtf = new Intl.DateTimeFormat(undefined, {
		dateStyle: 'short',
		timeStyle: 'short',
	});
</script>

<script lang="ts">
	import Field from '$lib/components/ui/field/field.svelte';

	export let session: Session;

	const dispatch = createEventDispatcher();

	let isCurrentSession = session.id == $authStore.sessionId;
	let showIp = false;
	let deleteIsLoading = false;
	const ua = new UAParser(session.userAgent).getResult();

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
		<CardTitle>
			{#if isCurrentSession}
				Текущая сессия
			{:else}
				Cессия
			{/if}
		</CardTitle>
	</CardHeader>
	<CardContent class="grid grid-cols-1 gap-4">
		<Field for={`id-${session.id}`} label="ID" let:id>
			<Input {id} name={id} value={session.id} readonly />
		</Field>
		<Field for={`ip-${session.id}`} label="IP" let:id>
			<div class="flex gap-2">
				<Input
					{id}
					name={id}
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
		</Field>

		<Field for={`user-agent-${session.id}`} label="User Agent" let:id>
			<Input {id} name={id} value={session.userAgent} readonly />
		</Field>
		{#if ua.browser.name}
			<Field for={`browser-${session.id}`} label="Браузер" let:id>
				{#if ua.browser.version}
					<Input {id} name={id} value={`${ua.browser.name}/${ua.browser.version}`} readonly />
				{:else}
					<Input {id} name={id} value={ua.browser.name} readonly />
				{/if}
			</Field>
		{/if}
		{#if ua.os.name}
			<Field for={`os-${session.id}`} label="Операционная система" let:id>
				{#if ua.os.version}
					<Input {id} name={id} value={`${ua.os.name} ${ua.os.version}`} readonly />
				{:else}
					<Input {id} name={id} value={ua.os.name} readonly />
				{/if}
			</Field>
		{/if}
		<Field for={`authorized-at-${session.id}`} label="Авторизован" let:id>
			<Input {id} name={id} value={dtf.format(new Date(session.authorizedAt))} readonly />
		</Field>
		<Field for={`refreshed-at-${session.id}`} label="Последнее обновление" let:id>
			<Input {id} name={id} value={dtf.format(new Date(session.refreshedAt))} readonly />
		</Field>
	</CardContent>
	{#if !isCurrentSession}
		<CardFooter>
			<Button variant="destructive" disabled={deleteIsLoading} on:click={handleDeleteClick}>
				Удалить
			</Button>
		</CardFooter>
	{/if}
</Card>
