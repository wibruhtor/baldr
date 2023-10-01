<script lang="ts" context="module">
	import type { HTMLAttributes } from 'svelte/elements';
</script>

<script lang="ts">
	type $$Props = HTMLAttributes<SVGElement>;
</script>

<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...$$restProps}>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M7 6C6.44772 6 6 6.44772 6 7V19C6 19.5523 5.55228 20 5 20C4.44772 20 4 19.5523 4 19V7C4 5.34315 5.34315 4 7 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H7Z"
	/>
</svg>
