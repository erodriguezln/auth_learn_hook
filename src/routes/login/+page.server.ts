import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({locals}) => {
  if (locals.user) {
    console.log(`login+page.server.ts: ${JSON.stringify(locals.user, null, 2)}`)
    // throw redirect(303, "/")
  }
  return {
    user: locals.user
  }
}) satisfies PageServerLoad