<script lang="ts">
  import type { LayoutData } from "./$types";
  import { onMount } from "svelte";

  export let data: LayoutData;
  // console.log(data)

  onMount(async () => {
    // const user = await data.getAuthUser()
    //
    // console.log(await user.getIdToken())
  })
</script>

<slot/>