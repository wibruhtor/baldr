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
	import { CreateBanWordFilterRequestSchema } from '$lib/types/api/request/ban-word-filters';
	import { createForm } from '$lib/utils/create-form';
	import Field from '$lib/components/ui/field/field.svelte';
	import { toastStore } from '$lib/stores/toast.store';
	import { AppError } from '$lib/utils/app-error';
</script>

<script lang="ts">
	const { data, errors, validate } = createForm({ name: '' }, CreateBanWordFilterRequestSchema);
	let isLoading = false;

	const handleCreateClick = () => {
		if (!validate()) return;
		if (!$authStore.accessToken) return;
		isLoading = true;
		banWordFiltersService
			.createBanWordFilter($data, $authStore.accessToken)
			.then((filter) => {
				isLoading = false;
				goto('/ban-word-filters/edit/' + filter.id);
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
						description: 'Не удалось создать бан ворд фильтр',
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
		<CardTitle>Создание Бан Ворд Фильтра</CardTitle>
	</CardHeader>
	<CardContent class="grid grid-cols-1 gap-4">
		<Field label="Название" for="ban-word-filter-name" description={$errors.name} error let:id>
			<Input {id} name={id} autocomplete={id} bind:value={$data.name} />
		</Field>
	</CardContent>
	<CardFooter>
		<Button on:click={handleCreateClick} disabled={isLoading}>Создать</Button>
	</CardFooter>
</Card>
