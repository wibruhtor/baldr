<script lang="ts">
	import SessionsControl from '$lib/components/page/sessions/sessions-control.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="container">
	<SessionsControl sessions={data.sessions} />
</section>
