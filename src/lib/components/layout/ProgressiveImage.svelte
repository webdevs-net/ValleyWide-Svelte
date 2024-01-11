<!-- ProgressiveImage.svelte -->

<script>
  import { onMount } from 'svelte';
  import lqip from 'lqip-modern';

  export let images = [];
  let progressiveImages = [];

  const loadImage = (img) => {
    lqip(img.highResSrc).then((lowResSrc) => {
      img.lowResSrc = lowResSrc;
      img.loaded = true;
    });
  };

  onMount(() => {
    progressiveImages = images.map((image) => ({
      lowResSrc: '', // Placeholder for low-resolution image source
      highResSrc: image.large, // Assuming large is the high-resolution image
      loaded: false,
    }));

    // Load low-resolution images when the component is mounted
    progressiveImages.forEach((img) => {
      loadImage(img);
    });
  });
</script>

<style>
  /* Add any necessary styles */
  img {
    max-width: 100%;
    height: auto;
    transition: filter 0.3s ease-in-out;
  }

  img.blur-up {
    filter: blur(10px);
  }
</style>

<!-- HTML template -->
{#each progressiveImages as img (img.lowResSrc)}
  <img loading="lazy" {src} alt="Progressive Image Loading" class:blur-up={!img.loaded} />
{/each}
