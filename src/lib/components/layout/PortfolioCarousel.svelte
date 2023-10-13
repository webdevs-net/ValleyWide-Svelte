<script>
  import { afterUpdate, onMount, tick } from 'svelte';
  import {gsap}  from "gsap/dist/gsap";        
  import {ScrollTrigger} from "gsap/dist/ScrollTrigger";   
  import { Col } from "sveltestrap";
	import { browser } from '$app/environment';
  import Animate from '../Animate.svelte';
  import ImageLoader from '../imageLazy/ImageLoader.svelte';
  // import { fade, fly } from "svelte/transition";
  import { fly, fadeIn } from '$lib/GsapAnimation.js';

  gsap.registerPlugin(ScrollTrigger);

  async function initScrollAnimations() {
    const container = document.querySelector('.slider-container');

    ScrollTrigger.create({
      trigger: '.slider-container',
      start: 'top left',
      end: () => (container.scrollWidth * 1.9) - (window.innerWidth * 0.75), 
      pin: true,
      scrub: 0.0,
      onUpdate: (self) => {
        const progress = self.progress;
        // Container width
        const conwidth = container.scrollWidth - (window.innerWidth * 0.75);
        // Position of Container scrolling
        const conx = (-container.scrollWidth * progress);
        // console.log(" ConWidth: " + conwidth + " ConX: " + conx);
        // console.log("window.innerWidth: "+ window.innerWidth);
        // console.log("container.scrollWidth: "+ container.scrollWidth);
          if(conx < -conwidth){
            return
          }else{
            gsap.to(container, {
            x: (-container.scrollWidth * progress),
            duration: 0.67,
          });
        }
      },
    });
    
  }

  onMount(async() => {
    await tick();
    // console.log(document.querySelector('.slider-container'));
    if(innerWidth > 768){
      initScrollAnimations();
    }
    // isRetina = window.devicePixelRatio > 1;
    // console.log(isRetina);
  });

afterUpdate(() => {
  // ScrollTrigger.refresh();
  // initScrollAnimations();
  // console.log()
});
let innerWidth;

$: {
  if(innerWidth < 767){
    // initScrollAnimations();   
    // ScrollTrigger.kill(); 
  }
}

let scrollSlider;

export let images = [];
let progressPercentage = 0;
const domain = "https://api.ulfbuilt.com";

$: {
  if(scrollSlider){
    console.log(scrollSlider);
    
  }
}
  console.log(images);
function log(){
  // console.log("test");
  // console.log( document.querySelector('.slider-container'));
}

// Lazy Load - for checking and testing
const loaded = new Map();
	
function lazy(node, data) {
  if (loaded.has(data.src)) {
    node.setAttribute('src', data.src);
  } else {
    const img = new Image();
    img.src = data.src;
    img.onload = () => {
      loaded.set(data.src, img);
      node.setAttribute('src', data.src); 
    };
  }

  return {
    destroy(){}
  };

}

</script>

<svelte:window 
	bind:innerWidth
  />
  {#if images}
    {#if innerWidth > 768}
      <Col>
          <div class="slider-container" >
            {#each images as image, index}
              {@const highRes = image.attributes.formats.large.url ? image.attributes.formats.large.url : image.attributes.url}
                <div in:fly id="items{index}" gsap-duration="1.5" gsap-y="10" class="slider-container__carousel-cell">
                  <div class="image-wrapper">
                    <img src={domain}{image.attributes.formats.small.url} use:lazy="{{src: 'https://api.ulfbuilt.com'+highRes}}"  alt="{image.attributes.alternativeText ? image.attributes.alternativeText : ''}" />         
                    <!-- <ImageLoader src="{domain}{image.attributes.url}" lowRes="{domain}{image.attributes.formats.small.url}" alt="{image.attributes.alternativeText ? image.attributes.alternativeText : ''}"></ImageLoader> -->
                    <a href="{domain}{image.attributes.url}?download" class="download" download>
                      <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="27.501" cy="27.5" r="27.5" fill="#1E2D39"/>
                        <path d="M28.501 16.5C28.501 15.9477 28.0533 15.5 27.501 15.5C26.9487 15.5 26.501 15.9477 26.501 16.5L28.501 16.5ZM26.7939 39.2071C27.1844 39.5976 27.8176 39.5976 28.2081 39.2071L34.572 32.8431C34.9626 32.4526 34.9626 31.8195 34.572 31.4289C34.1815 31.0384 33.5484 31.0384 33.1578 31.4289L27.501 37.0858L21.8441 31.4289C21.4536 31.0384 20.8204 31.0384 20.4299 31.4289C20.0394 31.8195 20.0394 32.4526 20.4299 32.8431L26.7939 39.2071ZM26.501 16.5L26.501 38.5L28.501 38.5L28.501 16.5L26.501 16.5Z" fill="white"/>
                      </svg>                        
                    </a>
                  </div>    
                </div>
            {/each}
          </div>
      </Col>
  {:else}
    <Col>
      <div class="mobile-image">
        {#each images as image, index}
          <Animate>
            <div class="slider-container__carousel-cell" in:fadeIn id="mobile-items{index}" gsap-duration="2" gsap-start="top center">
              <img src="{domain}{image.attributes.formats.large.url ? image.attributes.formats.large.url : image.attributes.url}" alt="{image.attributes.alternativeText ? image.attributes.alternativeText : ''}" />         
              <a href="{domain}{image.attributes.url}?download" class="download" download>
                <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="27.501" cy="27.5" r="27.5" fill="#1E2D39"/>
                  <path d="M28.501 16.5C28.501 15.9477 28.0533 15.5 27.501 15.5C26.9487 15.5 26.501 15.9477 26.501 16.5L28.501 16.5ZM26.7939 39.2071C27.1844 39.5976 27.8176 39.5976 28.2081 39.2071L34.572 32.8431C34.9626 32.4526 34.9626 31.8195 34.572 31.4289C34.1815 31.0384 33.5484 31.0384 33.1578 31.4289L27.501 37.0858L21.8441 31.4289C21.4536 31.0384 20.8204 31.0384 20.4299 31.4289C20.0394 31.8195 20.0394 32.4526 20.4299 32.8431L26.7939 39.2071ZM26.501 16.5L26.501 38.5L28.501 38.5L28.501 16.5L26.501 16.5Z" fill="white"/>
                </svg>                        
              </a>
            </div>
          </Animate>
        {/each}
      </div>
    </Col>
  {/if}
{/if}
  <!-- <Col>
    <div class="slider-btn">
      <div class="slider-caption">
        <div class="progress-ring-container">
          <svg class="progress-ring" width="110" height="110"  >
            <circle class="progress-ring__bg" cx="55" cy="55" r="50" fill="#495763" />
            <circle class="progress-ring__border" cx="53" cy="53" r="50" fill="transparent" stroke-width="6" stroke="#00ADEE" stroke-dasharray="314" stroke-dashoffset="{314 * (1 - progressPercentage / 100)}" />
            <text class="progress-ring__arrow progress-ring__arrow--left" x="55" y="51" font-size="40" text-anchor="middle" fill="white" dominant-baseline="central">←</text>
          </svg>
        </div>  
      </div>
    </div>    
  </Col> -->

  <!-- <ImageLoader src="{domain}{images[0].attributes.url}" alt="test"></ImageLoader> -->
  
  
 
<style lang="scss">

body {
    overflow-x: hidden;
}
  
.slider-container {
  display: flex;
  width: 150vw;
  position: relative;
  height: 100vh;
  

  &__carousel-cell {
    flex-shrink: 0;
    width: auto;
    height: 78vh;
    margin: 11vh 0.5rem 11vh;
    .image-wrapper{
      min-width: 20rem;
      height: 77vh;
      position: relative;
      :global(img) {
        min-width: 20rem;
        height: 77vh;
      }
      .download{
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        // display: none;
        opacity: 0;
        transition: 1s;
      }
    }
    @include media-max(ipadmini){
      // margin: 30vh 0.5rem 30vh;
      margin: 1rem 0;
    }      
    overflow: hidden;      
    transition: 0.5s; 
    position: relative;
    @include media-max(ipadmini){
        height: 40vh;
    }    
    &:hover{
      img{

      }
    }    
    
    &:hover{
      .download{
        transition: 1s;        
        // display: block;
        opacity: 1;
      }
    }
    img {
      width: 100%;
      transition: 1.2s;
			object-fit: cover;
      height: 77vh;
      @include media-max(sm){
        height: 40vh;
      }
    }  
  }
}


.slider-btn{
  margin: 0;
  margin-right: calc(52% - 50vw);
  text-align: center;
  .progress-ring-container{
    transform: scale(0.50);
  }
  svg{

    transform: rotate(-90deg);
    text{
      color: #fff;
    }
  }
}

.progress-ring-container {
  margin-top: 1rem;
  position: relative;
  bottom: 10px;
  left: 10px;
  z-index: 1;
  // box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
  display: inline-block;
  border-radius: 50%;  
}

.progress-ring {
  &__border {
    transition: stroke-dashoffset 0.5s ease-out;
  }

  &__arrow {
    font-family: Arial, sans-serif;
    cursor: pointer;
    user-select: none;

    &--left,
    &--right {
      // Add any common styles for left and right arrows here
    }

    &--left {
      // Add any specific styles for left arrow here
    }

    &--right {
      // Add any specific styles for right arrow here
    }
  }
}

</style>

  
  