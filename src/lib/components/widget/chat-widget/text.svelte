<script lang="ts" context="module">
	import {
		chatStoreContextKey,
		type WritableChatStore,
	} from '$lib/components/widget/chat-widget/chat-store';
	import { getContext } from 'svelte';
</script>

<script lang="ts">
	export let text: string;

	const chatStore = getContext<WritableChatStore>(chatStoreContextKey);

	$: showSeparator =
		$chatStore.settings.chatType !== 'alternative-block' &&
		$chatStore.settings.chatType !== 'alternative-block-reverse';

	$: separtor = showSeparator ? ': ' : '';
</script>

<span style="overflow: hidden">{separtor}{@html text}</span>

<style lang="postcss">
	:global(.emote) {
		position: relative;
		display: inline-block;
		height: 1.5em;
		vertical-align: bottom;
		margin-right: 0.1em;
	}

	:global(.emote img) {
		height: 100%;
		width: 100%;
	}

	:global(.emote__overlay) {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}

	:global(.emote--cursed) {
		filter: contrast(3) brightness(0.6) grayscale(1);
	}

	:global(.emote--rainbow) {
		animation: rainbow 4s linear infinite;
	}

	:global(.emote--flip-x) {
		transform: rotateY(180deg);
	}

	:global(.emote--flip-y) {
		transform: rotateX(180deg);
	}

	:global(.emote--grow-x) {
		aspect-ratio: 3 / 1;
	}

	:global(.emote--red) {
		filter: contrast(2) hue-rotate(-50deg) saturate(5);
	}

	:global(.emote--shake) {
		animation: shake .15s linear infinite;
	}

	:global(.emote--bounce) {
		animation: bounce .75s linear infinite;
		transform-origin: bottom;
	}

	:global(.emote--jam) {
		animation: jam .5s linear infinite;
	}

	:global(.emote--rotate-left) {
		transform: rotateZ(-90deg);
	}

	:global(.emote--rotate-right) {
		transform: rotateZ(90deg);
	}

	@keyframes rainbow {
		from {
			filter:hue-rotate(0deg);
		}
		to {
			filter:hue-rotate(360deg);
		}
	}

	@keyframes shake {
		0% {
			transform: translate(0.02em, 0.02em);
		}

		10% {
			transform: translate(-0.02em, -0.04em);
		}

		20% {
			transform: translate(-0.06em, 0em);
		}

		30% {
			transform: translate(0.06em, 0.04em);
		}

		40% {
			transform: translate(0.02em, -0.02em);
		}

		50% {
			transform: translate(-0.02em, 0.04em);
		}

		60% {
			transform: translate(-0.06em, 0.02em);
		}

		70% {
			transform: translate(0.06em, 0.02em);
		}

		80% {
			transform: translate(-0.02em, -0.02em);
		}

		90% {
			transform: translate(0.02em, 0.04em);
		}

		100% {
			transform: translate(0.02em, -0.04em);
		}
	}

	@keyframes bounce {
		0% {
			transform: rotateY(0deg) scaleY(1);
		}
		25% {
			transform: rotateY(0deg) scaleY(0.5);
		}
		26% {
			transform: rotateY(180deg) scaleY(0.5);
		}
		50% {
			transform: rotateY(180deg) scaleY(1);
		}
		75% {
			transform: rotateY(180deg) scaleY(0.5);
		}
		76% {
			transform: rotateY(0deg) scaleY(0.5);
		}
		100% {
			transform: rotateY(0deg) scaleY(1);
		}
	}

	@keyframes jam {
		0% {
			transform: translate(-0.04em, -0.04em) rotate(-6deg);
		}

		10% {
			transform: translate(-0.03em, -0.04em) rotate(-8deg);
		}

		20% {
			transform: translate(0.02em, -0.03em) rotate(-8deg);
		}

		30% {
			transform: translate(0.06em, 0.05em) rotate(-6deg);
		}

		40% {
			transform: translate(0.06em, 0.08em) rotate(-2deg);
		}

		50% {
			transform: translate(0.04em, 0.08em) rotate(3deg);
		}

		60% {
			transform: translate(0.02em, 0.08em) rotate(3deg);
		}

		70% {
			transform: translate(-0.01em, 0.06em) rotate(2deg);
		}

		80% {
			transform: translate(-0.025em, 0.02em) rotate(0deg);
		}

		90% {
			transform: translate(-0.035em, -0.01em) rotate(-2deg);
		}

		100% {
			transform: translate(-0.04em, -0.04em) rotate(-5deg);
		}
	}
</style>
