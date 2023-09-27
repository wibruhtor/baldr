import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies, url }) => {
	try {
		const { accessToken, refreshToken } = await request.json();

		const accessTokenPayloadInBase64 = accessToken.split('.')[1];
		const accessTokenPayloadInString = Buffer.from(accessTokenPayloadInBase64, 'base64').toString(
			'utf-8',
		);
		const { iat: iatOfAccessToken, exp: expOfAccessToken } = JSON.parse(accessTokenPayloadInString);
		const accessTokenMaxAge = expOfAccessToken - iatOfAccessToken - 10;

		const refreshTokenPayloadInBase64 = refreshToken.split('.')[1];
		const refreshTokenPayloadInString = Buffer.from(refreshTokenPayloadInBase64, 'base64').toString(
			'utf-8',
		);
		const { iat: iatOfRefreshToken, exp: expOfRefreshToken } = JSON.parse(
			refreshTokenPayloadInString,
		);
		const refreshTokenMaxAge = expOfRefreshToken - iatOfRefreshToken - 10;

		cookies.set('at', accessToken, {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			maxAge: accessTokenMaxAge,
			secure: url.protocol.includes('https'),
		});
		cookies.set('rt', refreshToken, {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			maxAge: refreshTokenMaxAge,
			secure: url.protocol.includes('https'),
		});
	} catch (e) {
		throw json({ message: 'неверные данные' }, { status: 400 });
	}
	return new Response(null, { status: 204 });
};

export const DELETE: RequestHandler = async ({ url, cookies }) => {
	cookies.set('at', 'deleted', {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: -1,
		secure: url.protocol.includes('https'),
	});
	cookies.set('rt', 'deleted', {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: -1,
		secure: url.protocol.includes('https'),
	});
	return new Response(null, { status: 204 });
};
