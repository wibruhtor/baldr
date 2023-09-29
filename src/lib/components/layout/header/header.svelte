<script lang="ts" context="module">
	import AuthButton from '$lib/components/layout/header/auth-button.svelte';
</script>

<header class="border-b h-20 flex items-stretch justify-center">
	<section class="container flex items-center justify-between">
		<a href="/" class="flex gap-2 items-center">
			<img src="/favicon.svg" alt="Логотип" width="48" height="48" />
			<h1 class="typography-h3">WiBruhTor</h1>
		</a>
		<AuthButton />
	</section>
</header>
