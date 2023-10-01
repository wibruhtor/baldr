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
		d="M19 4C19.5523 4 20 4.44772 20 5V17C20 18.6569 18.6569 20 17 20H5C4.44772 20 4 19.5523 4 19C4 18.4477 4.44772 18 5 18H17C17.5523 18 18 17.5523 18 17V5C18 4.44772 18.4477 4 19 4Z"
	/>
</svg>
