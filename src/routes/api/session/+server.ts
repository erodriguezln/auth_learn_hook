import { json } from '@sveltejs/kit';
import { auth } from '$lib/firebase-admin/firebase.admin'

export async function POST({request, cookies}) {
  const {token} = await request.json();

  // console.log('Auth app name:', auth.app?.name);
  // console.log('Auth type:', auth.constructor.name);

  if (!auth) {
    return json({error: 'Firebase not initialized'}, {status: 500})
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    cookies.set('session', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn
    });

    // console.log('Decoded Token:', decodedToken);

    return json({status: 'success'});
  } catch (error) {
    return json({error: 'Unauthorized'}, {status: 401});
  }
}

export async function DELETE({cookies}) {
  cookies.delete('session', {path: '/'});
  return json({status: 'success'});
}