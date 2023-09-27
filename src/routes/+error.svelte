<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { error } from '@sveltejs/kit';
	import '../app.css';
</script>

<section class="container my-12">
	<Card class="min-w-0 max-w-sm w-full mx-auto">
		<CardHeader>
			<CardTitle>Что-то пошло не так</CardTitle>
			<CardDescription>Вся информации ниже</CardDescription>
		</CardHeader>
		{#if $page.error !== null}
			<CardContent class="flex flex-col gap-4">
				<h4 class="typography-large">
					Статус код <code class="typography-inline-code">{$page.status}</code>
				</h4>

				{#if $page.error.requestId}
					<h4 class="typography-large">
						ID запроса <code class="typography-inline-code">{$page.error.requestId}</code>
					</h4>
				{/if}
				{#if $page.error.message}
					<div>
						<h4 class="typography-large">Ошибка</h4>
						<p class="typography-muted">
							{#if $page.error.message === 'Not Found'}
								Не найдено
							{:else}
								{$page.error.message}
							{/if}
						</p>
					</div>
				{/if}
				{#if $page.error.description}
					<div>
						<h4 class="typography-large">Описание</h4>
						<p class="typography-muted">
							{$page.error.description}
						</p>
					</div>
				{/if}
			</CardContent>
		{/if}
		<CardFooter>
			<Button variant="secondary" href="/">Вернуться на главную</Button>
		</CardFooter>
	</Card>
</section>
