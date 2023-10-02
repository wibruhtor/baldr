<script lang="ts" context="module">
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import type { ChatSettings, ChatType } from '$lib/types/api/entity/chat-settings';
	import Field from '$lib/components/ui/field/field.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { createForm } from '$lib/utils/create-form';
	import { UpdateChatSettingsRequestSchema } from '$lib/types/api/request/chat-settings';
	import { authStore } from '$lib/stores/auth.store';
	import Select from '$lib/components/ui/select/select.svelte';
	import SelectTrigger from '$lib/components/ui/select/select-trigger.svelte';
	import { SelectGroup, SelectValue } from '$lib/components/ui/select';
	import SelectContent from '$lib/components/ui/select/select-content.svelte';
	import SelectLabel from '$lib/components/ui/select/select-label.svelte';
	import SelectItem from '$lib/components/ui/select/select-item.svelte';
	import ColorEdit from '$lib/components/page/chat-widgets/edit/[chatWidgetId]/color-edit.svelte';
	import { Tabs } from '$lib/components/ui/tabs';
	import TabsContent from '$lib/components/ui/tabs/tabs-content.svelte';
	import TabsList from '$lib/components/ui/tabs/tabs-list.svelte';
	import TabsTrigger from '$lib/components/ui/tabs/tabs-trigger.svelte';
	import { chatSettingsService } from '$lib/service/chat-settings.service';
	import { goto } from '$app/navigation';
	import SizeEdit from '$lib/components/page/chat-widgets/edit/[chatWidgetId]/size-edit.svelte';
	import HideEdit from '$lib/components/page/chat-widgets/edit/[chatWidgetId]/hide-edit.svelte';
	import FontEdit from '$lib/components/page/chat-widgets/edit/[chatWidgetId]/font-edit.svelte';

	const chatTypes: { value: ChatType; label: string }[] = [
		{ value: 'default', label: 'По умолчанию' },
		{ value: 'block', label: 'Блоки' },
	];
</script>

<script lang="ts">
	export let chatSettings: ChatSettings;

	let isLoading = false;

	const { data, errors, validate } = createForm(chatSettings, UpdateChatSettingsRequestSchema);

	const handleChangeChatTypeSelect = (e?: { value: unknown }) => {
		if (!e) return;
		$data.chatType = e.value as ChatType;
	};

	const handleSaveClick = async () => {
		if (!validate()) return;
		if (!$authStore.accessToken) return;
		isLoading = true;
		chatSettingsService
			.updateChatSettings(chatSettings.id, $data, $authStore.accessToken)
			.then((newChatSettings) => {
				isLoading = false;
				chatSettings = newChatSettings;
			})
			.catch((e) => {
				console.error(e);
				isLoading = false;
			});
	};

	const handleDeleteClick = async () => {
		if (!$authStore.accessToken) return;
		isLoading = true;
		chatSettingsService
			.deleteBanWordFilter(chatSettings.id, $authStore.accessToken)
			.then(() => {
				isLoading = false;
				goto('/chat-widgets');
			})
			.catch((e) => {
				console.error(e);
				isLoading = false;
			});
	};
</script>

<Card class="min-w-0 max-w-3xl w-full mx-auto">
	<CardHeader>
		<CardTitle>Виджет Чата</CardTitle>
		<CardDescription>{chatSettings.name}</CardDescription>
	</CardHeader>
	<CardContent class="grid grid-cols-1 gap-4">
		<Field label="Название" for="chat-widget-name" description={$errors.name} error let:id>
			<Input {id} name={id} autocomplete={id} bind:value={$data.name} disabled={isLoading} />
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
				onSelectedChange={handleChangeChatTypeSelect}
				disabled={isLoading}
			>
				<SelectTrigger {id} name={id}>
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
		<Tabs value="color">
			<TabsList class="w-full">
				<TabsTrigger class="flex-1" value="color">Цвет</TabsTrigger>
				<TabsTrigger class="flex-1" value="size">Размер</TabsTrigger>
				<TabsTrigger class="flex-1" value="hide">Скрытие</TabsTrigger>
				<TabsTrigger class="flex-1" value="font">Текст</TabsTrigger>
			</TabsList>
			<TabsContent value="color">
				<div class="grid grid-cols-1 gap-4">
					<ColorEdit bind:colorSettings={$data.color} errors={$errors.color} {isLoading} />
				</div>
			</TabsContent>
			<TabsContent value="size">
				<div class="grid grid-cols-1 gap-4">
					<SizeEdit bind:sizeSettings={$data.size} errors={$errors.size} {isLoading} />
				</div>
			</TabsContent>
			<TabsContent value="hide">
				<div class="grid grid-cols-1 gap-4">
					<HideEdit bind:hideSettings={$data.hide} errors={$errors.hide} {isLoading} />
				</div>
			</TabsContent>
			<TabsContent value="font">
				<div class="grid grid-cols-1 gap-4">
					<FontEdit bind:fontSettings={$data.font} errors={$errors.font} {isLoading} />
				</div>
			</TabsContent>
		</Tabs>
	</CardContent>
	<CardFooter class="flex gap-2">
		<Button on:click={handleSaveClick} disabled={isLoading}>Сохранить</Button>
		<Button on:click={handleDeleteClick} disabled={isLoading} variant="destructive">Удалить</Button>
	</CardFooter>
</Card>
