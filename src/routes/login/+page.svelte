<script lang="ts">
  import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
  import { auth } from '$lib/firebase/firebase.client';
  import type { PageData } from './$types';

  export let data: PageData;
  let form: HTMLFormElement;

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userIdToken = await result.user.getIdToken();

      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'token';
      input.value = userIdToken;

      form.appendChild(input);
      form.submit();
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  }
</script>

<!--{#if !data.user}-->
<div class="login-form">
  <form
      method="POST"
      bind:this={form}
  />
  <button
      type="button"
      on:click={loginWithGoogle}>Login with Google
  </button
  >
</div>
<!--{/if}-->