import type { Handle } from "@sveltejs/kit";
import { auth } from "$lib/firebase-admin/firebase.admin";

export const handle: Handle = async ({event, resolve}) => {
  const sessionToken = event.cookies.get('session');

  // console.log(`event: ${JSON.stringify(event, null, 2)}`)

  if (sessionToken && auth) {
    try {
      event.locals.user = await auth.verifySessionCookie(sessionToken, false)

      // console.log(`event.locals.user: ${JSON.stringify(event.locals.user, null, 2)}`)

    } catch (e) {
      // event.cookies.delete('session', {path: "/"});
      console.error(e)
    }
  }

  return resolve(event);
}