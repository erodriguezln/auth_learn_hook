import { json } from '@sveltejs/kit';
import { auth } from '$lib/firebase-admin/firebase.admin'

export async function POST({request, cookies}) {
  const {token} = await request.json();

  if (!auth) {
    return json({error: 'Firebase not initialized'}, {status: 500})
  }

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    let sessionCookie = await auth.createSessionCookie(token, {expiresIn: expiresIn})
    // console.log("SESSION COOKIE")
    // console.log(sessionCookie)

    cookies.set('session', sessionCookie, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn
    });

    return json({status: 'success'});
  } catch (error) {
    return json({error: 'Unauthorized'}, {status: 401});
  }
}

export async function DELETE({cookies}) {
  cookies.delete('session', {path: '/'});
  return json({status: 'success'});
}