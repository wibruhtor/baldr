<script lang="ts" context="module">
	import Field from '$lib/components/ui/field/field.svelte';
	import type { ChatColorSettings } from '$lib/types/api/entity/chat-settings';
	import ColorPicker from '$lib/components/ui/color-picker/color-picker.svelte';
	import ColorInput from '$lib/components/ui/color-picker/color-input.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { hash } from '$lib/utils/hash';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus, Trash } from 'lucide-svelte';
	import { createForm, type Errors } from '$lib/utils/create-form';
	import type { UpdateChatSettingsRequest } from '$lib/types/api/request/chat-settings';
	import Label from '$lib/components/ui/label/label.svelte';
	import { NicknameSchema } from '$lib/types/api/nickname-schema';
	import { ColorSchema } from '$lib/types/api/color-schema';
	import { z } from 'zod';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { json } from '@sveltejs/kit';

	const NewCustomNicknameSchema = z.object({
		nickname: NicknameSchema,
		startColor: ColorSchema,
		endColor: ColorSchema,
	});
</script>

<script lang="ts">
	export let colorSettings: ChatColorSettings;
	export let errors: Errors<UpdateChatSettingsRequest>['color'];
	export let isLoading: boolean;

	let {
		data: newData,
		errors: newErrors,
		validate: newValidate,
	} = createForm(
		{
			nickname: '',
			startColor: 255,
			endColor: 255,
		},
		NewCustomNicknameSchema,
	);
	let customNicknames = colorSettings.customNicknames.map((v) => ({
		...v,
		id: hash(),
	}));

	$: colorSettings.customNicknames = customNicknames.map((v) => ({
		nickname: v.nickname,
		startColor: v.startColor,
		endColor: v.endColor,
	}));

	const handleAddNewCustomNicknameClick = () => {
		if (!newValidate()) return;
		if (
			customNicknames
				.map((v) => v.nickname.toLowerCase().trim())
				.includes($newData.nickname.toLowerCase().trim())
		) {
			$newErrors.nickname = 'Никнейм уже в списке';
			return;
		}
		customNicknames = [
			...customNicknames,
			{
				...$newData,
				nickname: $newData.nickname.trim(),
				id: hash(),
			},
		];
		$newData = {
			nickname: '',
			startColor: 255,
			endColor: 255,
		};
		$newErrors.nickname = null;
	};

	const handleRemoveCustomNicknameClick = (id: string) => {
		customNicknames = customNicknames.filter((v) => v.id !== id);
	};
</script>

<Field for="nickname-color" label="Цвет никнейма" description={errors.nicknameColor} error let:id>
	<div class="flex gap-2">
		<ColorPicker class="flex-1" bind:color={colorSettings.nicknameColor} />
		<ColorInput
			class="w-0 flex-1"
			{id}
			name={id}
			autocomplete={id}
			bind:value={colorSettings.nicknameColor}
		/>
	</div>
</Field>
<Field for="background-color" label="Цвет фона" description={errors.backgroundColor} error let:id>
	<div class="flex gap-2">
		<ColorPicker class="flex-1" bind:color={colorSettings.backgroundColor} />
		<ColorInput
			class="w-0 flex-1"
			{id}
			name={id}
			autocomplete={id}
			bind:value={colorSettings.backgroundColor}
		/>
	</div>
</Field>
<Field for="text-color" label="Цвет текста" description={errors.textColor} error let:id>
	<div class="flex gap-2">
		<ColorPicker class="flex-1" bind:color={colorSettings.textColor} />
		<ColorInput
			class="w-0 flex-1"
			{id}
			name={id}
			autocomplete={id}
			bind:value={colorSettings.textColor}
		/>
	</div>
</Field>
<Field for="gradient-only-for-custom-nicknames" label="Градиент для кастомных никнеймов" let:id>
	<div class="flex items-center gap-2">
		<Switch {id} name={id} bind:checked={colorSettings.gradientOnlyForCustomNicknames} />
		<Label for={id} class="typography-muted">
			Градиент будет применяться только для кастомных никнеймов
		</Label>
	</div>
</Field>
<div class="flex flex-col gap-2">
	<Label>Кастомные никнеймы</Label>
	{#each customNicknames as custom, index (custom.id)}
		<div class="flex gap-2">
			<Field class="flex-1" description={errors.customNicknames[index]?.startColor} error>
				<div class="flex gap-2">
					<ColorPicker class="flex-1" bind:color={custom.startColor} />
					<ColorInput class="w-0 flex-1" autocomplete="off" bind:value={custom.startColor} />
				</div>
			</Field>
			<Field class="flex-1" description={errors.customNicknames[index]?.endColor} error>
				<div class="flex gap-2">
					<ColorPicker class="flex-1" bind:color={custom.endColor} />
					<ColorInput class="w-0 flex-1" autocomplete="off" bind:value={custom.endColor} />
				</div>
			</Field>
			<Field class="flex-1" description={errors.customNicknames[index]?.nickname} error let:id>
				<Input {id} name={id} autocomplete="nickname" bind:value={custom.nickname} />
			</Field>
			<Button
				on:click={() => handleRemoveCustomNicknameClick(custom.id)}
				variant="destructive"
				size="icon"
				disabled={isLoading}
			>
				<Trash class="h-4 w-4" />
			</Button>
		</div>
	{/each}
	<div class="flex gap-2">
		<Field class="flex-1" description={$newErrors.startColor} error>
			<div class="flex gap-2">
				<ColorPicker class="flex-1" bind:color={$newData.startColor} />
				<ColorInput class="w-0 flex-1" autocomplete="off" bind:value={$newData.startColor} />
			</div>
		</Field>
		<Field class="flex-1" description={$newErrors.endColor} error>
			<div class="flex gap-2">
				<ColorPicker class="flex-1" bind:color={$newData.endColor} />
				<ColorInput class="w-0 flex-1" autocomplete="off" bind:value={$newData.endColor} />
			</div>
		</Field>
		<Field class="flex-1" for="new-custom-nickname" description={$newErrors.nickname} error let:id>
			<Input {id} name={id} autocomplete="nickname" bind:value={$newData.nickname} />
		</Field>
		<Button
			on:click={handleAddNewCustomNicknameClick}
			variant="outline"
			size="icon"
			disabled={isLoading}
		>
			<Plus class="h-4 w-4" />
		</Button>
	</div>
</div>
