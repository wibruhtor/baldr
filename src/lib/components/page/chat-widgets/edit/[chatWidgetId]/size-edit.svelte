<script lang="ts" context="module">
	import Button from '$lib/components/ui/button/button.svelte';
	import Field from '$lib/components/ui/field/field.svelte';
	import MarginLeft from '$lib/components/ui/icon/margin-left.svelte';
	import MarginTop from '$lib/components/ui/icon/margin-top.svelte';
	import Margin from '$lib/components/ui/icon/margin.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { ChatSizeSettings } from '$lib/types/api/entity/chat-settings';
	import type { UpdateChatSettingsRequest } from '$lib/types/api/request/chat-settings';
	import type { Errors } from '$lib/utils/createForm';
</script>

<script lang="ts">
	import MarginBottom from '$lib/components/ui/icon/margin-bottom.svelte';
	import MarginRight from '$lib/components/ui/icon/margin-right.svelte';
	import MarginX from '$lib/components/ui/icon/margin-x.svelte';
	import MarginY from '$lib/components/ui/icon/margin-y.svelte';

	export let sizeSettings: ChatSizeSettings;
	export let isLoading: boolean;

	let showMargin: 'all' | 'axis' | 'every' = 'every';
	let margin = Math.max(
		sizeSettings.marginTop,
		sizeSettings.marginBottom,
		sizeSettings.marginLeft,
		sizeSettings.marginRight,
	);
	let marginX = Math.max(sizeSettings.marginLeft, sizeSettings.marginRight);
	let marginY = Math.max(sizeSettings.marginTop, sizeSettings.marginBottom);

	$: if (showMargin === 'all') {
		sizeSettings.marginTop = margin;
		sizeSettings.marginRight = margin;
		sizeSettings.marginBottom = margin;
		sizeSettings.marginLeft = margin;
	}
	$: if (showMargin === 'every') {
		sizeSettings.marginTop = marginY;
		sizeSettings.marginRight = marginX;
		sizeSettings.marginBottom = marginY;
		sizeSettings.marginLeft = marginX;
	}

	const toggleMargin = () => {
		if (showMargin === 'all') {
			showMargin = 'axis';
		} else if (showMargin === 'axis') {
			showMargin = 'every';
		} else {
			showMargin = 'all';
		}
	};
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center gap-2">
		<Label>Внешние отступы</Label>
		<Button on:click={toggleMargin} variant="secondary" size="sm">
			{#if showMargin === 'all'}
				Все
			{:else if showMargin === 'axis'}
				Оси
			{:else}
				Каждый
			{/if}
		</Button>
	</div>
	<div class="flex flex-col gap-2">
		{#if showMargin === 'all'}
			<div class="flex items-center justify-center gap-2">
				<Margin class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					name="margin"
					autocomplete="margin"
					type="number"
					min="0"
					bind:value={margin}
				/>
			</div>
		{:else if showMargin === 'axis'}
			<div class="flex items-center justify-center gap-2">
				<MarginX class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					name="margin"
					autocomplete="margin"
					type="number"
					min="0"
					bind:value={marginX}
				/>
				<MarginY class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					name="margin"
					autocomplete="margin"
					type="number"
					min="0"
					bind:value={marginY}
				/>
			</div>
		{:else}
			<div class="flex items-center justify-center gap-2">
				<MarginTop class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					name="margin-top"
					autocomplete="margin"
					type="number"
					min="0"
					bind:value={sizeSettings.marginTop}
				/>
				<MarginLeft class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					name="margin-left"
					autocomplete="margin"
					type="number"
					min="0"
					bind:value={sizeSettings.marginLeft}
				/>
				<MarginRight class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					name="margin-right"
					autocomplete="margin"
					type="number"
					min="0"
					bind:value={sizeSettings.marginRight}
				/>
				<MarginBottom class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
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
<!-- <div class="flex flex-col gap-2">
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
</div> -->
<Field label="Максимальное число сообщений" for="max-messages" let:id>
	<Input
		{id}
		name={id}
		autocomplete={id}
		type="number"
		min="5"
		max="100"
		bind:value={sizeSettings.maxMessages}
		disabled={isLoading}
	/>
</Field>
