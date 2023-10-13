<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    // import { page } from '$app/stores';
	// import {Styles} from 'sveltestrap';
    import logo from '$lib/img/logo.svg';  
	import "../styles/fonts.scss";
    import "../styles/style.scss";		
	// import Animate from "$lib/components/Animate.svelte";
	import HamburgerLight from "$lib/img/HamburgerLight.svg"
	import HamburgerDark from "$lib/img/HamburgerDark.svg"
	import { PUBLIC_STRAPI_API } from '$env/static/public';
	
	import {
	  Collapse,
	  Navbar,
	  NavbarToggler,
	  NavbarBrand,
	  Nav,
	  NavItem,
	  NavLink,
	  Dropdown,
	  DropdownToggle,
	  DropdownMenu,
	  DropdownItem,

	  Container

	} from 'sveltestrap';
	export let menu;
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';

	let promise = fetchSiteSettings();
	const domain = "https://api.ulfbuilt.com/";
	async function fetchSiteSettings(){
		const url = 'https://api.ulfbuilt.com/api/site-setting?populate=deep,3';
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
	let isOpen = false;
	let isMobile;
	// let innerWidth;
	let innerWidth;
	function toggleMenu() {
		isOpen = !isOpen;
	}

	function hideDropdownOnScroll() { // hide opened dropdown upon scrolling on desktop
		
		const dropdownParent = document.querySelector('.dropdown.nav-item');

		if (window.innerWidth >= 768 && dropdownParent) {
			if(dropdownParent.classList.contains('show')) {

				// Create a custom click event
				const clickEvent = new MouseEvent('click', {
					bubbles: true,
					cancelable: true,
					view: window
				});

				dropdownParent.dispatchEvent(clickEvent);
			}
		}

	}

	onMount(() => {
		promise = fetchSiteSettings();
		window.addEventListener('resize', () => {
			if (window.innerWidth > 768) {
					isOpen = false;
			} 
		});
  	});
</script>
<svelte:window 
	bind:innerWidth
	on:scroll={hideDropdownOnScroll}
  />
{#await promise}
{:then siteSettings} 
  <Navbar expand="md">
	<NavbarBrand href="/">
		<div class="logo-container">
			<img src={siteSettings.Header.Logo.data ? domain+siteSettings.Header.Logo.data.attributes.url : logo} alt="ULFBUILT" class="logo" width="330" height="170" />
		</div>
	</NavbarBrand>
	{#if !isOpen}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="{isOpen ? "hamburger open" : "hamburger close" }" on:click={toggleMenu}>
			<!-- <span class="icon"></span>		 -->
			<img width="49" height="49" src="{siteSettings.Header.hamburgerLight.data ? domain+siteSettings.Header.hamburgerLight.data.attributes.url : HamburgerLight}" alt="hamburger" class="light-hamburger">
			<img width="49" height="49" src="{siteSettings.Header.hamburgerDark.data ? domain+siteSettings.Header.hamburgerDark.data.attributes.url : HamburgerDark}" alt="hamburger" class="dark-hamburger">
		</div>
	{/if}
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
		{#if innerWidth > 767}
			<Collapse navbar expand="md">
				<Nav class="ms-auto" navbar>
				{#each menu.data.attributes.items.data as nav}
					{#if nav.attributes.children.data.length === 0}
						<NavItem>
							<NavLink data-sveltekit-preload-data="tap" href="{nav.attributes.url ? nav.attributes.url : '#'}">{nav.attributes.title ? nav.attributes.title : ''}</NavLink>
						</NavItem>			
					{:else}
						<Dropdown nav inNavbar>
							<DropdownToggle nav caret href="{nav.attributes.url ? nav.attributes.url : '#'}">{nav.attributes.title ? nav.attributes.title : ''}</DropdownToggle>
							<DropdownMenu end>
								{#each nav.attributes.children.data as child}
									<DropdownItem href="{child.attributes.url ? child.attributes.url : '#'}">{child.attributes.title ? child.attributes.title : ''}</DropdownItem>
								{/each}			
							</DropdownMenu>
						</Dropdown>						
					{/if}
				{/each} 
				</Nav>
			</Collapse>		
		 {/if}
		{#if isOpen && innerWidth < 767}
			<div class="{isOpen ? "mobile-nav open" : "mobile-nav" }" in:fly={{
				duration: 1000,
				x: 250							
			}} out:fly={{
				duration: 1000,
				x: 400							
			}}>
				
				<div class="{isOpen ? "hamburger open" : "hamburger" }" on:click={toggleMenu}>
					<span class="icon"></span> <!-- x icon -->
				</div>
				<a href="/" class="mobile-menu-logo">
					<img src={siteSettings.Header.Logo.data ? domain+siteSettings.Header.Logo.data.attributes.url : logo} alt="ULFBUILT" class="logo"/>
				</a>				
				

				<Collapse {isOpen} navbar expand="md" >
					<Nav class="ms-auto" navbar>
					{#each menu.data.attributes.items.data as nav}
						{#if nav.attributes.children.data.length === 0}
							<NavItem>
								<NavLink data-sveltekit-preload-data="tap" href="{nav.attributes.url ? nav.attributes.url : '#'}">{nav.attributes.title ? nav.attributes.title : ''}</NavLink>
							</NavItem>			
						{:else}
							<Dropdown nav inNavbar>
								<DropdownToggle nav caret href="{nav.attributes.url ? nav.attributes.url : '#'}">{nav.attributes.title ? nav.attributes.title : ''}</DropdownToggle>
								<DropdownMenu end>
									{#each nav.attributes.children.data as child}
										<DropdownItem href="{child.attributes.url ? child.attributes.url : '#'}">{child.attributes.title ? child.attributes.title : ''}</DropdownItem>
									{/each}			
								</DropdownMenu>
							</Dropdown>						
						{/if}
					{/each} 
					</Nav>
				</Collapse>
				<div class="bottom-menu-content">
					<a href="mailto:{siteSettings.SiteDetails.Email ? siteSettings.SiteDetails.Email : ''}" class="mail">{siteSettings.SiteDetails.Email ? siteSettings.SiteDetails.Email : ''}</a>
					<div class="bottom-menu-content__social">
						<span class="icon">
							<a href="{siteSettings.SiteDetails.fbLink ? siteSettings.SiteDetails.fbLink : '#'}" target="_blank">
								<svg width="14" height="23" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M10.6965 11.2879L11.245 7.70923H7.8112V5.38702C7.8112 4.40751 8.28995 3.45368 9.82892 3.45368H11.3899V0.406921C11.3899 0.406921 9.97382 0.164795 8.61829 0.164795C5.78981 0.164795 3.94085 1.87802 3.94085 4.98164V7.70923H0.796875V11.2879H3.94085V19.9403C4.57184 20.0393 5.21751 20.0907 5.87602 20.0907C6.53453 20.0907 7.1802 20.0393 7.8112 19.9403V11.2879H10.6965Z" fill="#3E3636"/>
								</svg>                                    
							</a>
						</span>
						<span class="icon">
							<a href="{siteSettings.SiteDetails.ytLink ? siteSettings.SiteDetails.ytLink : '#'}" target="_blank">
								<svg width="19" height="14" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M16.466 2.15357C16.2771 1.4437 15.7176 0.884243 15.0059 0.693477C13.7182 0.348631 8.55655 0.348633 8.55655 0.348633C8.55655 0.348633 3.39486 0.348631 2.10719 0.693477C1.39732 0.884243 0.837859 1.44187 0.647093 2.15357C0.302247 3.44124 0.302246 6.12664 0.302246 6.12664C0.302246 6.12664 0.302247 8.81204 0.647093 10.0997C0.836025 10.8096 1.39549 11.369 2.10719 11.5598C3.39486 11.9047 8.55655 11.9047 8.55655 11.9047C8.55655 11.9047 13.7182 11.9047 15.0059 11.5598C15.7158 11.369 16.2752 10.8114 16.466 10.0997C16.8109 8.81204 16.8109 6.12664 16.8109 6.12664C16.8109 6.12664 16.8109 3.44124 16.466 2.15357ZM6.90569 8.60293V3.65035L11.1943 6.12664L6.90569 8.60293Z" fill="#3E3636"/>
								</svg>                                                                      
							</a>
						</span>       
						<span class="icon">
							<a href="{siteSettings.SiteDetails.igLink ? siteSettings.SiteDetails.igLink : '#'}" target="_blank">
								<svg width="19" height="18" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M8.48116 1.73514C10.5631 1.73514 10.8089 1.74248 11.6306 1.781C12.39 1.81585 12.8027 1.94242 13.0779 2.04881C13.4411 2.19005 13.7015 2.3588 13.9749 2.63211C14.2482 2.90542 14.4169 3.16405 14.5582 3.52908C14.6646 3.80422 14.7911 4.21694 14.826 4.97633C14.8626 5.79809 14.8718 6.04572 14.8718 8.12581C14.8718 10.2059 14.8645 10.4535 14.826 11.2753C14.7911 12.0347 14.6646 12.4474 14.5582 12.7225C14.4169 13.0857 14.2482 13.3462 13.9749 13.6195C13.7015 13.8928 13.4429 14.0616 13.0779 14.2028C12.8027 14.3092 12.39 14.4358 11.6306 14.4706C10.8089 14.5073 10.5631 14.5165 8.48116 14.5165C6.39924 14.5165 6.15344 14.5091 5.33168 14.4706C4.57229 14.4358 4.15957 14.3092 3.88443 14.2028C3.52124 14.0616 3.26077 13.8928 2.98746 13.6195C2.71415 13.3462 2.5454 13.0876 2.40416 12.7225C2.29777 12.4474 2.1712 12.0347 2.13635 11.2753C2.09966 10.4535 2.09049 10.2059 2.09049 8.12581C2.09049 6.04572 2.09783 5.79809 2.13635 4.97633C2.1712 4.21694 2.29777 3.80422 2.40416 3.52908C2.5454 3.16589 2.71415 2.90542 2.98746 2.63211C3.26077 2.3588 3.5194 2.19005 3.88443 2.04881C4.15957 1.94242 4.57229 1.81585 5.33168 1.781C6.15344 1.74432 6.40108 1.73514 8.48116 1.73514ZM8.48116 0.330078C6.36439 0.330078 6.09841 0.33925 5.26748 0.37777C4.43838 0.41629 3.87159 0.546524 3.37449 0.740959C2.86273 0.940896 2.428 1.20687 1.99327 1.63976C1.56038 2.07265 1.29258 2.50738 1.09447 3.02098C0.901872 3.51624 0.769802 4.08303 0.731281 4.91397C0.692761 5.7449 0.683594 6.01087 0.683594 8.12764C0.683594 10.2444 0.692761 10.5104 0.731281 11.3413C0.769802 12.1704 0.900038 12.7372 1.09447 13.2343C1.29441 13.7461 1.56038 14.1808 1.99327 14.6155C2.42617 15.0484 2.86089 15.3162 3.37449 15.5143C3.86975 15.7069 4.43655 15.839 5.26748 15.8775C6.09841 15.916 6.36439 15.9252 8.48116 15.9252C10.5979 15.9252 10.8639 15.916 11.6948 15.8775C12.5239 15.839 13.0907 15.7088 13.5878 15.5143C14.0996 15.3144 14.5343 15.0484 14.969 14.6155C15.4019 14.1826 15.6697 13.7479 15.8678 13.2343C16.0604 12.739 16.1925 12.1722 16.231 11.3413C16.2696 10.5104 16.2787 10.2444 16.2787 8.12764C16.2787 6.01087 16.2696 5.7449 16.231 4.91397C16.1925 4.08487 16.0623 3.51807 15.8678 3.02098C15.6679 2.50921 15.4019 2.07449 14.969 1.63976C14.5361 1.20687 14.1014 0.939062 13.5878 0.740959C13.0926 0.548359 12.5258 0.41629 11.6948 0.37777C10.8639 0.33925 10.5979 0.330078 8.48116 0.330078Z" fill="#3E3636"/>
									<path d="M8.47947 4.12378C6.26915 4.12378 4.47705 5.91588 4.47705 8.1262C4.47705 10.3365 6.26915 12.1286 8.47947 12.1286C10.6898 12.1286 12.4819 10.3365 12.4819 8.1262C12.4819 5.91588 10.6898 4.12378 8.47947 4.12378ZM8.47947 10.7254C7.04506 10.7254 5.88028 9.56245 5.88028 8.1262C5.88028 6.68995 7.04322 5.52701 8.47947 5.52701C9.91572 5.52701 11.0787 6.68995 11.0787 8.1262C11.0787 9.56245 9.91572 10.7254 8.47947 10.7254Z" fill="#3E3636"/>
									<path d="M12.6469 4.89832C13.1636 4.89832 13.5824 4.47949 13.5824 3.96283C13.5824 3.44618 13.1636 3.02734 12.6469 3.02734C12.1303 3.02734 11.7114 3.44618 11.7114 3.96283C11.7114 4.47949 12.1303 4.89832 12.6469 4.89832Z" fill="#3E3636"/>
								</svg>
							</a>
						</span>                                         
					</div>
					<div class="footer__post-footer__paragraph">
						<p>{@html siteSettings.SiteDetails.OperatingHours ? siteSettings.SiteDetails.OperatingHours : ''}</p>
					</div>		
				</div>	
			</div>		
		{/if}
  </Navbar>
  {/await}
