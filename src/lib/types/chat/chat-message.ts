import type { TwitchBadge } from '$lib/types/api/entity/twitch-badge';

export type ChatMessage = {
	id: string;
	timestamp: number;
	color: string | null;
	nickname: string;
	badges: TwitchBadge[];
	text: string;
};
