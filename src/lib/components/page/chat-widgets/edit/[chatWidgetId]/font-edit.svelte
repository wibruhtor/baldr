<script lang="ts" context="module">
	import type { Errors } from '$lib/utils/create-form';
	import type { UpdateChatSettingsRequest } from '$lib/types/api/request/chat-settings';
	import type { ChatFontSettings } from '$lib/types/api/entity/chat-settings';
	import Field from '$lib/components/ui/field/field.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
</script>

<script lang="ts">
	export let fontSettings: ChatFontSettings;
	export let errors: Errors<UpdateChatSettingsRequest>['font'];
	export let isLoading: boolean;

	$: {
		if (typeof fontSettings.nicknameFontWeight === 'string') {
			fontSettings.nicknameFontWeight = Number.parseInt(fontSettings.nicknameFontWeight);
		}
		if (typeof fontSettings.textFontWeight === 'string') {
			fontSettings.textFontWeight = Number.parseInt(fontSettings.textFontWeight);
		}
		if (typeof fontSettings.fontSize === 'string') {
			fontSettings.fontSize = Number.parseInt(fontSettings.fontSize);
		}
	}
</script>

<Field label="Шрифт" for="font-family" description={errors.fontFamily} error let:id>
	<Input
		{id}
		name={id}
		autocomplete={id}
		bind:value={fontSettings.fontFamily}
		disabled={isLoading}
	/>
</Field>
<Field
	for="nickname-font-weight"
	label="Толщина текста никнейма"
	description={errors.nicknameFontWeight}
	error
	let:id
>
	<Input
		{id}
		name={id}
		autocomplete={id}
		type="number"
		min="0"
		max="1000"
		bind:value={fontSettings.nicknameFontWeight}
		disabled={isLoading}
	/>
</Field>
<Field
	for="text-font-weight"
	label="Толщина текста"
	description={errors.textFontWeight}
	error
	let:id
>
	<Input
		{id}
		name={id}
		autocomplete={id}
		type="number"
		min="0"
		max="1000"
		bind:value={fontSettings.textFontWeight}
		disabled={isLoading}
	/>
</Field>
<Field for="font-size" label="Размер текста" description={errors.fontSize} error let:id>
	<Input
		{id}
		name={id}
		autocomplete={id}
		type="number"
		min="0"
		bind:value={fontSettings.fontSize}
		disabled={isLoading}
	/>
</Field>
