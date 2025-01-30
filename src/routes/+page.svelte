<script lang="ts">

  import { enhance } from "$app/forms";

  export let data;
  const user = data.user


</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#if user}
  <form method="POST" action="/logout" use:enhance>
    <button type="submit">Logout</button>
  </form>
{/if}