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
	import { createForm } from '$lib/utils/create-form';
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
	import { AppError } from '$lib/utils/app-error';
	import { toastStore } from '$lib/stores/toast.store';

	const chatTypes: { value: ChatType; label: string }[] = [
		{ value: 'default' as ChatType, label: 'По умолчанию' },
		{ value: 'default-reverse', label: 'По умолчанию (развернутый)' },
		{ value: 'block', label: 'Блоки' },
		{ value: 'block-reverse', label: 'Блоки (развернутый)' },
		{ value: 'alternative-block', label: 'Альтернативыне блоки' },
		{ value: 'alternative-block-reverse', label: 'Альтернативыне блоки (развернутый)' },
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
				if (e instanceof AppError) {
					toastStore.show(`Ошибка ${e.getTraceId()}`, {
						variant: 'destructive',
						description: e.getMessage(),
						closeButton: true,
						timeout: 5000,
					});
				} else {
					toastStore.show(`Ошибка`, {
						variant: 'destructive',
						description: 'Не удалось создать виджет чата',
						closeButton: true,
						timeout: 5000,
					});
					console.error(e);
				}
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
