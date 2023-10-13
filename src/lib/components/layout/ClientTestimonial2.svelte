<script lang="ts">
    import { textAnimate, fly} from '$lib/GsapAnimation.js';

    export let clientTestimonials;
    export let testimonialHeading;



    import Siema from 'siema'
	import { onMount, createEventDispatcher } from 'svelte'
	import { Container } from 'sveltestrap';
	
	export let perPage = 3
	export let loop = true
	export let autoplay = 0
	export let duration = 500
	export let easing = 'ease-out'
	export let startIndex = 0
	export let draggable = true
	export let multipleDrag = true	
	export let dots = true	
	export let controls = true
	export let threshold = 20
	export let rtl = false
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
		
		if(autoplay) {
			timer = setInterval(right, autoplay);
		}
		return () => {
			autoplay && clearInterval(timer)
			controller.destroy()
		}
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
		if (autoplay) {
			timer = setInterval(right, autoplay);
		}
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

</script>

<section class="our_client_say">
    <div>
        <h2 class="text-animate secondary-font" in:textAnimate id="testimonial-heading" gsap-duration="1" >{testimonialHeading ? testimonialHeading : 'Our Clients say...'}</h2>
        <Container>
        <div class="carousel our_client_say__cards slider-container">
            <div class="slides" bind:this={siema}>
                <slot></slot>
            </div>
            {#if controls}
              <button class="left" on:click={left} use:resetInterval={autoplay} aria-label="left">
                  <slot name="left-control"></slot>
              </button>
              <button class="right" on:click={right} use:resetInterval={autoplay} aria-label="right">
                  <slot name="right-control"></slot>
              </button>
            {/if}
            {#if dots}
            <!-- <ul>
                {#each {length: totalDots} as _, i}
                <li on:click={() => go(i*currentPerPage)} class={isDotActive(currentIndex, i) ? "active" : ""}></li>
                {/each}
            </ul> -->
            {/if}
        </div>
    </Container>
<!-- 
        <div class="our_client_say__cards slider-container" in:fly id="testimonial-cont" gsap-duration="2">
            {#each clientTestimonials as testimonial}
                <div class="details">
                    <p>{testimonial.attributes.testimonialText ? testimonial.attributes.testimonialText.replace(/(<([^>]+)>)/gi, "") : ''}</p>
                    <h3>{testimonial.attributes.Name ? testimonial.attributes.Name : ''}</h3>
                </div>
            {/each}
        </div> -->
    </div>
</section>

<style lang="scss">
    :global(.slides){
        overflow: visible !important;
    }
:global(.slides > div){
    width: 17000px !important;
}
:global(.slides > div > div){

            background: $white-color;
            border: 1px solid $darkgray;
            border-radius: 8px;
            min-height: 100%;
            height: auto;
            width: 80vw !important;
            min-width: 80vw;
            // max-width: 45vw;
            padding: 4rem 6rem;
            margin: 2rem;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            @include media-max(w1400){
                // width: 100%;
                // max-width: 45vw;
                padding: 2rem 3rem;
            }
            @include media-max(md){
                // max-width: 40vw;
                margin: 1rem;
                padding: 2rem;
            }
            @include media-max(sm){
                // max-width: 87vw;
                margin: 1rem;
                padding: 2rem;
            }
            @include media-min(w1400){
                // width: 100%;
                // max-width: 37vw;
                padding: 2rem 3rem;
            }

}
.carousel {
		position: relative;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
	
	button {
		position: absolute;
		width: 40px;
		height: 40px;
		top: 50%;
		z-index: 50;
		margin-top: -20px;
		border: none;
		background-color: transparent;
	}
  button:focus {
    outline: none;
  }
	
	.left {
		left: 2vw;
	}
	
	.right {
		right: 2vw;
	}
	ul {
		list-style-type: none;
		// position: absolute;
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: -30px;
		padding: 0;
	}
	ul li {
		margin: 6px;
		border-radius: 100%;
		background-color: rgba(255,255,255,0.5);
		height: 8px;
		width: 8px;
	}
	ul li:hover {
		background-color: rgba(255,255,255,0.85);
	}
	ul li.active {
		background-color: rgba(255,255,255,1);
	}




    
.our_client_say {
    background:  linear-gradient(180deg, rgba(255, 255, 255, 0) -40.92%, rgba(239, 239, 240, 0.83) 36.13%, #FFFFFF 76.97%, rgba(255, 255, 255, 0) 137.31%); ;
    mix-blend-mode: normal;
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    padding: 5rem 0;
    @include media-max(ipadmini){
        padding: 5rem 0 0;
    }
    h2 {
        color: $secondary-color;
        text-align: center;
        justify-content: center;
    }
    &__cards {
        margin-top: 4rem;

        .details {
            background: $white-color;
            border: 1px solid $darkgray;
            border-radius: 8px;
            min-height: 100%;
            height: auto;
            width: 50%;
            padding: 4rem 6rem;
            overflow: hidden;
            margin: 0 3.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            @include media-max(lg){
                width: 60%;
                margin: 0 2rem;
                padding: 3rem 2.5rem;
            }
            @include media-max(xs){
                width: 90%;
                margin: 0 1rem;
            }

            p {
                font-size: 1.25rem;
                line-height: 2.125rem;
                font-feature-settings: 'pnum' on, 'lnum' on;
                font-weight: 400;
                color: $darkergray;
                margin-bottom: 3rem;
            }

            h3 {
                font-family: $primary-font;
                text-align: right;
                font-size: 2.125rem;
                letter-spacing: 0.05em;
                font-feature-settings: 'pnum' on, 'lnum' on;
                color: $darkergray;
                @include media-max(xs){
                    font-size: 1.438rem;
                }
            }

        }

    }
    // .slider-progress {
    //     text-align: center;
    //     margin-top: 5rem;

    //     @include media-max(xs){
    //         margin-top: 3rem;
    //     }

    //     progress {
    //         border-radius: 0px;
    //         width: 50%;
    //         @include media-max(xs){
    //             width: 90%;
    //             margin: auto;
    //             height: 0.489rem;
    //         }

    //         &::-webkit-progress-bar {
    //             background: $gray;
    //         }
    //         &::-webkit-progress-value {
    //             background: $secondary-color;
    //         }
    //     }
    // }
    :global(.flickity-viewport) {
        margin-bottom: 5rem;
        // min-height: 37.975rem !important;
        height: 45rem !important;
        @include media-max(xl1){
            height: 50rem !important;
        }
        @include media-max(default){
            height: 100vh !important;
        }
        @include media-max(w800){
            height: 115vh !important;
        }
    }
    :global(.flickity-page-dots) {
        bottom: unset;
    }
    :global(.flickity-page-dots .dot) {
        height: 1rem;
        width: 10rem;
        margin: 0;
        border-radius: 0;
        background: $gray;
        opacity: 1;
        @include media-max(w800){
            width: 5rem;
        }
        @include media-max(mm){
            width: 3rem;
        }
    }
    :global(.flickity-page-dots .dot.is-selected) {
        background: $secondary-color;
    }
}

</style>