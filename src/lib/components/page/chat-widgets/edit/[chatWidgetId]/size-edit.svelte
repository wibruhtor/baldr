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
	import BorderTopLeft from '$lib/components/ui/icon/border-top-left.svelte';
	import BorderTopRight from '$lib/components/ui/icon/border-top-right.svelte';
	import BorderBottomLeft from '$lib/components/ui/icon/border-bottom-left.svelte';
	import BorderBottomRight from '$lib/components/ui/icon/border-bottom-right.svelte';
	import type { Errors } from '$lib/utils/create-form';
	import type { UpdateChatSettingsRequest } from '$lib/types/api/request/chat-settings';
</script>

<script lang="ts">
	export let sizeSettings: ChatSizeSettings;
	export let errors: Errors<UpdateChatSettingsRequest>['size'];
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
	let showRadius: 'all' | 'every' = 'every';
	let radius = Math.max(
		sizeSettings.borderTopLeftRadius,
		sizeSettings.borderTopRightRadius,
		sizeSettings.borderBottomLeftRadius,
		sizeSettings.borderBottomRightRadius,
	);

	$: {
		if (typeof sizeSettings.marginTop === 'string') {
			sizeSettings.marginTop = Number.parseFloat(sizeSettings.marginTop);
		}
		if (typeof sizeSettings.marginRight === 'string') {
			sizeSettings.marginRight = Number.parseFloat(sizeSettings.marginRight);
		}
		if (typeof sizeSettings.marginBottom === 'string') {
			sizeSettings.marginBottom = Number.parseFloat(sizeSettings.marginBottom);
		}
		if (typeof sizeSettings.marginLeft === 'string') {
			sizeSettings.marginLeft = Number.parseFloat(sizeSettings.marginLeft);
		}
		if (typeof sizeSettings.paddingTop === 'string') {
			sizeSettings.paddingTop = Number.parseFloat(sizeSettings.paddingTop);
		}
		if (typeof sizeSettings.paddingRight === 'string') {
			sizeSettings.paddingRight = Number.parseFloat(sizeSettings.paddingRight);
		}
		if (typeof sizeSettings.paddingBottom === 'string') {
			sizeSettings.paddingBottom = Number.parseFloat(sizeSettings.paddingBottom);
		}
		if (typeof sizeSettings.paddingLeft === 'string') {
			sizeSettings.paddingLeft = Number.parseFloat(sizeSettings.paddingLeft);
		}
		if (typeof sizeSettings.borderTopLeftRadius === 'string') {
			sizeSettings.borderTopLeftRadius = Number.parseFloat(sizeSettings.borderTopLeftRadius);
		}
		if (typeof sizeSettings.borderBottomRightRadius === 'string') {
			sizeSettings.borderBottomRightRadius = Number.parseFloat(
				sizeSettings.borderBottomRightRadius,
			);
		}
		if (typeof sizeSettings.borderBottomLeftRadius === 'string') {
			sizeSettings.borderBottomLeftRadius = Number.parseFloat(sizeSettings.borderBottomLeftRadius);
		}
		if (typeof sizeSettings.borderBottomRightRadius === 'string') {
			sizeSettings.borderBottomRightRadius = Number.parseFloat(
				sizeSettings.borderBottomRightRadius,
			);
		}
		if (typeof sizeSettings.maxMessages === 'string') {
			sizeSettings.maxMessages = Number.parseInt(sizeSettings.maxMessages);
		}
	}
	$: if (showMargin === 'all') {
		sizeSettings.marginTop = margin;
		sizeSettings.marginRight = margin;
		sizeSettings.marginBottom = margin;
		sizeSettings.marginLeft = margin;
	}
	$: if (showMargin === 'axis') {
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
	$: if (showPadding === 'axis') {
		sizeSettings.paddingTop = paddingY;
		sizeSettings.paddingRight = paddingX;
		sizeSettings.paddingBottom = paddingY;
		sizeSettings.paddingLeft = paddingX;
	}
	$: if (showRadius === 'all') {
		sizeSettings.borderTopLeftRadius = radius;
		sizeSettings.borderTopRightRadius = radius;
		sizeSettings.borderBottomLeftRadius = radius;
		sizeSettings.borderBottomRightRadius = radius;
	}

	const toggleMargin = () => {
		if (showMargin === 'all') {
			showMargin = 'axis';
			marginX = Math.max(sizeSettings.marginLeft, sizeSettings.marginRight);
			marginY = Math.max(sizeSettings.marginTop, sizeSettings.marginBottom);
		} else if (showMargin === 'axis') {
			showMargin = 'every';
		} else {
			showMargin = 'all';
			margin = Math.max(
				sizeSettings.marginTop,
				sizeSettings.marginBottom,
				sizeSettings.marginLeft,
				sizeSettings.marginRight,
			);
		}
	};

	const togglePadding = () => {
		if (showPadding === 'all') {
			showPadding = 'axis';
			paddingX = Math.max(sizeSettings.paddingLeft, sizeSettings.paddingRight);
			paddingY = Math.max(sizeSettings.paddingTop, sizeSettings.paddingBottom);
		} else if (showPadding === 'axis') {
			showPadding = 'every';
		} else {
			showPadding = 'all';
			padding = Math.max(
				sizeSettings.paddingTop,
				sizeSettings.paddingBottom,
				sizeSettings.paddingLeft,
				sizeSettings.paddingRight,
			);
		}
	};

	const toggleRadius = () => {
		if (showRadius === 'all') {
			showRadius = 'every';
		} else {
			showRadius = 'all';
			radius = Math.max(
				sizeSettings.borderTopLeftRadius,
				sizeSettings.borderTopRightRadius,
				sizeSettings.borderBottomLeftRadius,
				sizeSettings.borderBottomRightRadius,
			);
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
	{#if showMargin === 'all'}
		<Field
			for="margin"
			description={errors.marginTop ||
				errors.marginRight ||
				errors.marginBottom ||
				errors.marginLeft}
			error
			let:id
		>
			<div class="flex items-center gap-2">
				<Margin class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					{id}
					name={id}
					autocomplete={id}
					type="number"
					min="0"
					step="0.25"
					bind:value={margin}
				/>
			</div>
		</Field>
	{:else if showMargin === 'axis'}
		<div class="flex gap-2">
			<Field
				for="margin-x"
				class="flex-1"
				description={errors.marginRight || errors.marginLeft}
				error
				let:id
			>
				<div class="flex items-center gap-2">
					<MarginX class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={marginX}
					/>
				</div>
			</Field>
			<Field
				for="margin-y"
				class="flex-1"
				description={errors.marginTop || errors.marginBottom}
				error
				let:id
			>
				<div class="flex items-center gap-2">
					<MarginY class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={marginY}
					/>
				</div>
			</Field>
		</div>
	{:else}
		<div class="flex items-center gap-2">
			<Field for="margin-top" class="flex-1" description={errors.marginTop} error let:id>
				<div class="flex items-center gap-2">
					<MarginTop class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={sizeSettings.marginTop}
					/>
				</div>
			</Field>
			<Field for="margin-left" class="flex-1" description={errors.marginLeft} error let:id>
				<div class="flex items-center gap-2">
					<MarginLeft class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={sizeSettings.marginLeft}
					/>
				</div>
			</Field>
			<Field for="margin-right" class="flex-1" description={errors.marginRight} error let:id>
				<div class="flex items-center gap-2">
					<MarginRight class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={sizeSettings.marginRight}
					/>
				</div>
			</Field>
			<Field for="margin-bottom" class="flex-1" description={errors.marginBottom} error let:id>
				<div class="flex items-center gap-2">
					<MarginBottom class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={sizeSettings.marginBottom}
					/>
				</div>
			</Field>
		</div>
	{/if}
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
	{#if showPadding === 'all'}
		<Field
			for="padding"
			description={errors.paddingTop ||
				errors.paddingRight ||
				errors.paddingBottom ||
				errors.paddingLeft}
			error
			let:id
		>
			<div class="flex items-center gap-2">
				<Padding class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					{id}
					name={id}
					autocomplete={id}
					type="number"
					min="0"
					step="0.25"
					bind:value={padding}
				/>
			</div>
		</Field>
	{:else if showPadding === 'axis'}
		<div class="flex gap-2">
			<Field
				for="padding-x"
				class="flex-1"
				description={errors.paddingRight || errors.paddingLeft}
				error
				let:id
			>
				<div class="flex items-center gap-2">
					<PaddingX class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={paddingX}
					/>
				</div>
			</Field>
			<Field
				for="padding-y"
				class="flex-1"
				description={errors.paddingTop || errors.paddingBottom}
				error
				let:id
			>
				<div class="flex items-center gap-2">
					<PaddingY class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={paddingY}
					/>
				</div>
			</Field>
		</div>
	{:else}
		<div class="flex gap-2">
			<Field for="padding-top" class="flex-1" description={errors.paddingTop} error let:id>
				<div class="flex items-center gap-2">
					<PaddingTop class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={sizeSettings.paddingTop}
					/>
				</div>
			</Field>
			<Field for="padding-left" class="flex-1" description={errors.paddingLeft} error let:id>
				<div class="flex items-center gap-2">
					<PaddingLeft class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={sizeSettings.paddingLeft}
					/>
				</div>
			</Field>
			<Field for="padding-right" class="flex-1" description={errors.paddingRight} error let:id>
				<div class="flex items-center gap-2">
					<PaddingRight class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={sizeSettings.paddingRight}
					/>
				</div>
			</Field>
			<Field for="padding-bottom" class="flex-1" description={errors.paddingBottom} error let:id>
				<div class="flex items-center gap-2">
					<PaddingBottom class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={sizeSettings.paddingBottom}
					/>
				</div>
			</Field>
		</div>
	{/if}
</div>
<div class="flex flex-col gap-2">
	<div class="flex items-center gap-2">
		<Label>Закругления</Label>
		<Button on:click={toggleRadius} variant="secondary" size="sm">
			{#if showRadius === 'all'}
				Все
			{:else}
				Каждый
			{/if}
		</Button>
	</div>
	{#if showRadius === 'all'}
		<Field
			for="radius"
			description={errors.borderTopLeftRadius ||
				errors.borderTopRightRadius ||
				errors.borderBottomLeftRadius ||
				errors.borderBottomRightRadius}
			error
			let:id
		>
			<div class="flex items-center gap-2">
				<BorderTopLeft class="h-4 w-4" />
				<Input
					class="w-0 flex-1"
					{id}
					name={id}
					autocomplete={id}
					type="number"
					min="0"
					step="0.25"
					bind:value={radius}
				/>
			</div>
		</Field>
	{:else}
		<div class="flex gap-2">
			<Field
				for="radius-top-left"
				class="flex-1"
				description={errors.borderTopLeftRadius}
				error
				let:id
			>
				<div class="flex items-center gap-2">
					<BorderTopLeft class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={sizeSettings.borderTopLeftRadius}
					/>
				</div>
			</Field>
			<Field
				for="radius-top-right"
				class="flex-1"
				description={errors.borderTopRightRadius}
				error
				let:id
			>
				<div class="flex items-center gap-2">
					<BorderTopRight class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={sizeSettings.borderTopRightRadius}
					/>
				</div>
			</Field>
			<Field
				for="radius-bottom-left"
				class="flex-1"
				description={errors.borderBottomLeftRadius}
				error
				let:id
			>
				<div class="flex items-center gap-2">
					<BorderBottomLeft class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={sizeSettings.borderBottomLeftRadius}
					/>
				</div>
			</Field>
			<Field
				for="radius-bottom-right"
				class="flex-1"
				description={errors.borderBottomRightRadius}
				error
				let:id
			>
				<div class="flex items-center gap-2">
					<BorderBottomRight class="h-4 w-4" />
					<Input
						class="w-0 flex-1"
						{id}
						name={id}
						autocomplete={id}
						type="number"
						min="0"
						step="0.25"
						bind:value={sizeSettings.borderBottomRightRadius}
					/>
				</div>
			</Field>
		</div>
	{/if}
</div>
<Field
	for="max-messages"
	label="Максимальное число сообщений"
	description={errors.maxMessages}
	error
	let:id
>
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
