import type {  RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = ({cookies, url}) => {
  const theme = url.searchParams.get('theme') || 'system';
  cookies.set('theme', theme, {path: '/', maxAge: 2147483647})
  return new Response(null, {status: 204})
}