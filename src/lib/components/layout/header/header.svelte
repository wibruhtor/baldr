<script lang="ts" context="module">
	import AuthButton from '$lib/components/layout/header/auth-button.svelte';
	import ThemeButton from '$lib/components/layout/header/theme-button.svelte';
	import Logo from '$lib/components/ui/icon/logo.svelte';
</script>

<header class="border-b h-20 flex items-stretch justify-center">
	<section class="container flex items-center justify-between">
		<a href="/" class="flex gap-2 items-center">
			<Logo class="h-12 w-12" />
			<h1 class="typography-h3">WiBruhTor</h1>
		</a>
		<div class="flex gap-2">
			<ThemeButton />
			<AuthButton />
		</div>
	</section>
</header>
