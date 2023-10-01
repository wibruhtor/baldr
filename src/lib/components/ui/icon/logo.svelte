<script lang="ts" context="module">
	import type { HTMLAttributes } from 'svelte/elements';
</script>

<script lang="ts">
	type $$Props = HTMLAttributes<SVGElement>;
</script>

<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...$$restProps}>
	<path
		class="fill-primary"
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V5C22 3.34315 20.6569 2 19 2H5Z"
	/>
	<path
		class="fill-primary-foreground"
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M6.55277 12.3416C5.55541 10.3469 7.0059 8 9.23605 8H14.7639C16.9941 8 18.4445 10.3469 17.4472 12.3416L15.8944 15.4472C15.6474 15.9412 15.0467 16.1414 14.5528 15.8944C14.0588 15.6474 13.8586 15.0468 14.1056 14.5528L15.6583 11.4472C15.9908 10.7823 15.5073 10 14.7639 10H9.23605C8.49267 10 8.00917 10.7823 8.34162 11.4472L9.89441 14.5528C10.1414 15.0468 9.94117 15.6474 9.44719 15.8944C8.95322 16.1414 8.35254 15.9412 8.10555 15.4472L6.55277 12.3416Z"
	/>
</svg>
