<script lang="ts">
    export let data;
    import { Form, FormGroup, Input, Label } from 'sveltestrap';
    import { Button } from 'sveltestrap';
    import PageBanner from '$lib/components/layout/PageBanner.svelte';
    import Animate from '$lib/components/Animate.svelte';
    // import { fade, fly } from 'svelte/transition';
    import { textAnimate, fly, fadeIn, slide } from '$lib/GsapAnimation.js';
    const color = "darkblue";
    import { Col, Container, Row } from 'sveltestrap';
    import { PUBLIC_STRAPI_API } from '$env/static/public';
    const url = "https://api.ulfbuilt.com/";
    
    let phone = data.contact.data.attributes.phone;
    let office_address = data.contact.data.attributes.office_address;
    let mailing_address = data.contact.data.attributes.mailing_address;
    let emailTo = data.contactDetails.data.attributes.contactDetails.emailTo;
	let emailSubject = data.contactDetails.data.attributes.contactDetails.emailSubject;
	let emailResponse = data.contactDetails.data.attributes.contactDetails.emailResponse;
    let name = '', email = '', formPhone = '', message = '', result = ''
    async function doContact () {
        const url = 'https://api.ulfbuilt.com/api/contact-forms';
		const res = await fetch(url, {
			method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + PUBLIC_STRAPI_API },
			body: JSON.stringify({
                data:{
                "name": name,
                "email": email,
                "phone": formPhone,
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
                "html": "<h1>"+name+"</h1><p>"+email+"</p><p>"+formPhone+"</p><p>"+message+"</p>",
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

    import { onMount } from "svelte";
	import { loadingCursor } from '$lib/cursorChange.js';
	onMount(() => {
		loadingCursor();
	});

</script>
<svelte:head>
	<title>{data.contact.data.attributes.title ? data.contact.data.attributes.title : 'Contact Us'}</title>
	<meta name="description" content="ULF BUILT" />
</svelte:head>

<PageBanner title="{data.contact.data.attributes.title ? data.contact.data.attributes.title : 'Contact Us'}" extraClass="contact" subTitle="{data.contact.data.attributes.Subheading ? data.contact.data.attributes.Subheading : ''}" banner="{url}{data.contact.data.attributes.featuredimage.data.attributes.formats.large_x2.url ? data.contact.data.attributes.featuredimage.data.attributes.formats.large_x2.url : data.contact.data.attributes.featuredimage.data.attributes.url}" />

<section class="mx-10 contact_inner">
    <!-- <Animate> -->
        <Container class="mb-5 contact_inner__content">
            <Row>
                <Col md="12">
                    <h2 class="text-center text-animate secondary-font" in:textAnimate id="contact_heading" gsap-duration="1.5" gsap-start="top center">{data.contact.data.attributes.section1Title ? data.contact.data.attributes.section1Title : ''}</h2>
                    <h4 class="text-center pfont">{data.contact.data.attributes.Section1SubAuthor ? '-' : ''} <span class="ptc"><i>{data.contact.data.attributes.Section1SubAuthor ? data.data.attributes.Section1SubAuthor : ''}</i></span></h4>
                    <p class="two-columns pt-3" in:fadeIn id="contact_content" gsap-duration="1.5" gsap-delay="0.5" gsap-start="top center">{@html data.contact.data.attributes.Subheading2 ? data.contact.data.attributes.Subheading2 : ''}</p>
                </Col>
            </Row>
        </Container>
    <!-- </Animate> -->

    <!-- <Animate> -->
        <Container class="contact_inner__details">
            <Row>
                <Col md="4" class="flex-vcenter">
                    <!-- <Animate> -->
                    <div in:slide id="contact_detail" gsap-duration="1.5" gsap-x="-5" gsap-start="top center">
                        <h4 class="ptc pfont">{data.contact.data.attributes.office_address_title ? data.contact.data.attributes.office_address_title : ''}</h4>
                        <h4 class="stc pb-5">{@html office_address ? office_address : ''}</h4>
                        <h4 class="ptc pfont">{data.contact.data.attributes.mailing_address_title ? data.contact.data.attributes.mailing_address_title : ''}</h4>
                        <h4 class="stc pb-5">{@html mailing_address ? mailing_address : ''}</h4>
                        <h4 class="ptc pfont">{data.contact.data.attributes.phone_title ? data.contact.data.attributes.phone_title : ''}</h4>
                        <h4 class="stc pb-5">{@html phone ? phone : ''}</h4>
                    </div>
                    <!-- </Animate> -->
                </Col>
                <Col md="8">
                    <!-- <Animate> -->
                        <iframe title="ULF BUILT" gsap-start="top center" in:fadeIn id="contact_map" gsap-duration="1.5" src="{data.contact.data.attributes.map_url ? data.contact.data.attributes.map_url : 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12289.756932100185!2d-106.59873028576666!3d39.63982841472373!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8741d9050f708981%3A0x28a8cd6309f12845!2sULFBUILT!5e0!3m2!1sen!2sin!4v1681880274611!5m2!1sen!2sin'}" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <!-- </Animate> -->
                </Col>
            </Row>
        </Container>
    <!-- </Animate> -->
</section>
    <div class="contact-img" style="background-image: url({url}{data.contact.data.attributes.formcover.data.attributes.formats.large.url ? data.contact.data.attributes.formcover.data.attributes.formats.large.url : data.data.attributes.formcover.data.attributes.url});">
    <div class="contact-box container-fluid">
                <div class="contact-form border-radius">
                    <h2 class="text-center pb-4 text-animate secondary-font" in:textAnimate id="contact_form_heading" gsap-start="center bottom" gsap-duration="1.5">{data.contact.data.attributes.contact_form_title ? data.contact.data.attributes.contact_form_title : ''}</h2>
                    <div in:fadeIn id="form_cont" gsap-start="center bottom" gsap-duration="1.5">
                        <Form method="post">
                            <FormGroup class="input-icon-box">
                                <Input class="input-user" placeholder="Full Name" bind:value={name} />
                                <div class="input-icon input-icon-user"></div>
                            </FormGroup>
                            <FormGroup class="input-icon-box">
                                <Input class="input-email" placeholder="Email address" bind:value={email} />
                                <div class="input-icon input-icon-email"></div>
                            </FormGroup>
                            <FormGroup class="input-icon-box">
                                <Input class="input-phone" placeholder="Phone Number" bind:value={formPhone} />
                                <div class="input-icon input-icon-phone"></div>
                            </FormGroup>
                            <FormGroup>
                                <Input type="textarea" id="yourMessage" placeholder="Tell us about your project..." bind:value={message}/>
                            </FormGroup>
                            <Button type="button" class="btn btn-secondary" on:click={doContact}>Send</Button>
                        </Form>
                        {result}
                    </div>
                </div>
    </div>
</div>

<style lang="scss">
    :global(.banner.contact) {
        background-position: center !important;
        @include media-max(xs) { 
            min-height: 25rem !important;
            background-size: auto !important;
        }
    }
    :global(.banner.contact:after) {
        @include media-max(xs) { 
            background-color: rgba(0, 0, 0, 0.4) !important;
        }
    }
    :global(.container.contact_inner__details) {
        @include media-max(sm) {
            text-align: center;
        }
    }
    .contact_inner {

        margin-top: 10vw;
        
        .contact_inner__content {
            h2 {
                font-size: 2.813rem;
                justify-content: center;
            }
            p {
                font-size: 1.25rem;
                line-height: 2.125rem;
            }
        }
        .contact_inner__details {
            
            .ptc {
                font-size: 1.438rem;
            }
            .stc {
                font-size: 1.688rem;
            }
        }
    }

    :global(.contact_inner__details h4 a) {
        color: $secondary-color;
        text-decoration: none;
    }

    .contact-box {
        display: flex;
        @include media-max(xs) { 
            padding: 0 1.25rem;
        }
        h2 {
            font-size: 2.25rem;
            justify-content: center;
        }
        :global(.contact-form) {
            max-width: 44rem;
            width: 100%;
            padding: 4rem 6rem;
            @include media-max(ipadmini) { 
                max-width: 45rem;
                padding: 4rem;
            }
        }
        :global(.contact-form form) {
                text-align: center;
        }
        :global(.contact-form textarea) {
            height: 8rem;
        }
        :global(.contact-form button) {
            padding: 0.7rem 3.125rem;
        }
        :global(.contact-form button:hover) {
            background-color: #263A63;
            color: #fff;
            border-color: #fff;
        }
        button{
            display: flex;
            margin: auto;
        }
    }
    .contact-img {
        margin-top: 15vw;
        min-height: 100vh;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        // @include media-max(sm) { 
        //     height: 18.75rem;
        // }
    }
    
    
</style>
