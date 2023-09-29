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
	import {
		CreateBanWordFilterRequestSchema,
		UpdateBanWordFilterRequestSchema,
	} from '$lib/types/api/request/ban-word-filters';
	import { createForm } from '$lib/utils/createForm';
	import Field from '$lib/components/ui/field/field.svelte';
</script>

<script lang="ts">
	const { data, errors, validate } = createForm({ name: '' }, UpdateBanWordFilterRequestSchema);
	let isLoading = false;

	const handleBanWordFilterClick = () => {
		if (!validate()) return;
		if (!$authStore.accessToken) return;
		isLoading = true;
		banWordFiltersService
			.createBanWordFilter({ name: $data.name }, $authStore.accessToken)
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
		<Field label="Название" for="ban-word-filter-name" description={$errors.name} error let:id>
			<Input {id} name={id} autocomplete={id} bind:value={$data.name} />
		</Field>
	</CardContent>
	<CardFooter>
		<Button on:click={handleBanWordFilterClick} disabled={isLoading}>Создать</Button>
	</CardFooter>
</Card>
