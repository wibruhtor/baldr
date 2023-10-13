import type { SvelteComponent } from "svelte";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SvelteComponentConstructor = new (...args: any[]) => SvelteComponent;
