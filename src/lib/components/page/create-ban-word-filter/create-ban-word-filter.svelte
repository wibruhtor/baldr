<script lang="ts" context="module">
	import Button from '$lib/components/ui/button/button.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { banWordFiltersService } from '$lib/service/ban-word-filters.service';
	import { authStore } from '$lib/stores/auth.store';
	import { goto } from '$app/navigation';
	import { CreateBanWordFilterRequestSchema } from '$lib/types/api/request/ban-word-filters';
</script>

<script lang="ts">
	let name: string = '';
	let isLoading = false;

	$: validationResult = CreateBanWordFilterRequestSchema.safeParse({ name });

	const handleBanWordFilterClick = () => {
		if (!$authStore.accessToken) return;
		isLoading = true;
		banWordFiltersService
			.createBanWordFilter({ name }, $authStore.accessToken)
			.then((filter) => {
				isLoading = false;
				goto('/ban-word-filters/' + filter.id);
			})
			.catch((e) => {
				console.error(e);
				isLoading = false;
			});
	};
</script>

<Card class="min-w-0 max-w-3xl w-full mx-auto">
	<CardHeader>
		<CardTitle>Создание Бан Ворд Фильтра</CardTitle>
	</CardHeader>
	<CardContent class="grid grid-cols-1 gap-4">
		<div class="flex flex-col gap-2">
			<Label for="name">Название</Label>
			<Input id="name" name="name" bind:value={name} />
			{#if !validationResult.success}
				{@const nameIssue = validationResult.error.issues.find((v) => v.path.join('.') === 'name')}
				{#if nameIssue}
					<span class="text-xs text-destructive">
						{nameIssue.message}
					</span>
				{/if}
			{/if}
		</div>
	</CardContent>
	<CardFooter>
		<Button on:click={handleBanWordFilterClick} disabled={isLoading || !validationResult.success}>
			Создать
		</Button>
	</CardFooter>
</Card>
