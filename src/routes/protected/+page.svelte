<script lang="ts">
  export let data;
  console.log(data.user)
</script>

{#if !data.user}
  <h1>You can't see the content here.</h1>
{:else}
  <b>You're logged in and can see the protected site.</b>
{/if}