<script lang="ts">
    export let src
    export let alt
    export let lowRes
  
    import { onMount } from 'svelte'
  
    let loaded = false
    let thisImage
  
    onMount(() => {
      thisImage.onload = () => {
        loaded = true
      }
    }) 
  
  </script>
  
  <style lang="scss">
    img {
      width: 100%;
      transition: .5s;
	    object-fit: cover;
      opacity: 0;
      &.loaded {
        opacity: 1;
      }
    } 
  </style>
  
  <!-- {#if loaded}
  <img {src} {alt} class:loaded bind:this={thisImage} loading="lazy" />
  {:else} 
  {@const src = lowRes}
  <img {src} {alt} class:loaded bind:this={thisImage} loading="lazy" />
  {/if} -->

  <img {src} {alt} class:loaded bind:this={thisImage} loading="lazy" />