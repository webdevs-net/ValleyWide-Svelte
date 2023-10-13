<script>
    export let testimonial;
    export let testimonial_id;
    import {Container, Row, Col} from "sveltestrap";
	// import { fade, fly } from 'svelte/transition';
	import Animate from "$lib/components/Animate.svelte";
	import { fly } from '$lib/GsapAnimation.js';
</script>

<section class="testimonial testimonialA">
	<Animate>
		<Container>
			<Row>
				<Col >
					<p class="text-center" in:fly id="{testimonial_id}" gsap-duration="1.2" gsap-y="50">
						{ testimonial ? testimonial : '' }
					</p>
				</Col>
			</Row>
		</Container>
	</Animate>
</section>

<style lang="scss">
	.testimonial{
		padding: 3rem 0;
		min-height: 10vh;

		p{
			font-size: 1.688rem;
    		font-weight: 400;		
			position: relative;
			padding: 0 3rem;
			font-family: $secondary-font;
			@include media-max(sm){
				padding: 0;
			}			
			// &:before{
			// 	content: url("/left-quote.png");
			// 	vertical-align: top;
			// 	position: absolute;
			// 	top: 0;
			// 	left: 0;
			// }	
			// &:after{
			// 	content: url("/right-quote.png");
			// 	vertical-align: top;
			// 	position: absolute;
			// 	bottom: 0;
			// 	right: 0;
			// }				
		}
	}    
</style>