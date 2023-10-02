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

	const BanWordsSchema = z.object({
		words: z.array(
			z.object({
				id: z.string(),
				word: BanWordSchema,
				show: z.boolean(),
			}),
		),
	});
</script>

<script lang="ts">
	export let banWordFilter: BanWordFilter;
	export let banWords: string[];

	let showAllBanWords = false;
	let isLoading = false;

	const {
		data: filterData,
		errors: filterErrors,
		validate: filterValidate,
	} = createForm({ name: banWordFilter.name }, UpdateBanWordFilterRequestSchema);
	const {
		data: wordsData,
		errors: wordsErrors,
		validate: wordsValidate,
	} = createForm(
		{
			words: banWords.map((word) => ({
				id: hash(),
				word,
				show: false,
			})),
		},
		BanWordsSchema,
	);
	const {
		data: newWordData,
		errors: newWordErrors,
		validate: newWordValidate,
	} = createForm({ word: '', show: false }, NewBanWordSchema);

	$: isChanged =
		$filterData.name !== banWordFilter.name ||
		!$wordsData.words
			.map((v) => v.word.toLowerCase().trim())
			.every((v) => banWords.includes(v.toLowerCase().trim())) ||
		!banWords
			.map((v) => v.toLowerCase().trim())
			.every((v) => $wordsData.words.map((v) => v.word.toLowerCase().trim()).includes(v));

	const handleAddNewBanWordClick = () => {
		if (!newWordValidate()) return;
		if (
			$wordsData.words
				.map((v) => v.word.toLowerCase().trim())
				.includes($newWordData.word.toLowerCase().trim())
		) {
			$newWordErrors.word = 'Бан ворд уже в списке';
			return;
		}
		$wordsData.words = Array.from(
			new Set([
				...$wordsData.words,
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
		$wordsData.words = $wordsData.words.filter((v) => v.id !== id);
	};

	const handleSaveClick = async () => {
		if (!filterValidate() || !wordsValidate()) return;
		if (!$authStore.accessToken) return;
		isLoading = true;
		const [filterResult, wordsResult] = await Promise.allSettled([
			banWordFiltersService.updateBanWordFilter(
				banWordFilter.id,
				{ name: $filterData.name },
				$authStore.accessToken,
			),
			banWordFiltersService.updateBanWordsOfFilter(
				banWordFilter.id,
				{
					banWords: $wordsData.words.map((v) => v.word.toLowerCase().trim()),
				},
				$authStore.accessToken,
			),
		]);
		if (filterResult.status === 'fulfilled') {
			banWordFilter = filterResult.value;
		} else {
			console.error(filterResult.reason);
		}
		if (wordsResult.status === 'fulfilled') {
			banWords = $wordsData.words.map((v) => v.word.toLowerCase().trim());
		} else {
			console.error(wordsResult.reason);
		}
		isLoading = false;
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
		<Field
			label="Название"
			for="ban-word-filter-name"
			description={$filterErrors.name}
			error
			let:id
		>
			<Input {id} name={id} autocomplete={id} bind:value={$filterData.name} disabled={isLoading} />
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

			{#each $wordsData.words as banWord, index (banWord.id)}
				<Field description={$wordsErrors.words[index].word} error let:id>
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
