<script lang="ts" context="module">
	import Button from '$lib/components/ui/button/button.svelte';
	import Field from '$lib/components/ui/field/field.svelte';
	import MarginLeft from '$lib/components/ui/icon/margin-left.svelte';
	import MarginTop from '$lib/components/ui/icon/margin-top.svelte';
	import Margin from '$lib/components/ui/icon/margin.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { ChatSizeSettings } from '$lib/types/api/entity/chat-settings';
	import MarginBottom from '$lib/components/ui/icon/margin-bottom.svelte';
	import MarginRight from '$lib/components/ui/icon/margin-right.svelte';
	import MarginX from '$lib/components/ui/icon/margin-x.svelte';
	import MarginY from '$lib/components/ui/icon/margin-y.svelte';
	import Padding from '$lib/components/ui/icon/padding.svelte';
	import PaddingX from '$lib/components/ui/icon/padding-x.svelte';
	import PaddingY from '$lib/components/ui/icon/padding-y.svelte';
	import PaddingTop from '$lib/components/ui/icon/padding-top.svelte';
	import PaddingLeft from '$lib/components/ui/icon/padding-left.svelte';
	import PaddingRight from '$lib/components/ui/icon/padding-right.svelte';
	import PaddingBottom from '$lib/components/ui/icon/padding-bottom.svelte';
</script>

<script lang="ts">
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
	let showPadding: 'all' | 'axis' | 'every' = 'every';
	let padding = Math.max(
		sizeSettings.paddingTop,
		sizeSettings.paddingBottom,
		sizeSettings.paddingLeft,
		sizeSettings.paddingRight,
	);
	let paddingX = Math.max(sizeSettings.paddingLeft, sizeSettings.paddingRight);
	let paddingY = Math.max(sizeSettings.paddingTop, sizeSettings.paddingBottom);

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
	$: if (showPadding === 'all') {
		sizeSettings.paddingTop = padding;
		sizeSettings.paddingRight = padding;
		sizeSettings.paddingBottom = padding;
		sizeSettings.paddingLeft = padding;
	}
	$: if (showPadding === 'every') {
		sizeSettings.paddingTop = paddingY;
		sizeSettings.paddingRight = paddingX;
		sizeSettings.paddingBottom = paddingY;
		sizeSettings.paddingLeft = paddingX;
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

	const togglePadding = () => {
		if (showPadding === 'all') {
			showPadding = 'axis';
		} else if (showPadding === 'axis') {
			showPadding = 'every';
		} else {
			showPadding = 'all';
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
					name="margin-x"
					autocomplete="margin"
					type="number"
					min="0"
					bind:value={marginX}
				/>
				<MarginY class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					name="margin-y"
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
<div class="flex flex-col gap-2">
	<div class="flex items-center gap-2">
		<Label>Внутренние отступы</Label>
		<Button on:click={togglePadding} variant="secondary" size="sm">
			{#if showPadding === 'all'}
				Все
			{:else if showPadding === 'axis'}
				Оси
			{:else}
				Каждый
			{/if}
		</Button>
	</div>
	<div class="flex flex-col gap-2">
		{#if showPadding === 'all'}
			<div class="flex items-center justify-center gap-2">
				<Padding class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					name="padding"
					autocomplete="padding"
					type="number"
					min="0"
					bind:value={padding}
				/>
			</div>
		{:else if showPadding === 'axis'}
			<div class="flex items-center justify-center gap-2">
				<PaddingX class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					name="padding-x"
					autocomplete="padding"
					type="number"
					min="0"
					bind:value={paddingX}
				/>
				<PaddingY class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					name="padding-y"
					autocomplete="padding"
					type="number"
					min="0"
					bind:value={paddingY}
				/>
			</div>
		{:else}
			<div class="flex items-center justify-center gap-2">
				<PaddingTop class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					name="padding-top"
					autocomplete="padding"
					type="number"
					min="0"
					bind:value={sizeSettings.paddingTop}
				/>
				<PaddingLeft class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					name="padding-left"
					autocomplete="padding"
					type="number"
					min="0"
					bind:value={sizeSettings.paddingLeft}
				/>
				<PaddingRight class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					name="padding-right"
					autocomplete="padding"
					type="number"
					min="0"
					bind:value={sizeSettings.paddingRight}
				/>
				<PaddingBottom class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
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
<!--
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
