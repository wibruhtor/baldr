<script lang="ts" context="module">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { banWordFiltersService } from '$lib/service/ban-word-filters.service';
	import { authStore } from '$lib/stores/auth.store';
	import type { BanWordFilter } from '$lib/types/api/entity/ban-word-filter';
	import {
		BanWordSchema,
		UpdateBanWordFilterRequestSchema,
	} from '$lib/types/api/request/ban-word-filters';
	import { createForm } from '$lib/utils/create-form';
	import { Eye, EyeOff, Plus, Trash } from 'lucide-svelte';
	import Field from '$lib/components/ui/field/field.svelte';
	import { z } from 'zod';
	import { hash } from '$lib/utils/hash';

	const NewBanWordSchema = z.object({
		word: BanWordSchema,
		show: z.boolean(),
	});
</script>

<script lang="ts">
	export let banWordFilter: BanWordFilter;

	let showAllBanWords = false;
	let isLoading = false;

	let banWords: { id: string; word: string; show: boolean }[] = banWordFilter.banWords.map(
		(word) => ({
			id: hash(),
			word,
			show: false,
		}),
	);

	const { data, errors, validate } = createForm(
		{ name: banWordFilter.name, banWords: banWordFilter.banWords },
		UpdateBanWordFilterRequestSchema,
	);
	const {
		data: newWordData,
		errors: newWordErrors,
		validate: newWordValidate,
	} = createForm({ word: '', show: false }, NewBanWordSchema);

	$: isChanged =
		$data.name !== banWordFilter.name ||
		!$data.banWords
			.map((v) => v.toLowerCase().trim())
			.every((v) => banWordFilter.banWords.includes(v.toLowerCase().trim())) ||
		!banWordFilter.banWords
			.map((v) => v.toLowerCase().trim())
			.every((v) => $data.banWords.map((v) => v.toLowerCase().trim()).includes(v));

	$: $data.banWords = banWords.map((v) => v.word.toLowerCase().trim());

	const handleAddNewBanWordClick = () => {
		if (!newWordValidate()) return;
		if (
			$data.banWords
				.map((v) => v.toLowerCase().trim())
				.includes($newWordData.word.toLowerCase().trim())
		) {
			$newWordErrors.word = 'Бан ворд уже в списке';
			return;
		}
		banWords = Array.from(
			new Set([
				...banWords,
				{
					id: hash(),
					word: $newWordData.word.toLowerCase().trim(),
					show: false,
				},
			]),
		);
		$newWordData.word = '';
		$newWordErrors.word = null;
	};

	const handleRemoveBanWordClick = (id: string) => {
		banWords = banWords.filter((v) => v.id !== id);
	};

	const handleSaveClick = async () => {
		if (!validate()) return;
		if (!$authStore.accessToken) return;
		isLoading = true;
		banWordFiltersService
			.updateBanWordFilter(banWordFilter.id, $data, $authStore.accessToken)
			.then((newBanWordFilter) => {
				isLoading = false;
				banWordFilter = newBanWordFilter;
			})
			.catch((e) => {
				console.error(e);
				isLoading = false;
			});
	};

	const handleDeleteClick = async () => {
		if (!$authStore.accessToken) return;
		isLoading = true;
		banWordFiltersService
			.deleteBanWordFilter(banWordFilter.id, $authStore.accessToken)
			.then(() => {
				isLoading = false;
				goto('/ban-word-filters');
			})
			.catch((e) => {
				console.error(e);
				isLoading = false;
			});
	};
</script>

<Card class="min-w-0 max-w-3xl w-full mx-auto">
	<CardHeader>
		<CardTitle>Бан Ворд Фильтр</CardTitle>
		<CardDescription>{banWordFilter.name}</CardDescription>
	</CardHeader>
	<CardContent class="grid grid-cols-1 gap-4">
		<Field label="Название" for="ban-word-filter-name" description={$errors.name} error let:id>
			<Input {id} name={id} autocomplete={id} bind:value={$data.name} disabled={isLoading} />
		</Field>
		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-2">
				<Label>Бан Ворды</Label>
				<Button
					on:click={() => (showAllBanWords = !showAllBanWords)}
					variant="destructive"
					size="sm"
				>
					{#if showAllBanWords}
						Скрыть все
					{:else}
						Показать все
					{/if}
				</Button>
			</div>
			<p class="typography-muted">
				Банворд "омлет" будет срабатывать на "о:м\Л%е т" в сообщении "Я сделал о:м\Л%е т"
			</p>

			{#each banWords as banWord, index (banWord.id)}
				<Field description={$errors.banWords[index]} error let:id>
					<div class="flex gap-2">
						<Input
							{id}
							name={id}
							autocomplete="off"
							class="w-0 flex-1"
							bind:value={banWord.word}
							type={showAllBanWords || banWord.show ? 'text' : 'password'}
							disabled={isLoading}
						/>
						<Button
							on:click={() => (banWord.show = !banWord.show)}
							variant="outline"
							size="icon"
							disabled={showAllBanWords}
						>
							{#if showAllBanWords || banWord.show}
								<Eye class="h-4 w-4" />
							{:else}
								<EyeOff class="h-4 w-4" />
							{/if}
						</Button>
						<Button
							on:click={() => handleRemoveBanWordClick(banWord.id)}
							variant="destructive"
							size="icon"
							disabled={isLoading}
						>
							<Trash class="h-4 w-4" />
						</Button>
					</div>
				</Field>
			{/each}
			<Field for="new-ban-word" description={$newWordErrors.word} error let:id>
				<div class="flex gap-2">
					<Input
						{id}
						name={id}
						class="w-0 flex-1"
						bind:value={$newWordData.word}
						autocomplete="off"
						type={showAllBanWords || $newWordData.show ? 'text' : 'password'}
						disabled={isLoading}
					/>
					<Button
						on:click={() => ($newWordData.show = !$newWordData.show)}
						variant="outline"
						size="icon"
						disabled={showAllBanWords}
					>
						{#if showAllBanWords || $newWordData.show}
							<Eye class="h-4 w-4" />
						{:else}
							<EyeOff class="h-4 w-4" />
						{/if}
					</Button>
					<Button
						on:click={handleAddNewBanWordClick}
						variant="outline"
						size="icon"
						disabled={isLoading}
					>
						<Plus class="h-4 w-4" />
					</Button>
				</div>
			</Field>
		</div>
	</CardContent>
	<CardFooter class="flex gap-2">
		<Button on:click={handleSaveClick} disabled={!isChanged || isLoading}>Сохранить</Button>
		<Button on:click={handleDeleteClick} disabled={isLoading} variant="destructive">Удалить</Button>
	</CardFooter>
</Card>
