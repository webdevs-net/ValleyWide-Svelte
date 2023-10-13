<script lang="ts">
	import { Col, Container, Row } from "sveltestrap";
    import { Form, FormGroup, Input, Button } from 'sveltestrap';
    // import contactBG from "$lib/img/ContactBG.jpg";
    // import contactBGPlain from "$lib/img/ContactBGPlain.jpeg";
	import { PUBLIC_STRAPI_API } from '$env/static/public';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import Animate from '$lib/components/Animate.svelte';
    // import { fade, fly } from 'svelte/transition';
	import { textAnimate, fly, fadeIn, slide, bgZoom } from '$lib/GsapAnimation.js';

	let emailTo = '';
	let emailSubject = '';
	let emailResponse = '';
	async function fetchContactDetails(){
		const url = 'https://api.ulfbuilt.com/api/site-setting?populate=deep,3';
		const headers = {
			Authorization: 'Bearer ' + PUBLIC_STRAPI_API
		};

		try {
			const response = await axios.get(url, { headers });
			// return response.data.data.attributes;
			emailTo = response.data.data.attributes.contactDetails.emailTo;
			emailSubject = response.data.data.attributes.contactDetails.emailSubject;
			emailResponse = response.data.data.attributes.contactDetails.emailResponse;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}


    let name = '', email = '', phone = '', message = '', result = ''
    async function doContact () {
        const contactUrl = 'https://api.ulfbuilt.com/api/contact-forms';
		const res = await fetch(contactUrl, {
			method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + PUBLIC_STRAPI_API },
			body: JSON.stringify({
                data:{
                "name": name,
                "email": email,
                "phone": phone,
                "message": message
                }
			})
		})
		const json = await res.json()
        if(json.error){
            result = json.error.message
        }else{
            result = 'Processing...'
			const url2 = 'https://api.ulfbuilt.com/api/email/';
			const res2 = await fetch(url2, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + PUBLIC_STRAPI_API },
				body: JSON.stringify({
					"to": emailTo ? emailTo : 'dev@netdevs.com',
					"subject": emailSubject ? emailSubject : 'UlfBuilt Contact Form',
					"html": "<h1>"+name+"</h1><p>"+email+"</p><p>"+phone+"</p><p>"+message+"</p>",
				})
			})
			const json2 = await res2.json()
			if(json2.error){
				result = json2.error.message
			}else{
				result = emailResponse ? emailResponse : "We appreciate you taking the time to reach out. We'll respond to you within 1 business day, or sooner.";
			}
        }
	}

	let promise = fetchContactSettings();
	const domain = "https://api.ulfbuilt.com/";
	async function fetchContactSettings(){
		const url = 'https://api.ulfbuilt.com/api/contact-cta?populate=deep,3';
		const headers = {
			Authorization: 'Bearer ' + PUBLIC_STRAPI_API
		};

		try {
			const response = await axios.get(url, { headers });
			return response.data.data.attributes;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	onMount(() => {
		promise = fetchContactSettings();
		fetchContactDetails();
  	});	
</script>
{#await promise}
{:then contactSettings} 
<!-- <Animate> -->
<section class="contact" in:bgZoom id="form-section-bg">
	<div class="contact-form-bg bg" style="--contactBG: url({domain}{contactSettings.background.data.attributes.url})" ></div>
	<Container>
		<Row>
			<Col md="6">
				<div class="contact__content">
					<div class="contact__content__wrapper">
						<h2 class="text-animate secondary-font" in:textAnimate id="global_contact_heading" gsap-duration="1">{contactSettings.heading ? contactSettings.heading : ''}</h2>
						<p in:fly id="global_contact_cont" gsap-delay="0.5" gsap-duration="1.2">{contactSettings.subheading ? contactSettings.subheading : ''}</p>
					</div>
				</div>
			</Col>
			<Col md="6">
				<div class="contact__form" in:fly id="global_contact_form" gsap-duration="2" gsap-y="30">
					<Form method="post">
						<FormGroup class="input-icon-box">
							<Input class="input-user" placeholder="Full Name" bind:value={name} />
							<div class="input-icon input-icon-user"></div>
						</FormGroup>
						<FormGroup class="input-icon-box">
							<Input class="input-email" placeholder="Email address" bind:value={email} required />
							<div class="input-icon input-icon-email"></div>
						</FormGroup>
						<FormGroup class="input-icon-box">
							<Input class="input-phone" placeholder="Phone Number" bind:value={phone} />
							<div class="input-icon input-icon-phone"></div>
						</FormGroup>
						<FormGroup>
							<Input type="textarea" id="yourMessage" placeholder="Tell us about you project..." bind:value={message} required/>
						</FormGroup>
						<!-- <Button type="btn is-primary"  on:click={doContact}>Send</Button> -->
						<button on:click|preventDefault={doContact} class="btn btn-secondary">Send</button>
					</Form>
				</div>
                {result}
			</Col>			
		</Row>
	</Container>
</section>
<!-- </Animate> -->
{/await}
<style lang="scss">
.contact{
	padding: 10rem 0;
	// box-shadow: inset 0 0 0 2000px rgb(237 234 220 / 85%);
	margin: 0;
	min-height: 20vh;
	position: relative;
	overflow: hidden;
	.contact-form-bg {
		background-image: var(--contactBG);
		background-size: cover;
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
	}
	@include media-max(md){
       padding-left: 3rem;
	   padding-right: 3rem;
    }	
	@include media-max(sm){
		padding: 10rem 1rem;
	}
	&__content{
		display: flex;
		height: 100%;
		align-items: center;		
		padding-bottom: 7rem;
		@include media-max(sm){
			padding-bottom: 3rem;
			text-align: center;
		}
		&__wrapper{
			h2{
				margin-bottom: 1rem;
				// flex-wrap: wrap;
				width: 27rem;
				@include media-max(laptopS){
					width: unset;
				}
			}	
			p {
				font-size: 1.5rem;
				font-weight: 500;
				font-family: $primary-font;
			}
		}
	}
	&__form{
		:global(#yourMessage){
			height: 15rem;
		}
		margin-bottom: 1rem;
		text-align: center;
		:global(.btn) {
			padding: 0.7rem 3.125rem;
            font-size: 1.25rem;
		}
	}
}
</style>