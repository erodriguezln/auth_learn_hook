<script lang="ts">
  import { goto } from "$app/navigation";
  import { signOut } from "$lib/firebase/firebase.client";

  export let data;
  // cuando pasas un writable a front, se ve la interface de writable no mas.
  // console.log(data.userStore)
  //
  // console.log(data.user)

  async function handleLogout() {
    try {
      await signOut()
      await fetch('/api/session', {method: 'DELETE'})
      goto("/login")

    } catch (e) {
      console.error(e)

    }
  }
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#if data.user}
  <button on:click={handleLogout}>Logout</button>
{/if}