import { json, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { auth, initializeFirebase, signOut } from "$lib/firebase/firebase.client";

export const actions = {
  default: async ({request, cookies, fetch}) => {
    const form = await request.formData();
    // const token = form.get('token');

    // initializeFirebase()

    console.log("DELETE FORM")
    console.log(`logout auth: ${JSON.stringify(auth, null, 2)}`)

    cookies.delete('session', {path: '/'});
    // // locals.user = undefined
    //
    // await signOut()

    throw redirect(303, "/")

  }
} satisfies Actions