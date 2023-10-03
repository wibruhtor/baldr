import type {
	AuthorizeUrlResponse,
	ExchangeCodeResponse,
	LogoutResponse,
	RefreshTokensResponse,
} from '$lib/types/api/response/auth';
import { wetch } from '$lib/utils/wetch';

class AuthService {
	async getAuthorizeUrl(): Promise<AuthorizeUrlResponse> {
		return wetch<AuthorizeUrlResponse>('/auth/authorize');
	}

	async exchangeCode(code: string, headers?: HeadersInit): Promise<ExchangeCodeResponse> {
		return wetch<ExchangeCodeResponse>('/auth/exchange', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...headers
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
