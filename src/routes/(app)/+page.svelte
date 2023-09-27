<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { theme } from '$lib/stores/theme.store';
</script>

<section class="container">
	<Button>Кнопка</Button>
	{$theme}
	<Button variant="secondary" on:click={() => theme.set('dark')}>Темная</Button>
	<Button variant="secondary" on:click={() => theme.set('light')}>Светлая</Button>
	<Button variant="secondary" on:click={() => theme.set('system')}>Системная</Button>
</section>
