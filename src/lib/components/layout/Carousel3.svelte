<script>
    import { textAnimate, slide, fly } from '$lib/GsapAnimation.js';
    import leftar from '$lib/img/left-ar.svg';
    import rightar from '$lib/img/right-ar.svg';
    import rightarrow from '$lib/img/right-arrow-sky.svg';
    import {Row,Col} from 'sveltestrap';
	import Siema from 'siema';
	import { onMount, createEventDispatcher } from 'svelte';

    const domain = "https://api.ulfbuilt.com";
    export let preHeading; 
    export let heading; 
    export let btnTitle;
    export let btnUrl;
    export let featuredProjects;
	
    //slider code
	export let perPage = 1;
	export let loop = true;
	export let autoplay = 0;
	export let duration = 500;
	export let easing = 'ease-out';
	export let startIndex = 0;
	export let draggable = true
	export let multipleDrag = true;	
	export let dots = false;
	export let controls = true;
	export let threshold = 20;
	export let rtl = false;
	let currentIndex = startIndex;
	
	let siema
	let controller
	let timer
	const dispatch = createEventDispatcher()
	
	$: pips = controller ? controller.innerElements : []
	$: currentPerPage = controller ? controller.perPage : perPage
	$: totalDots = controller ? Math.ceil(controller.innerElements.length / currentPerPage) : []
	
	onMount(() => {
		controller = new Siema({
			selector: siema,
			perPage: typeof perPage === 'object' ? perPage : Number(perPage),
			loop,
  			duration,
  			easing,
  			startIndex,
  			draggable,
 			multipleDrag,
  			threshold,
  			rtl,
			onChange: handleChange
		})
		
		// if(autoplay) {
		// 	timer = setInterval(right, autoplay);
		// }
		// return () => {
		// 	autoplay && clearInterval(timer)
		// 	controller.destroy()
		// }
	})
	
	export function isDotActive (currentIndex, dotIndex) {
        if (currentIndex < 0) currentIndex = pips.length + currentIndex;
        return currentIndex >= dotIndex*currentPerPage && currentIndex < (dotIndex*currentPerPage)+currentPerPage
    }
	
	export function left () {
		controller.prev()
	}
	
	export function right () {
		controller.next()
	}
	
	export function go (index) {
		controller.goTo(index)
	}
	
	export function pause() {
		clearInterval(timer);
	}
	
	export function resume() {
		// if (autoplay) {
		// 	timer = setInterval(right, autoplay);
		// }
	}
	
	function handleChange (event) {
		currentIndex = controller.currentSlide
		dispatch('change', {
			currentSlide: controller.currentSlide,
			slideCount: controller.innerElements.length
		} )
	}
	
	function resetInterval(node, condition) {
		function handleReset(event) {
			pause();
			resume();
		}
		
		if(condition) {
			node.addEventListener('click', handleReset);
		}
		
		return {
		  destroy() {
			  node.removeEventListener('click', handleReset);
		  }
	  }
  }
  function handleStart(event) {
    const anchors = document.querySelectorAll('.zoomImg');
    anchors.forEach(anchor => {
    anchor.addEventListener('click', preventAnchorClick, { once: true });
    });
  }
  function preventAnchorClick(event) {
  event.preventDefault();
  console.log('Anchor click prevented');
}

let startY = null;
function touchvertical(e){
  startY = e.touches[0].clientY;
}
function touchmovevertical(e){
console.log();
let clientY = e.touches[0].clientY;
    if(startY > clientY){
      const deltaY = startY - clientY;
      if (Math.abs(deltaY) > 20) {
        window.scrollBy(0, 100);
        // startY = null; // Reset startY to allow horizontal swiping
      }
    }
    if(startY < clientY){
      const deltaY = clientY - startY;
      if (Math.abs(deltaY) > 20) {
        window.scrollBy(0, -100);
        // startY = null; // Reset startY to allow horizontal swiping
      }
    }
}

</script>

<Row>
<Col md="3">
    <div class="slider-caption">
      <div class="slider-caption__heading">
        <p in:slide id="carousel-preheading" gsap-duration="1.5">{preHeading ? preHeading : ''}</p>
        <h2 class="text-animate secondary-font" in:textAnimate gsap-duration="1.5" id="carousel-heading">{heading ? heading : ''}</h2>
      </div>
    <div class="left-right desktop">
        <button class="left" on:click={left}>
            <img src="{leftar}">
        </button>
        <button class="right" on:click={right}>
            <img src="{rightar}">
        </button>
        
    </div>
    </div>
  </Col>
<Col md=9 class="carousel-section">
    <div class="carousel" style="position:absolute;left:0;top:0;">
        <div class="slides" in:fly id="carousel-image-container" gsap-duration="1" gsap-y="10" gsap-start="top center" bind:this={siema}  on:mousedown={handleStart} on:touchstart={touchvertical} on:touchmove={touchmovevertical}>
            {#each featuredProjects.data as project, index}
            <div class="slider-container__carousel-cell" id="carousel-item">
              <a href="/portfolio/{project.attributes.slug ? project.attributes.slug : '#'}" data-sveltekit-reload class="zoomImg" draggable="false">
                {#if project.attributes.featuredImage.data != null}
                  <img draggable="false" src="{domain}{project.attributes.featuredImage.data.attributes.formats.large.url ? project.attributes.featuredImage.data.attributes.formats.large.url : project.attributes.featuredImage.data.attributes.url}" alt="{project.attributes.featuredImage.data.attributes.alternativeText}" />
                {:else}
                {#await promise}
                {:then fallback} 
                  <img src="{fallback ? domain+fallback.attributes.url : noFeatured}" alt="{project.attributes.title}"  draggable="false">
                {/await}
                {/if}
                <div class="slider-container__carousel-cell__text">
                  <span>{('0' + (index + 1)).slice(-2)}</span>
                  {project.attributes.title ? project.attributes.title : ''}
                  <i><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.29004 12.3459L6.29004 6.84595L1.29004 1.34595" stroke="#00ADEE" stroke-width="2" stroke-linecap="round"/></svg></i>
                </div>
              </a>  
            </div>
          {/each}
          {#each featuredProjects.data as project, index}
          <div class="slider-container__carousel-cell" id="carousel-item">
            <a href="/portfolio/{project.attributes.slug ? project.attributes.slug : '#'}" data-sveltekit-reload class="zoomImg" draggable="false">
              {#if project.attributes.featuredImage.data != null}
                <img draggable="false" src="{domain}{project.attributes.featuredImage.data.attributes.formats.large.url ? project.attributes.featuredImage.data.attributes.formats.large.url : project.attributes.featuredImage.data.attributes.url}" alt="{project.attributes.featuredImage.data.attributes.alternativeText}" />
              {:else}
              {#await promise}
              {:then fallback} 
                <img src="{fallback ? domain+fallback.attributes.url : noFeatured}" alt="{project.attributes.title}"  draggable="false">
              {/await}
              {/if}
              <div class="slider-container__carousel-cell__text">
                <span>{('0' + (index + 1)).slice(-2)}</span>
                {project.attributes.title ? project.attributes.title : ''}
                <i><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.29004 12.3459L6.29004 6.84595L1.29004 1.34595" stroke="#00ADEE" stroke-width="2" stroke-linecap="round"/></svg></i>
              </div>
            </a>  
          </div>
        {/each}
        {#each featuredProjects.data as project, index}
        <div class="slider-container__carousel-cell" id="carousel-item">
          <a href="/portfolio/{project.attributes.slug ? project.attributes.slug : '#'}" data-sveltekit-reload class="zoomImg" draggable="false">
            {#if project.attributes.featuredImage.data != null}
              <img draggable="false" src="{domain}{project.attributes.featuredImage.data.attributes.formats.large.url ? project.attributes.featuredImage.data.attributes.formats.large.url : project.attributes.featuredImage.data.attributes.url}" alt="{project.attributes.featuredImage.data.attributes.alternativeText}" />
            {:else}
            {#await promise}
            {:then fallback} 
              <img src="{fallback ? domain+fallback.attributes.url : noFeatured}" alt="{project.attributes.title}"  draggable="false">
            {/await}
            {/if}
            <div class="slider-container__carousel-cell__text">
              <span>{('0' + (index + 1)).slice(-2)}</span>
              {project.attributes.title ? project.attributes.title : ''}
              <i><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.29004 12.3459L6.29004 6.84595L1.29004 1.34595" stroke="#00ADEE" stroke-width="2" stroke-linecap="round"/></svg></i>
            </div>
          </a>  
        </div>
      {/each}
      {#each featuredProjects.data as project, index}
      <div class="slider-container__carousel-cell" id="carousel-item">
        <a href="/portfolio/{project.attributes.slug ? project.attributes.slug : '#'}" data-sveltekit-reload class="zoomImg" draggable="false">
          {#if project.attributes.featuredImage.data != null}
            <img draggable="false" src="{domain}{project.attributes.featuredImage.data.attributes.formats.large.url ? project.attributes.featuredImage.data.attributes.formats.large.url : project.attributes.featuredImage.data.attributes.url}" alt="{project.attributes.featuredImage.data.attributes.alternativeText}" />
          {:else}
          {#await promise}
          {:then fallback} 
            <img src="{fallback ? domain+fallback.attributes.url : noFeatured}" alt="{project.attributes.title}"  draggable="false">
          {/await}
          {/if}
          <div class="slider-container__carousel-cell__text">
            <span>{('0' + (index + 1)).slice(-2)}</span>
            {project.attributes.title ? project.attributes.title : ''}
            <i><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.29004 12.3459L6.29004 6.84595L1.29004 1.34595" stroke="#00ADEE" stroke-width="2" stroke-linecap="round"/></svg></i>
          </div>
        </a>  
      </div>
    {/each}
    {#each featuredProjects.data as project, index}
    <div class="slider-container__carousel-cell" id="carousel-item">
      <a href="/portfolio/{project.attributes.slug ? project.attributes.slug : '#'}" data-sveltekit-reload class="zoomImg" draggable="false">
        {#if project.attributes.featuredImage.data != null}
          <img draggable="false" src="{domain}{project.attributes.featuredImage.data.attributes.formats.large.url ? project.attributes.featuredImage.data.attributes.formats.large.url : project.attributes.featuredImage.data.attributes.url}" alt="{project.attributes.featuredImage.data.attributes.alternativeText}" />
        {:else}
        {#await promise}
        {:then fallback} 
          <img src="{fallback ? domain+fallback.attributes.url : noFeatured}" alt="{project.attributes.title}"  draggable="false">
        {/await}
        {/if}
        <div class="slider-container__carousel-cell__text">
          <span>{('0' + (index + 1)).slice(-2)}</span>
          {project.attributes.title ? project.attributes.title : ''}
          <i><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.29004 12.3459L6.29004 6.84595L1.29004 1.34595" stroke="#00ADEE" stroke-width="2" stroke-linecap="round"/></svg></i>
        </div>
      </a>  
    </div>
  {/each}
        </div>
    </div>
    <button class="left-mobil" on:click={left}>
        <img src="{rightarrow}">
    </button>
    <button class="right-mobil" on:click={right}>
        <img src="{rightarrow}">
    </button>
</Col>
</Row>
  <!-- <div class="slider-caption">
    <div class="left-right mobile">
        <button class="left" on:click={left}>
            <img src="{leftar}">
        </button>
        <button class="right" on:click={right}>
            <img src="{rightar}">
        </button>
    </div>
  </div> -->


    <!-- <div class="carousel">
	<div class="slides" bind:this={siema}>
		<slot></slot>
	</div> -->
	<!-- {#if controls}
	  <button class="left" on:click={left} aria-label="left">
		  <slot name="left-control"></slot>
	  </button>
	  <button class="right" on:click={right} aria-label="right">
		  <slot name="right-control"></slot>
	  </button>
	{/if} -->
    <!-- {#if dots}
         use:resetInterval={autoplay}
	<ul>
		{#each {length: totalDots} as _, i}
		<li on:click={() => go(i*currentPerPage)} class={isDotActive(currentIndex, i) ? "active" : ""}></li>
		{/each}
	</ul>
    {/if} -->


<style lang="scss">
  
.right-mobil{
    display: none;
    max-width: 70px;
    @include media-max(sm){
        display: block;
        position: absolute;
        right: 0.5rem;
        background: none;
        border: 0;
        height: 100%;
        -webkit-transform:rotate(180deg);
        -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    img{
      width:24px;
    }
}
.left-mobil{
    display: none;
    max-width: 70px;
    @include media-max(sm){
        display: block;
        position: absolute;
        left: 0.5rem;
        background: none;
        border: 0;
        height: 100%;
    }
    img{
      width:24px;
    }
}
.carousel {
    position: relative;
    width: 25rem;
    justify-content: center;
    align-items: center;
}
.slides{
    overflow: visible !important;
}
:global(.carousel-section){
    overflow: hidden;
    padding-left:0px;
    position: relative;
    height: 32rem;
    min-height: 32rem;
    @include media-max(sm){
        height: 32rem;
        padding: 0rem;
    }
}
.left-right{
  display: inline-flex;
  box-shadow: 0 0 5px #aaa;
  border-radius: 40px;
  background-color: $white-color;
}
.desktop{
@include media-max(sm){
  display: none;
}
}
.mobile{
display: none;
@include media-max(sm){
  display: flex;
}
}
.left-right.mobile{
align-self: center;
margin: 40px 0;
}
.left, .right{
  border: 0px;
  padding: 1rem;
  background-color: transparent;
  margin: 0px;
}
.left-right img{
  height: 30px;
}


.slider-caption{
  height: 100%;
  // display: flex;
  // align-items: center;
  // flex-wrap: wrap;  
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 5rem;
  &__heading{
    margin-top: 5rem;
    margin-bottom: 1rem;
    width: 100%;
    @include media-max(sm){
        text-align: center;
        margin-top: 0;
        margin-bottom: 3rem;
    }    
    p{
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: $primary-color;
      font-weight: 500;
    }
    h2{
      // flex-wrap: wrap;
      // width: 18rem;
      @include media-max(ipadmini){
          line-height: 2rem;
      }    
    }
  }
}

.slider-container {
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 2000px;
  transition-property: transform; /* Specify the property to transition */
  transition-timing-function: ease-in-out;
  position: relative;
  user-drag: none;
  cursor: grab;
white-space: nowrap;
&__carousel-cell {
  max-width: 25rem;
  position: relative;
  margin-right: 1.5rem;
  box-sizing: border-box;
  height: 32rem;
  min-height: 32rem;
  overflow: hidden;
  display: inline-block;
  &:hover{
      .slider-container__carousel-cell__text{
        background: $primary-color;
        transition: 1.5s;
        span {
          color: $white-color;
        }
        path {
          stroke: $white-color;
        }  
      }        
  }    
  @include media-max(ipadmini){
    height: 50vh;
  }   
  @include media-max(sm){
    height: 50vh;
  }   
  &__text{
        background-color: $secondary-color;
        color: #fff;
        padding: 0.5rem 3rem 0.5rem 0.5rem;
        position: absolute;
        z-index: 2;
        bottom: 1rem;
        left: 0;
        max-width: 90%;
        text-align: left;
        transition: 1.5s;
        display: flex;
        align-items: center;
          @include media-max(sm){
              margin: 0;
              // font-size: 0.6rem;
              width: 90%;
              bottom: 0.5rem;
              gap: 10px;
          } 
          span{
              color: $primary-color;
              font-size: 1.2rem;
              margin: 0 0.8rem 0;
              @include media-max(sm){
                  margin: 0;
                  // font-size: 0.6rem;
              }                
          }
          i{
            position: absolute;
            top: 20%;
            right: 1rem;
          }
  }      
  img {
    display: block;
    // width: auto;
    object-fit: cover;
    height: 100%;
  }
}
}

</style>