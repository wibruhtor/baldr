<script lang="ts" context="module">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Palette } from 'lucide-svelte';
	import { Popover, PopoverTrigger } from '$lib/components/ui/popover';
	import { theme } from '$lib/stores/theme.store';
	import PopoverContent from '$lib/components/ui/popover/popover-content.svelte';
</script>

<script lang="ts">
</script>

<Popover positioning={{ placement: 'bottom-end' }}>
	<PopoverTrigger asChild let:builder>
		<Button builders={[builder]} size="icon" variant="outline">
			<Palette class="w-4 h-4" />
		</Button>
	</PopoverTrigger>
	<PopoverContent class="w-40 flex flex-col gap-2">
		<Button
			on:click={() => theme.set('light')}
			variant={$theme === 'light' ? 'secondary' : 'ghost'}
		>
			Светлая
		</Button>
		<Button on:click={() => theme.set('dark')} variant={$theme === 'dark' ? 'secondary' : 'ghost'}>
			Темная
		</Button>
		<Button
			on:click={() => theme.set('system')}
			variant={$theme === 'system' ? 'secondary' : 'ghost'}
		>
			Системная
		</Button>
	</PopoverContent>
</Popover>
