<script lang="ts">
    import { onMount } from 'svelte';
    // import { fade, fly } from 'svelte/transition';
	// import Animate from "$lib/components/Animate.svelte";
    import { textAnimate, fly, fadeIn, slide } from '$lib/GsapAnimation.js';

    let flickityInstance;
    export let clientTestimonials;
    export let testimonialHeading;


    onMount(() => {
        flickityInstance = new Flickity('.slider-container', {
            cellAlign: 'center',
            wrapAround: true,
            prevNextButtons: false,
            pageDots: true,
            autoPlay: false,
            groupCells: 1,
            draggable: true,
        });
    })

    // let progressPercentage = 100 / clientTestimonials.length;

    // function updateProgress() {
    //     const totalSlides = clientTestimonials.length;
    //     const index = flickityInstance.selectedIndex + 1;
    //     progressPercentage = ((index) / totalSlides) * 100;
    // }

</script>

<section class="our_client_say">
    <div>
        <h2 class="text-animate secondary-font" in:textAnimate id="testimonial-heading" gsap-duration="1" >{testimonialHeading ? testimonialHeading : 'Our Clients say...'}</h2>
        <div class="our_client_say__cards slider-container" in:fly id="testimonial-cont" gsap-duration="2">
            {#each clientTestimonials as testimonial}
                <div class="details">
                    <p>{testimonial.attributes.testimonialText ? testimonial.attributes.testimonialText.replace(/(<([^>]+)>)/gi, "") : ''}</p>
                    <h3>{testimonial.attributes.Name ? testimonial.attributes.Name : ''}</h3>
                </div>
            {/each}
        </div>
        <!-- <div class="slider-progress">
            <progress id="file" value="{progressPercentage}" max="100"></progress>
        </div> -->
    </div>
</section>

<style lang="scss">

    
.our_client_say {
    background:  linear-gradient(180deg, rgba(255, 255, 255, 0) -40.92%, rgba(239, 239, 240, 0.83) 36.13%, #FFFFFF 76.97%, rgba(255, 255, 255, 0) 137.31%); ;
    mix-blend-mode: normal;
    padding: 14rem 0;
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