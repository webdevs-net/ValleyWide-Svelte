<script lang="ts">
    export let src
    export let alt
    export let lowRes
    
    import { onMount } from 'svelte'
    import Observer from './Observer.svelte'
    import Image from './Image.svelte'
  
    let nativeLoading = false

    onMount(() => {
      if ('loading' in HTMLImageElement.prototype) {
        nativeLoading = true
      }
    })
    
  </script>
  
  <Observer once={true} let:intersecting={intersecting}>
    {#if intersecting}
      <Image {alt} {src}  />
    {:else}
    {@const src = lowRes}
        <Image {alt} {src} />
    {/if}
  </Observer> 