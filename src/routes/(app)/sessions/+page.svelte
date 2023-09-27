<script lang="ts">
	import SessionsControl from '$lib/components/page/sessions/sessions-control.svelte';
	import type { Session } from '$lib/service/sessions.service';

	export let data: { sessions: Session[] };
</script>

<section class="container">
	<SessionsControl sessions={data.sessions} />
</section>
