export type AuthorizeUrlResponse = { url: string };

export type ExchangeCodeResponse = { accessToken: string; refreshToken: string };

export type RefreshTokensResponse = { accessToken: string; refreshToken: string };

export type LogoutResponse = true;