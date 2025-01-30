import { initializeFirebase } from "$lib/firebase/firebase.client";
import { browser } from "$app/environment";

export async function load({data, url}) {

  // if (browser) {
    try {
      initializeFirebase()
    } catch (e) {
      console.error(e)
    }
  // }

  return {
    user: data.user,
    url
  }
}