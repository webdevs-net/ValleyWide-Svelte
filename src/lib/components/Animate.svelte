<script>
	import { onMount } from 'svelte';
	
	let element;
	let isVisible = false;
  
	onMount(() => {
      const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const visibleRatio = entry.intersectionRatio;
        if (visibleRatio >= 0.1) {
          isVisible = true;
          observer.disconnect();
        }
      });
    }, { threshold: [0.1] }); // Set the threshold to 10%
  
	  observer.observe(element);
  
	  return () => {
		observer.disconnect();
	  };
	});
  </script>
  
  <div bind:this={element}>
	{#if isVisible}
		<slot></slot>
	{/if}
  </div>

<style lang="scss">

</style>