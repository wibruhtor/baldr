import { authService } from "$lib/service/auth.service";
import { AppError } from "$lib/utils/app-error";
import { error, type Cookies } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({url, cookies}) => {
  const accessToken = cookies.get('at') || null;
  const refreshToken = cookies.get('rt');

  if (!refreshToken) {
    return { accessToken: null, refreshToken: null }
  }
  if (!accessToken) {
    return refreshTokens(refreshToken, cookies, url)
  }

  return { accessToken, refreshToken }
}

const refreshTokens = async (refreshToken: string, cookies: Cookies, url: URL): Promise<{
  accessToken: string | null,
  refreshToken: string | null
}> => {
  try {
    const data = await authService.refreshTokens(refreshToken);

    const accessTokenPayloadInBase64 = data.accessToken.split('.')[1];
    const accessTokenPayloadInString = Buffer.from(accessTokenPayloadInBase64, 'base64').toString('utf-8');
    const { iat: iatOfAccessToken, exp: expOfAccessToken } = JSON.parse(accessTokenPayloadInString); 
    const accessTokenMaxAge = expOfAccessToken - iatOfAccessToken - 10;

    const refreshTokenPayloadInBase64 = data.refreshToken.split('.')[1];
    const refreshTokenPayloadInString = Buffer.from(refreshTokenPayloadInBase64, 'base64').toString('utf-8');
    const { iat: iatOfRefreshToken, exp: expOfRefreshToken } = JSON.parse(refreshTokenPayloadInString); 
    const refreshTokenMaxAge = expOfRefreshToken - iatOfRefreshToken - 10;

    cookies.set('at', data.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: accessTokenMaxAge,
      secure: url.protocol.includes('https')
    })
    cookies.set('rt', data.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: refreshTokenMaxAge,
      secure: url.protocol.includes('https')
    })
    return data
  } catch(e) {
    if (e instanceof AppError) {
      cookies.set('at', 'deleted', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: -1,
        secure: url.protocol.includes('https')
      })
      cookies.set('rt', 'deleted', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: -1,
        secure: url.protocol.includes('https')
      })
      throw error(e.getStatus(), { requestId: e.getRequestId(), message: e.getMessage() })
    }
    return {accessToken: null, refreshToken: null}
  }
}