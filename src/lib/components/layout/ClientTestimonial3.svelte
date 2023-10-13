<script>
	import { textAnimate } from '$lib/GsapAnimation';
	import Siema from 'siema';
	import { onMount } from 'svelte';
	import { Container } from 'sveltestrap';
	
    export let clientTestimonials;
    export let testimonialHeading;

	let slider, prev, next, radioSlider
	let select = 0

	
	onMount(() => {
		slider = new Siema({
				selector: '.siema',
				duration: 200,
				easing: 'ease-in-out',
				perPage: 1,
				startIndex: 0,
				draggable: true,
				multipleDrag: true,
				threshold: 20,
				loop: true,
				rtl: false,
				onInit: () => {},
				onChange: () => {},
			}); //end Siema constructor

		prev = () => {
			slider.prev()
			if (select > 0) {
				select--
			}
		}

		next = () => {
			slider.next()
			if (select >= 0) {
				select++
			}
		}
	}) //end onMount
	
	
</script>
<section class="our_client_say">
    <h2 class="text-animate secondary-font" in:textAnimate id="testimonial-heading" gsap-duration="1" >{testimonialHeading ? testimonialHeading : 'Our Clients say...'}</h2>
<Container>
<div class="siema">
    {#each clientTestimonials as testimonial}
    <div class="slider">
        <p>{testimonial.attributes.testimonialText ? testimonial.attributes.testimonialText.replace(/(<([^>]+)>)/gi, "") : ''}</p>
        <h3>{testimonial.attributes.Name ? testimonial.attributes.Name : ''}</h3>
    </div>
    {/each}
</div>
</Container>
<div class='bullet' style="display: none;">
	{#each clientTestimonials as d, i}
		<input 
					 bind:this={radioSlider}
					 type="radio" 
					 id={i} name="slider-radio" 
					 value={i}
					 checked = { select == i }
					 on:click= {() => {slider.goTo(i)}}
		>
{/each}
</div>

<button on:click={prev} style="display: none;">
	prev
</button>
<button on:click={next} style="display: none;">
	next
</button>
</section>

<style lang="scss">
    .siema{
        overflow: visible !important;
    }
    .our_client_say{
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
        margin-bottom: 5rem;
    }
    &__cards {
        margin-top: 4rem;
    }
}

.slider {
            background: $white-color;
            border: 1px solid $darkgray;
            border-radius: 8px;
            padding: 6vw 8vw;
            margin: 0 2vw;
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction: column;
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
</style>