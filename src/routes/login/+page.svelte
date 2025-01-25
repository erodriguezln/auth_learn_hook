<script lang="ts">
  import { goto } from "$app/navigation";
  import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
  import { auth } from "$lib/firebase/firebase.client";
  import type { PageData } from "./$types";

  export let data: PageData;

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userIdToken = await result.user.getIdToken()

      const response = await fetch('api/session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: userIdToken})
      })

      if (response) {
        goto("/")
      }

    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  }

</script>

{#if !data.user}
  <div class="login-form">
    <button on:click={loginWithGoogle}>Login with Google</button>
  </div>
{/if}