import { wetch } from '$lib/utils/wetch';

export type AuthorizeUrlResponse = { url: string };
export type ExchangeCodeResponse = { accessToken: string; refreshToken: string };
export type RefreshTokensResponse = { accessToken: string; refreshToken: string };
export type LogoutResponse = true;

class AuthService {
	async getAuthorizeUrl(): Promise<AuthorizeUrlResponse> {
		return wetch<AuthorizeUrlResponse>('/auth/authorize');
	}

	async exchangeCode(code: string): Promise<ExchangeCodeResponse> {
		return wetch<ExchangeCodeResponse>('/auth/exchange', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ code }),
		});
	}

	async refreshTokens(refreshToken: string): Promise<RefreshTokensResponse> {
		return wetch<RefreshTokensResponse>('/auth/refresh', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: refreshToken }),
		});
	}

	async logout(accessToken: string): Promise<LogoutResponse> {
		return wetch<LogoutResponse>('/auth/logout', {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}
}

export const authService = new AuthService();
