<!-- ParallaxImage.svelte -->
<script>
  // Import Svelte dependencies
  import { onMount, onDestroy } from "svelte";
  import {gsap}  from "gsap/dist/gsap";        
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";  

  let parallaxImage;
  let parallaxImageCont;
  export let imageUrl;
  export let imageHeight;
  export let overlay;
  // Initialize GSAP and ScrollTrigger when the component is mounted
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create a GSAP timeline
    const tl = gsap.timeline();

    // Define the parallax animation
    tl.to(parallaxImage, {
      y: -350, // Adjust this value for the parallax effect intensity
      ease: "none", // Linear motion
    });

    // Initialize ScrollTrigger
    ScrollTrigger.create({
      trigger: parallaxImageCont,
      start: "top bottom",
      end: "bottom top",
      // markers: true,
      scrub: true,
      animation: tl,
    });

  });
</script>


<div class="parallax-container {overlay ? 'parallax-with-overlay' : ''}" 
bind:this={parallaxImageCont}
style="--height: {imageHeight}vh">
  <img
    src="{imageUrl}"
    alt="Parallax Image"
    class="parallax-img"
    bind:this={parallaxImage}
  />
</div>


<style lang="scss">
  /* Add your CSS styles here */

  .parallax-with-overlay{
				.parallax-img {
          @include media-max(sm){
            min-width: 1300px;
          }
				}
				&::after {
          background: linear-gradient(to left, rgba(0,0,0,0.8) 40%,rgba(255,255,255,0) 100%);
          @include media-max(sm){
            background: rgba(0, 0, 0, 0.5);
          }
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					width: 100%;
				}
	}
  .parallax-container {
    overflow: hidden;
    height: var(--height);
    object-fit: cover;
    object-position: center;
    /* position: relative; */
    @include media-max(default){
      height: 70vh;
    }
    @include media-max(sm){
      height: 80vh;
    }
  }

  .parallax-img {
    width: 100%;
    height: auto;
    min-width: 1000px;
    position: absolute;
    top: 0;
    left: 0;

    @include media-max(default){
      width: 100%;
      // min-height: 100vh;
    }
    @include media-max(sm){
      left: 50%;
      margin-left: -500px;
    }
  }
</style>
