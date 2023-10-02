<script lang="ts" context="module">
	import type { ChatHideSettings } from '$lib/types/api/entity/chat-settings';
	import { createForm, type Errors } from '$lib/utils/createForm';
	import type { UpdateChatSettingsRequest } from '$lib/types/api/request/chat-settings';
	import Field from '$lib/components/ui/field/field.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { authStore } from '$lib/stores/auth.store';
	import type { BanWordFilter } from '$lib/types/api/entity/ban-word-filter';
	import { onMount } from 'svelte';
	import { banWordFiltersService } from '$lib/service/ban-word-filters.service';
	import { SelectGroup, SelectValue } from '$lib/components/ui/select';
	import SelectContent from '$lib/components/ui/select/select-content.svelte';
	import SelectLabel from '$lib/components/ui/select/select-label.svelte';
	import SelectTrigger from '$lib/components/ui/select/select-trigger.svelte';
	import Select from '$lib/components/ui/select/select.svelte';
	import SelectItem from '$lib/components/ui/select/select-item.svelte';
	import { hash } from '$lib/utils/hash';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus, Trash } from 'lucide-svelte';
	import { z } from 'zod';
	import { NicknameSchema } from '$lib/types/api/nickname-schema';

	const NewNicknameSchema = z.object({
		nickname: NicknameSchema,
	});
</script>

<script lang="ts">
	export let hideSettings: ChatHideSettings;
	export let errors: Errors<UpdateChatSettingsRequest>['hide'];
	export let isLoading: boolean;

	let banWordFilters: BanWordFilter[] = [];
	let nicknames: { id: string; nickname: string }[] = hideSettings.nicknames.map((nickname) => ({
		id: hash(),
		nickname,
	}));
	const {
		data: newNicknameData,
		errors: newNicknameErrors,
		validate: newNicknameValidate,
	} = createForm({ nickname: '' }, NewNicknameSchema);

	$: if (
		!nicknames.map((v) => v.nickname).every((v) => hideSettings.nicknames.includes(v)) ||
		!hideSettings.nicknames.every((v) => nicknames.map((v) => v.nickname).includes(v))
	) {
		hideSettings.nicknames = nicknames.map((v) => v.nickname);
	}

	onMount(() => {
		if (!$authStore.accessToken) return;
		banWordFiltersService
			.getAllBanWordFilters($authStore.accessToken)
			.then((v) => {
				banWordFilters = v.filters;
			})
			.catch(console.error);
	});

	const handleChangeBanWordFilterSelect = (e?: { value: unknown }) => {
		if (!e) return;
		if (e.value === null) {
			hideSettings.banWordFilterId = null;
		} else {
			hideSettings.banWordFilterId = e.value as string;
		}
	};

	const handleAddNewNicknameClick = () => {
		if (!newNicknameValidate()) return;
		if (nicknames.map((v) => v.nickname.trim()).includes($newNicknameData.nickname.trim())) {
			$newNicknameErrors.nickname = 'Никнейм уже в списке';
			return;
		}
		nicknames = Array.from(
			new Set([...nicknames, { id: hash(), nickname: $newNicknameData.nickname }]),
		);
		$newNicknameData.nickname = '';
		$newNicknameErrors.nickname = null;
	};

	const handleRemoveNicknameClick = (id: string) => {
		nicknames = nicknames.filter((v) => v.id !== id);
	};
</script>

<Field
	label="Шаблона скрытых сообщение"
	for="hide-message-pattern"
	description={errors.hideMessagePattern}
	error
	let:id
>
	<Input
		{id}
		name={id}
		autocomplete={id}
		bind:value={hideSettings.hideMessagePattern}
		disabled={isLoading}
	/>
</Field>
<Field for="hide-point-rewardы" label="Скрытие сообщений с наградой за поинты канала" let:id>
	<div class="flex items-center gap-2">
		<Switch {id} name={id} bind:checked={hideSettings.hidePointRewards} />
		<Label for={id} class="typography-muted">
			Сообщения с наградой за поинты канала будут скрываться
		</Label>
	</div>
</Field>
<Field for="hide-links" label="Скрытие ссылок" let:id>
	<div class="flex items-center gap-2">
		<Switch {id} name={id} bind:checked={hideSettings.hideLinks} />
		<Label for={id} class="typography-muted">Ссылки в сообщении будут скрываться</Label>
	</div>
</Field>
<Field
	label="Замена для ссылок"
	for="link-replacement"
	description={errors.linkReplacement}
	error
	let:id
>
	<Input
		{id}
		name={id}
		autocomplete={id}
		bind:value={hideSettings.linkReplacement}
		disabled={isLoading}
	/>
</Field>
<Field
	label="Бан Ворд Фильтр"
	for="ban-word-filter-id"
	description={errors.banWordFilterId}
	error
	let:id
>
	<Select
		selected={banWordFilters
			.map((v) => ({ value: v.id, label: v.name }))
			.find((v) => v.value === hideSettings.banWordFilterId)}
		onSelectedChange={handleChangeBanWordFilterSelect}
		disabled={isLoading}
	>
		<SelectTrigger {id} name={id}>
			<SelectValue placeholder="Выберите бан ворд фильтр" />
		</SelectTrigger>
		<SelectContent>
			<SelectGroup>
				<SelectLabel>Бан Ворд Фильтры</SelectLabel>
				<SelectItem value={null} label="Не выбран">Не выбран</SelectItem>
				{#each banWordFilters as banWordFilter (banWordFilter.id)}
					<SelectItem value={banWordFilter.id} label={banWordFilter.name}>
						{banWordFilter.name}
					</SelectItem>
				{/each}
			</SelectGroup>
		</SelectContent>
	</Select>
</Field>
{#if hideSettings.banWordFilterId}
	<Field
		label="Замена для бан вордов"
		for="ban-word-replacement"
		description={errors.banWordReplacement}
		error
		let:id
	>
		<Input
			{id}
			name={id}
			autocomplete={id}
			bind:value={hideSettings.banWordReplacement}
			disabled={isLoading}
		/>
	</Field>
{/if}
<div class="flex flex-col gap-2">
	<Label>Скрытые никнеймы</Label>

	{#each nicknames as nickname, index (nickname.id)}
		<Field description={errors.nicknames[index]} error let:id>
			<div class="flex gap-2">
				<Input
					{id}
					name={id}
					autocomplete="off"
					class="w-0 flex-1"
					bind:value={nickname.nickname}
					disabled={isLoading}
				/>
				<Button
					on:click={() => handleRemoveNicknameClick(nickname.id)}
					variant="destructive"
					size="icon"
					disabled={isLoading}
				>
					<Trash class="h-4 w-4" />
				</Button>
			</div>
		</Field>
	{/each}
	<Field for="new-nickname" description={$newNicknameErrors.nickname} error let:id>
		<div class="flex gap-2">
			<Input
				{id}
				name={id}
				class="w-0 flex-1"
				bind:value={$newNicknameData.nickname}
				autocomplete="off"
				disabled={isLoading}
			/>
			<Button
				on:click={handleAddNewNicknameClick}
				variant="outline"
				size="icon"
				disabled={isLoading}
			>
				<Plus class="h-4 w-4" />
			</Button>
		</div>
	</Field>
</div>
