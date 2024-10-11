import { type RequestHandler } from '@sveltejs/kit';

const emojiResponse = async (res: Response) => {
  const blob = await res.blob()
	return new Response(
    blob, 
    { 
      status: 200,
      headers: {
        'Content-Type': 'image/png',
      } 
    }
  );
}

export const GET: RequestHandler = async ({ params }) => {
  try {
    let res = await fetch(`https://projects.iamcal.com/emoji-data/img-apple-64/${params.id}.png`);
    if (res.status === 200) return emojiResponse(res);
    res = await fetch(`https://projects.iamcal.com/emoji-data/img-twitter-64/${params.id}.png`);
    if (res.status === 200) return emojiResponse(res);
    res = await fetch(`https://projects.iamcal.com/emoji-data/img-google-64/${params.id}.png`);
    if (res.status === 200) return emojiResponse(res);
    res = await fetch(`https://projects.iamcal.com/emoji-data/img-facebook-64/${params.id}.png`);
    if (res.status === 200) return emojiResponse(res);
  } catch {}
	return new Response(null, { status: 404 });
}