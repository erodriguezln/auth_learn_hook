<script lang="ts">
  import { goto } from "$app/navigation";
  import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
  import { auth } from "$lib/firebase/firebase.client";

  export let data;
  // console.log(data.user)
  // $: if (data.user) {
  //   console.log(data.user)
  // }

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const response = await fetch('api/session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: result._tokenResponse.idToken})
      })

      console.log(response)

      if (response) {
        goto("/")
      }

      const {displayName, email, photoURL, uid} = result?.user;

    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  }

</script>

<div class="login-form">
  <button on:click={loginWithGoogle}>Login with Google</button>
</div>