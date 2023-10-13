<script lang="ts">
	import { browser } from '$app/environment';
import { onMount } from 'svelte';
import { Col } from "sveltestrap";
import axios from "axios";
	import { PUBLIC_STRAPI_API } from '$env/static/public';
// import Flickity from "flickity";
import noFeatured from "$lib/img/blog-empty.svg"
// import { fade, fly } from 'svelte/transition';

import { textAnimate, fly, fadeIn, slide } from '$lib/GsapAnimation.js';

let flickityInstance;
export let preHeading; 
export let heading; 
export let btnTitle;
export let btnUrl;
export let featuredProjects;

let innerWidth;

  let promise = fetchFallback();
	async function fetchFallback(){
		const url = 'https://api.ulfbuilt.com/api/site-setting?populate=deep,3';
		const headers = {
			Authorization: 'Bearer ' + PUBLIC_STRAPI_API
		};

		try {
			const response = await axios.get(url, { headers });
			return response.data.data.attributes.fallbackImage.data;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

onMount(() => {
  promise = fetchFallback();
  innerWidth = window.innerWidth;
  
//   flickityInstance = new Flickity('.slider-container', {
//     cellAlign: 'left',
//     contain: true,
//     wrapAround: true,
//     prevNextButtons: false,
//     pageDots: false,
//     autoPlay: false,
//     groupCells: 1,
//     draggable: true,
//     on: {
//       change: updateProgress,
//     },
//   });
// })



const domain = "https://api.ulfbuilt.com"

let progressPercentage = 0;

function updateProgress(index) {
  const totalSlides = featuredProjects.data.length;
  let imageNum = totalSlides - index == 1 ? index  + 1 : index;
  progressPercentage = ((imageNum ) / totalSlides) * 100;
}




$: {
  if(innerWidth){
    
  }
}

</script>
<svelte:window 
	bind:innerWidth
  />
  <Col md="3">
    <div class="slider-caption">
      <div class="slider-caption__heading">
        <p in:slide id="carousel-preheading" gsap-duration="1.5">{preHeading ? preHeading : ''}</p>
        <h2 class="text-animate secondary-font" in:textAnimate gsap-duration="1.5" id="carousel-heading">{heading ? heading : ''}</h2>
      </div>
      {#if innerWidth > 767}
        <div class="progress-ring-container">
          <svg class="progress-ring" width="110" height="49">
            <rect class="progress-ring__bg" x="2" y="2" rx="25" ry="25" width="106" height="45" fill="white" />
            <rect class="progress-ring__border" x="2" y="2" width="106" height="45" rx="25" ry="25" fill="transparent" stroke-width="2" stroke="#00ADEE" stroke-dasharray="305" stroke-dashoffset="{305 * (1 - progressPercentage / 100)}" />
            <g class="progress-ring__arrow progress-ring__arrow--left" on:click={() => { flickityInstance.previous(); updateProgress(flickityInstance.selectedIndex); }}>
              <rect x="2" y="2" width="52" height="45" rx="25" ry="25" fill="transparent" />
              <text x="33" y="25" font-size="26" text-anchor="middle" dominant-baseline="central">&larr;</text>
            </g>
            <g class="progress-ring__arrow progress-ring__arrow--right" on:click={() => { flickityInstance.next(); updateProgress(flickityInstance.selectedIndex); }}>
              <rect x="56" y="2" width="52" height="45" rx="25" ry="25" fill="transparent" />
              <text x="77" y="25" font-size="26" text-anchor="middle" dominant-baseline="central">&rarr;</text>
            </g>
          </svg>
        </div> 
      {/if}
    </div>
  </Col>	
  <Col md=9>
    <div class="slider-container" in:fly id="carousel-image-container" gsap-duration="0.5" gsap-y="10">
      {#each featuredProjects.data as project, index}
        <div class="slider-container__carousel-cell">
          <a href="/portfolio/{project.attributes.slug ? project.attributes.slug : '#'}" data-sveltekit-reload class="zoomImg">      
            {#if project.attributes.featuredImage.data != null}
              <img src="{domain}{project.attributes.featuredImage.data.attributes.formats.large.url ? project.attributes.featuredImage.data.attributes.formats.large.url : project.attributes.featuredImage.data.attributes.url}" alt="{project.attributes.featuredImage.data.attributes.alternativeText}" />
            {:else}
            {#await promise}
            {:then fallback} 
              <img src="{fallback ? domain+fallback.attributes.url : noFeatured}" alt="{project.attributes.title}" >
            {/await}
            {/if}
            <div class="slider-container__carousel-cell__text">
              <span>{('0' + (index + 1)).slice(-2)}</span>
              {project.attributes.title ? project.attributes.title : ''}
              <i><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.29004 12.3459L6.29004 6.84595L1.29004 1.34595" stroke="#00ADEE" stroke-width="2" stroke-linecap="round"/>
                </svg>
                </i>
            </div>      
          </a>  
        </div>
      {/each}
    </div>
    {#if innerWidth < 767}
      <div class="text-center">
        <div class="progress-ring-container">
          <svg class="progress-ring" width="110" height="49">
            <rect class="progress-ring__bg" x="2" y="2" rx="25" ry="25" width="106" height="45" fill="white" />
            <rect class="progress-ring__border" x="2" y="2" width="106" height="45" rx="25" ry="25" fill="transparent" stroke-width="2" stroke="#00ADEE" stroke-dasharray="305" stroke-dashoffset="{305 * (1 - progressPercentage / 100)}" />
            <text class="progress-ring__arrow progress-ring__arrow--left" x="27" y="25" font-size="16" text-anchor="middle" dominant-baseline="central" on:click={() => { flickityInstance.previous(); updateProgress(flickityInstance.selectedIndex); }}>&larr;</text>
            <text class="progress-ring__arrow progress-ring__arrow--right" x="82" y="25" font-size="16" text-anchor="middle" dominant-baseline="central" on:click={() => { flickityInstance.next(); updateProgress(flickityInstance.selectedIndex); }}>&rarr;</text>
          </svg>
        </div> 
      </div>
    {/if}       
    <div class="slider-btn">
      <a href="{btnUrl ? btnUrl : '#'}" class="btn btn-secondary scaleLarge">{btnTitle ? btnTitle : 'Button'}</a>
    </div>    
 
  </Col>

  
  

<style lang="scss">
  .progress-ring__arrow rect {
    transition: fill 1s;
  }

  .progress-ring__arrow:hover rect {
    fill: rgba(129, 129, 129, 0.191);
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
      }
    }
  }

.slider-container {
  width: 100%;
  overflow: hidden;
  position: relative;

  &__carousel-cell {
    width: 42%;
    position: relative;   
    height: auto;
    margin: 0 0.5rem;
    box-sizing: border-box;
    height: 32rem;
    overflow: hidden;
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
      width: 80%;      
    }   
    @include media-max(sm){
      height: 50vh;
      width: 80%;      
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
          column-gap: 0.75rem;

            @include media-max(sm){
                margin: 0;
                // font-size: 0.6rem;
                width: 90%;
                bottom: 0.5rem
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

.slider-btn{
  margin: 3rem 5rem 0;
  text-align: right;
  height: 0;
  @include media-max(sm){
    text-align: center;
    margin: 2rem 0 0;
  }
}

.progress-ring-container {
  margin-top: 1rem;
  position: relative;
  bottom: 10px;
  left: 10px;
  z-index: 1;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
  display: inline-block;
  border-radius: 2rem;  
  @include media-max(sm){
    margin-top: 3rem;
    left: 0;
  }
}

.progress-ring {
  &__border {
    transition: stroke-dashoffset 0.5s ease-out;
  }

  &__arrow {
    font-family: Arial, sans-serif;
    cursor: pointer;
    user-select: none;
    fill: $primary-color;

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