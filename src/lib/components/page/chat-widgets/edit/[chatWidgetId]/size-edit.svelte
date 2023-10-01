<script lang="ts" context="module">
	import Button from '$lib/components/ui/button/button.svelte';
	import Field from '$lib/components/ui/field/field.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { ChatSizeSettings } from '$lib/types/api/entity/chat-settings';
	import type { UpdateChatSettingsRequest } from '$lib/types/api/request/chat-settings';
	import type { Errors } from '$lib/utils/createForm';
</script>

<script lang="ts">
	export let sizeSettings: ChatSizeSettings;
	export let isLoading: boolean;

	let allMargins = false;
	let margin = sizeSettings.marginTop;
	let allPaddings = false;
	let padding = sizeSettings.paddingTop;
	let allRadius = false;
	let radius = sizeSettings.borderTopLeftRadius;

	$: if (allMargins) {
		sizeSettings.marginTop = margin;
		sizeSettings.marginRight = margin;
		sizeSettings.marginBottom = margin;
		sizeSettings.marginLeft = margin;
	}
	$: if (allPaddings) {
		sizeSettings.paddingTop = padding;
		sizeSettings.paddingRight = padding;
		sizeSettings.paddingBottom = padding;
		sizeSettings.paddingLeft = padding;
	}
	$: if (allRadius) {
		sizeSettings.borderTopLeftRadius = radius;
		sizeSettings.borderTopRightRadius = radius;
		sizeSettings.borderBottomLeftRadius = radius;
		sizeSettings.borderBottomRightRadius = radius;
	}
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center gap-2">
		<Label>Внешние отступы</Label>
		<Button on:click={() => (allMargins = !allMargins)} variant="secondary" size="sm">
			{#if allMargins}
				Каждый отступ
			{:else}
				Все отступы
			{/if}
		</Button>
	</div>
	<div class="flex flex-col gap-2">
		{#if allMargins}
			<div class="flex justify-center gap-2">
				<Input
					class="w-24"
					name="margin"
					autocomplete="margin"
					type="number"
					min="0"
					bind:value={margin}
				/>
			</div>
		{:else}
			<div class="flex justify-center gap-2">
				<Input
					class="w-24"
					name="margin-top"
					autocomplete="margin"
					type="number"
					min="0"
					bind:value={sizeSettings.marginTop}
				/>
			</div>
			<div class="flex justify-center gap-24">
				<Input
					class="w-24"
					name="margin-left"
					autocomplete="margin"
					type="number"
					min="0"
					bind:value={sizeSettings.marginLeft}
				/>
				<Input
					class="w-24"
					name="margin-right"
					autocomplete="margin"
					type="number"
					min="0"
					bind:value={sizeSettings.marginRight}
				/>
			</div>
			<div class="flex justify-center gap-2">
				<Input
					class="w-24"
					name="margin-bottom"
					autocomplete="margin"
					type="number"
					min="0"
					bind:value={sizeSettings.marginBottom}
				/>
			</div>
		{/if}
	</div>
</div>
<div class="flex flex-col gap-2">
	<div class="flex items-center gap-2">
		<Label>Внутренние отступы</Label>
		<Button on:click={() => (allPaddings = !allPaddings)} variant="secondary" size="sm">
			{#if allPaddings}
				Каждый отступ
			{:else}
				Все отступы
			{/if}
		</Button>
	</div>
	<div class="flex flex-col gap-2">
		{#if allPaddings}
			<div class="flex justify-center gap-2">
				<Input
					class="w-24"
					name="padding"
					autocomplete="padding"
					type="number"
					min="0"
					bind:value={padding}
				/>
			</div>
		{:else}
			<div class="flex justify-center gap-2">
				<Input
					class="w-24"
					name="padding-top"
					autocomplete="padding"
					type="number"
					min="0"
					bind:value={sizeSettings.paddingTop}
				/>
			</div>
			<div class="flex justify-center gap-24">
				<Input
					class="w-24"
					name="padding-left"
					autocomplete="padding"
					type="number"
					min="0"
					bind:value={sizeSettings.paddingLeft}
				/>
				<Input
					class="w-24"
					name="padding-right"
					autocomplete="padding"
					type="number"
					min="0"
					bind:value={sizeSettings.paddingRight}
				/>
			</div>
			<div class="flex justify-center gap-2">
				<Input
					class="w-24"
					name="padding-bottom"
					autocomplete="padding"
					type="number"
					min="0"
					bind:value={sizeSettings.paddingBottom}
				/>
			</div>
		{/if}
	</div>
</div>
<div class="flex flex-col gap-2">
	<div class="flex items-center gap-2">
		<Label>Скругления углов</Label>
		<Button on:click={() => (allRadius = !allRadius)} variant="secondary" size="sm">
			{#if allPaddings}
				Каждый угол
			{:else}
				Все углы
			{/if}
		</Button>
	</div>
	<div class="flex flex-col gap-2">
		{#if allRadius}
			<Input name="radius" autocomplete="radius" type="number" min="0" bind:value={radius} />
		{:else}
			<div class="flex gap-2">
				<Input
					name="radius-top-left"
					autocomplete="radius"
					type="number"
					min="0"
					bind:value={sizeSettings.borderTopLeftRadius}
				/>
				<Input
					name="radius-top-right"
					autocomplete="radius"
					type="number"
					min="0"
					bind:value={sizeSettings.borderTopRightRadius}
				/>
			</div>
			<div class="flex gap-2">
				<Input
					name="radius-bottom-left"
					autocomplete="radius"
					type="number"
					min="0"
					bind:value={sizeSettings.borderBottomLeftRadius}
				/>
				<Input
					name="radius-bottom-right"
					autocomplete="radius"
					type="number"
					min="0"
					bind:value={sizeSettings.borderBottomRightRadius}
				/>
			</div>
		{/if}
	</div>
</div>
<Field label="Максимальное число сообщений" for="max-messages" let:id>
	<Input
		{id}
		name={id}
		autocomplete={id}
		bind:value={sizeSettings.maxMessages}
		disabled={isLoading}
	/>
</Field>
