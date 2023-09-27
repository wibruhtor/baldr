import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({cookies}) => {
  const accessToken = cookies.get('at') || null;
  const refreshToken = cookies.get('rt');

  if (!refreshToken) {
    return { accessToken: null, refreshToken: null }
  }

  return { accessToken, refreshToken }
}