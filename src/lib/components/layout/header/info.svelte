<script lang="ts" context="module">
	import { HoverCard, HoverCardTrigger } from '$lib/components/ui/hover-card';
	import { Info } from 'lucide-svelte';
	import HoverCardContent from '$lib/components/ui/hover-card/hover-card-content.svelte';
	import { PUBLIC_SITE_VERSION, PUBLIC_SERVER_VERSION } from '$env/static/public';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<script lang="ts">
</script>

<HoverCard>
	<HoverCardTrigger>
		<Button variant="ghost" size="icon" href="/about">
			<Info class="h-4 w-4" />
		</Button>
	</HoverCardTrigger>
	<HoverCardContent class="w-max">
		<div class="flex justify-between gap-2">
			<p class="typography-muted">Версия сайта</p>
			<p class="typography-muted">v{PUBLIC_SITE_VERSION}</p>
		</div>
		<div class="flex justify-between gap-2">
			<p class="typography-muted">Версия сервера</p>
			<p class="typography-muted">v{PUBLIC_SERVER_VERSION}</p>
		</div>
	</HoverCardContent>
</HoverCard>
