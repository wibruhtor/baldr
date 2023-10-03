import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { authService } from '$lib/service/auth.service';
import { AppError } from '$lib/utils/app-error';

export const load: PageServerLoad = async ({ url, cookies, request }) => {
	const code = url.searchParams.get('code');

	if (!code) {
		const message = url.searchParams.get('error') || 'Неверный запрос';
		const description = url.searchParams.get('error_description');
		throw error(400, { message, description });
	}

	try {
		const data = await authService.exchangeCode(code, {
			'User-Agent': request.headers.get('User-Agent') || 'unknown'
		});

		const accessTokenPayloadInBase64 = data.accessToken.split('.')[1];
		const accessTokenPayloadInString = Buffer.from(accessTokenPayloadInBase64, 'base64').toString(
			'utf-8',
		);
		const { iat: iatOfAccessToken, exp: expOfAccessToken } = JSON.parse(accessTokenPayloadInString);
		const accessTokenMaxAge = expOfAccessToken - iatOfAccessToken - 10;

		const refreshTokenPayloadInBase64 = data.refreshToken.split('.')[1];
		const refreshTokenPayloadInString = Buffer.from(refreshTokenPayloadInBase64, 'base64').toString(
			'utf-8',
		);
		const { iat: iatOfRefreshToken, exp: expOfRefreshToken } = JSON.parse(
			refreshTokenPayloadInString,
		);
		const refreshTokenMaxAge = expOfRefreshToken - iatOfRefreshToken - 10;

		cookies.set('at', data.accessToken, {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			maxAge: accessTokenMaxAge,
			secure: url.protocol.includes('https'),
		});
		cookies.set('rt', data.refreshToken, {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			maxAge: refreshTokenMaxAge,
			secure: url.protocol.includes('https'),
		});
	} catch (e) {
		if (e instanceof AppError) {
			throw error(e.getStatus(), { requestId: e.getRequestId(), message: e.getMessage() });
		}
	}

	throw redirect(307, '/');
};
