<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		createBanWordFilterEdit,
		formatBanWords,
	} from '$lib/components/page/ban-word-filters/[banWordFilterId]/editStore';
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
	import { Eye, EyeOff, Plus, Trash } from 'lucide-svelte';

	export let banWordFilter: BanWordFilter;
	export let banWords: string[];

	$: editStore = createBanWordFilterEdit(banWordFilter, banWords);
	let newBanWord = '';
	let showNewBanWord = false;

	let isSaveLoading = false;
	const handleSaveClick = async () => {
		if (!$authStore.accessToken) return;
		isSaveLoading = true;
		if ($editStore.isBanWordsChanged && $editStore.isNameChanged) {
			const promises = [
				banWordFiltersService.updateBanWordsOfFilter(
					banWordFilter.id,
					{
						banWords: formatBanWords($editStore.banWords),
					},
					$authStore.accessToken,
				),
				banWordFiltersService.updateBanWordFilter(
					banWordFilter.id,
					{ name: $editStore.banWordFilter.name },
					$authStore.accessToken,
				),
			];

			Promise.all(promises)
				.then(([_, f]) => {
					const filter = f as BanWordFilter;
					banWordFilter = filter;
					banWords = formatBanWords($editStore.banWords);
					isSaveLoading = false;
				})
				.catch((e) => {
					console.error(e);
					isSaveLoading = false;
				});
		} else if ($editStore.isBanWordsChanged) {
			banWordFiltersService
				.updateBanWordsOfFilter(
					banWordFilter.id,
					{
						banWords: formatBanWords($editStore.banWords),
					},
					$authStore.accessToken,
				)
				.then(() => {
					banWords = formatBanWords($editStore.banWords);
					isSaveLoading = false;
				})
				.catch((e) => {
					console.error(e);
					isSaveLoading = false;
				});
		} else if ($editStore.isNameChanged) {
			banWordFiltersService
				.updateBanWordFilter(
					banWordFilter.id,
					{ name: $editStore.banWordFilter.name },
					$authStore.accessToken,
				)
				.then((f) => {
					banWordFilter = f;
					isSaveLoading = false;
				})
				.catch((e) => {
					console.error(e);
					isSaveLoading = false;
				});
		}
	};
	let isDeleteLoading = false;
	const handleDeleteClick = async () => {
		if (!$authStore.accessToken) return;
		isDeleteLoading = true;
		banWordFiltersService
			.deleteBanWordFilter(banWordFilter.id, $authStore.accessToken)
			.then(() => {
				isDeleteLoading = false;
				goto('/ban-word-filters');
			})
			.catch(() => {
				isDeleteLoading = false;
			});
	};
</script>

<Card class="min-w-0 max-w-3xl w-full mx-auto">
	<CardHeader>
		<CardTitle>Бан Ворд Фильтр</CardTitle>
		<CardDescription>{banWordFilter.name}</CardDescription>
	</CardHeader>
	<CardContent class="grid grid-cols-1 gap-4">
		<div class="flex flex-col gap-2">
			<Label for="name">Название</Label>
			<Input
				id="name"
				name="name"
				bind:value={$editStore.banWordFilter.name}
				disabled={isSaveLoading}
			/>
		</div>
		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-2">
				<Label>Бан Ворды</Label>
				<Button on:click={() => editStore.toggleAll()} variant="destructive" size="sm">
					{#if $editStore.isAllVisible}
						Скрыть все
					{:else}
						Показать все
					{/if}
				</Button>
			</div>
			<p class="typography-muted">
				Банворд "омлет" будет срабатывать на "о:м\Л%е т" в сообщении "Я сделал о:м\Л%е т"
			</p>
			{#each $editStore.banWords as banWord (banWord.id)}
				<div class="flex gap-2">
					<Input
						class="w-0 flex-1"
						bind:value={banWord.word}
						type={banWord.show ? 'text' : 'password'}
						disabled={isSaveLoading}
					/>
					<Button on:click={() => (banWord.show = !banWord.show)} variant="outline" size="icon">
						{#if banWord.show}
							<Eye class="h-4 w-4" />
						{:else}
							<EyeOff class="h-4 w-4" />
						{/if}
					</Button>
					<Button
						on:click={() => editStore.removeBanWord(banWord.id)}
						variant="destructive"
						size="icon"
					>
						<Trash class="h-4 w-4" />
					</Button>
				</div>
			{/each}
			<div class="flex gap-2">
				<Input
					class="w-0 flex-1"
					bind:value={newBanWord}
					type={showNewBanWord ? 'text' : 'password'}
					disabled={isSaveLoading}
				/>
				<Button on:click={() => (showNewBanWord = !showNewBanWord)} variant="outline" size="icon">
					{#if showNewBanWord}
						<Eye class="h-4 w-4" />
					{:else}
						<EyeOff class="h-4 w-4" />
					{/if}
				</Button>
				<Button
					on:click={() => {
						editStore.addNewBanWord(newBanWord);
						newBanWord = '';
					}}
					variant="outline"
					size="icon"
				>
					<Plus class="h-4 w-4" />
				</Button>
			</div>
		</div>
	</CardContent>
	<CardFooter class="flex gap-2">
		<Button
			on:click={handleSaveClick}
			disabled={(!$editStore.isBanWordsChanged && !$editStore.isNameChanged) || isSaveLoading}
		>
			Сохранить
		</Button>
		<Button on:click={handleDeleteClick} disabled={isDeleteLoading} variant="destructive">
			Удалить
		</Button>
	</CardFooter>
</Card>
