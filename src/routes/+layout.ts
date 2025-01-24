import { initializeFirebase, auth } from "$lib/firebase/firebase.client";
import { browser } from "$app/environment";
import { onAuthStateChanged, type User } from "firebase/auth"
import { type Writable, writable } from "svelte/store";

export async function load({data, url}) {
  // console.log(data)
  // TODO complementar el type locals.users en app.d.ts para que cumpla con User
  // const userStore: Writable<User | null> = writable(data.user || null)
  // console.log(auth)
  if (browser) {
    try {
      initializeFirebase()
    } catch (e) {
      console.error(e)
    }
  }

  function getAuthUser(): Promise<User | false> {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user as User);
        } else {
          resolve(false)
        }
      })
    })
  }

  // in browser means it's not running on ssr
  if (browser) {
    const authUser: User | false = await getAuthUser();
    if (authUser) {
      // console.log('Resolved authUser:', authUser);

      const idToken = await authUser.getIdToken()
      const response = await fetch('api/session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: idToken})
      })
      // userStore.set(authUser)
      // console.log(response)

    } else {
      await fetch('/api/session', {method: 'DELETE'});
      // userStore.set(null);
    }
  }

  return {
    // user: userStore,
    // userStore: userStore,
    // getAuthUser,
    user: data.user,
    url
  }
}