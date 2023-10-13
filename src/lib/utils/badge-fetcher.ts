import { browser } from '$app/environment';
import type { TwitchBadge } from '$lib/types/api/entity/twitch-badge';
import { wetch } from '$lib/utils/wetch';

type BadgeRecord = {
	global: TwitchBadge[];
	channel: TwitchBadge[];
};
const initialBadges: TwitchBadge[] = [];
const initialBadge: BadgeRecord = {
	global: [],
	channel: [],
};

class BadgeFetcher {
	private badges = initialBadges;
	private badge = initialBadge;

	getBadges(): TwitchBadge[] {
		return this.badges;
	}

	getEmoteRecord(): BadgeRecord {
		return this.badge;
	}

	async fetch(channelId: string): Promise<TwitchBadge[]> {
		if (!browser) return [];
		const [twitchGlobal, twitchChannel] = await Promise.allSettled([
			this.fetchTwitchGlobal(),
			this.fetchTwitchChannel(channelId),
		]);

		this.badges = initialBadges;
		this.badge = initialBadge;
		if (twitchGlobal.status === 'fulfilled') {
			this.badge.global = twitchGlobal.value;
			this.badges.push(...twitchGlobal.value);
		} else {
			console.error('Fail load twitch global badges', twitchGlobal.reason);
		}
		if (twitchChannel.status === 'fulfilled') {
			this.badge.channel = twitchChannel.value;
			this.badges.push(...twitchChannel.value);
		} else {
			console.error('Fail load twitch channel badges', twitchChannel.reason);
		}
		return this.badges;
	}

	async fetchTwitchGlobal(): Promise<TwitchBadge[]> {
		return wetch<TwitchBadge[]>('/v1/twitch/badges/global');
	}

	async fetchTwitchChannel(channelId: string): Promise<TwitchBadge[]> {
		return wetch<TwitchBadge[]>('/v1/twitch/badges/' + channelId);
	}
}
export const badgeFetcher = new BadgeFetcher();
