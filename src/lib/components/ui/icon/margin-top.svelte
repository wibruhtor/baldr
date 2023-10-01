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
		d="M17 4C17.5523 4 18 3.55228 18 3C18 2.44772 17.5523 2 17 2C16.4477 2 16 2.44772 16 3C16 3.55228 16.4477 4 17 4ZM9 6C7.34315 6 6 7.34315 6 9V15C6 16.6569 7.34315 18 9 18H15C16.6569 18 18 16.6569 18 15V9C18 7.34315 16.6569 6 15 6H9ZM8 9C8 8.44772 8.44772 8 9 8H15C15.5523 8 16 8.44772 16 9V15C16 15.5523 15.5523 16 15 16H9C8.44772 16 8 15.5523 8 15V9ZM8 3C8 3.55228 7.55228 4 7 4C6.44772 4 6 3.55228 6 3C6 2.44772 6.44772 2 7 2C7.55228 2 8 2.44772 8 3ZM11 2C10.4477 2 10 2.44772 10 3C10 3.55228 10.4477 4 11 4H13C13.5523 4 14 3.55228 14 3C14 2.44772 13.5523 2 13 2H11Z"
	/>
</svg>
