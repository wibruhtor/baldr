import type { Session } from '$lib/types/api/entity/session';

export type AllSessionsResponse = { sessions: Session[] };

export type DeleteSessionResponse = true;

export type DeleteAllSessionsExcludeCurrentResponse = true;
