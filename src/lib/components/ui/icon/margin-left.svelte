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
		d="M3 8C3.55228 8 4 7.55228 4 7C4 6.44772 3.55228 6 3 6C2.44772 6 2 6.44772 2 7C2 7.55228 2.44772 8 3 8ZM9 6C7.34315 6 6 7.34315 6 9V15C6 16.6569 7.34315 18 9 18H15C16.6569 18 18 16.6569 18 15V9C18 7.34315 16.6569 6 15 6H9ZM8 9C8 8.44772 8.44772 8 9 8H15C15.5523 8 16 8.44772 16 9V15C16 15.5523 15.5523 16 15 16H9C8.44772 16 8 15.5523 8 15V9ZM4 17C4 17.5523 3.55228 18 3 18C2.44772 18 2 17.5523 2 17C2 16.4477 2.44772 16 3 16C3.55228 16 4 16.4477 4 17ZM4 11C4 10.4477 3.55228 10 3 10C2.44772 10 2 10.4477 2 11V13C2 13.5523 2.44772 14 3 14C3.55228 14 4 13.5523 4 13V11Z"
	/>
</svg>
