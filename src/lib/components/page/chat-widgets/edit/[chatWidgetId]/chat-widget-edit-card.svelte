<script lang="ts" context="module">
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import type { ChatSettings } from '$lib/types/api/entity/chat-settings';
</script>

<script lang="ts">
	import ColorPicker from '$lib/components/ui/color-picker/color-picker.svelte';
	import Field from '$lib/components/ui/field/field.svelte';

	export let chatSettings: ChatSettings;
</script>

<Card class="min-w-0 max-w-3xl w-full mx-auto">
	<CardHeader>
		<CardTitle>Виджет Чата</CardTitle>
		<CardDescription>{chatSettings.name}</CardDescription>
	</CardHeader>
	<CardContent class="grid grid-cols-1 gap-4">
		<Field>
			<div class="flex gap-2">
				<ColorPicker color={0xf0f000ff} />
			</div>
		</Field>
		<pre>{JSON.stringify(chatSettings, null, 2)}</pre>
	</CardContent>
	<CardFooter class="flex gap-2">
		<Button>Сохранить</Button>
		<Button variant="destructive">Удалить</Button>
	</CardFooter>
</Card>
