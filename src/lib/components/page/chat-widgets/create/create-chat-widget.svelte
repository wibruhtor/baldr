<script lang="ts" context="module">
	import Button from '$lib/components/ui/button/button.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { banWordFiltersService } from '$lib/service/ban-word-filters.service';
	import { authStore } from '$lib/stores/auth.store';
	import { goto } from '$app/navigation';
	import { createForm } from '$lib/utils/createForm';
	import Field from '$lib/components/ui/field/field.svelte';
	import {
		CreateChatSettingsRequestSchema,
		type CreateChatSettingsRequest,
	} from '$lib/types/api/request/chat-settings';
	import { chatSettingsService } from '$lib/service/chat-settings.service';
	import Select from '$lib/components/ui/select/select.svelte';
	import { SelectGroup, SelectValue } from '$lib/components/ui/select';
	import SelectContent from '$lib/components/ui/select/select-content.svelte';
	import SelectLabel from '$lib/components/ui/select/select-label.svelte';
	import SelectTrigger from '$lib/components/ui/select/select-trigger.svelte';
	import type { ChatType } from '$lib/types/api/entity/chat-settings';
	import SelectItem from '$lib/components/ui/select/select-item.svelte';
	import { string } from 'zod';

	const chatTypes: { value: ChatType; label: string }[] = [
		{ value: 'default', label: 'По умолчанию' },
		{ value: 'block', label: 'Блоки' },
	];
</script>

<script lang="ts">
	const { data, errors, validate } = createForm(
		{ name: '', chatType: 'default' },
		CreateChatSettingsRequestSchema,
	);
	let isLoading = false;

	const handleChangeSelect = (e?: { value: unknown }) => {
		if (!e) return;
		$data.chatType = e.value as string;
	};

	const handleCreateClick = () => {
		if (!validate()) return;
		if (!$authStore.accessToken) return;
		isLoading = true;
		chatSettingsService
			.createChatSettings($data as CreateChatSettingsRequest, $authStore.accessToken)
			.then((chatSettings) => {
				isLoading = false;
				goto('/chat-widgets/edit/' + chatSettings.id);
			})
			.catch((e) => {
				console.error(e);
				isLoading = false;
			});
	};
</script>

<Card class="min-w-0 max-w-3xl w-full mx-auto">
	<CardHeader>
		<CardTitle>Создание Виджета Чата</CardTitle>
	</CardHeader>
	<CardContent class="grid grid-cols-1 gap-4">
		<Field label="Название" for="chat-widget-name" description={$errors.name} error let:id>
			<Input {id} name={id} autocomplete={id} bind:value={$data.name} />
		</Field>
		<Field
			label="Тип чата"
			for="chat-type"
			description={$errors.chatType && 'Неверный тип чата'}
			error
			let:id
		>
			<Select
				selected={chatTypes.find((v) => v.value === $data.chatType)}
				onSelectedChange={handleChangeSelect}
			>
				<SelectTrigger>
					<SelectValue placeholder="Выберите тип чата" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Типы чата</SelectLabel>
						{#each chatTypes as chatType (chatType.value)}
							<SelectItem value={chatType.value} label={chatType.label}>
								{chatType.label}
							</SelectItem>
						{/each}
					</SelectGroup>
				</SelectContent>
			</Select>
		</Field>
	</CardContent>
	<CardFooter>
		<Button on:click={handleCreateClick} disabled={isLoading}>Создать</Button>
	</CardFooter>
</Card>
