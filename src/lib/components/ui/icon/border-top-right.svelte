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
		d="M4 5C4 4.44772 4.44772 4 5 4H17C18.6569 4 20 5.34315 20 7V19C20 19.5523 19.5523 20 19 20C18.4477 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H5C4.44772 6 4 5.55228 4 5Z"
	/>
</svg>
