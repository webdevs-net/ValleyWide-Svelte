<script lang="ts">
import { fly, fade } from "svelte/transition";
// import {
//     MasonryGrid,
//     JustifiedGrid,
//     FrameGrid,
//     PackingGrid,
//   } from "@egjs/svelte-grid";
import { paginate, LightPaginationNav } from 'svelte-paginate';
import { PUBLIC_STRAPI_API } from '$env/static/public';
import { onMount } from 'svelte'
import noFeatured from "$lib/img/blog-empty.svg"

// const gap = 10;
// const defaultDirection = "end";
// const align = "end";
// const column = 0;
// const columnSize = 0;
// const columnSizeRatio = 0;
import axios from "axios";
import Animate from "./Animate.svelte";
export let id;
export let addPagination;
export let pageSize;
let projects;
let duration = 1500;
const cache = new Map();

export let propCount;
let currentPage = 1;

import ImageLoader from './imageLazy/ImageLoader.svelte';

// let items;

let promise = fetchPortfolios();
async function fetchPortfolios(){
    const url = "https://api.ulfbuilt.com/api/portfolios?filters[categories][id][$eq]="+id+"&populate=deep,2";
    const headers = {
        Authorization: 'Bearer ' + PUBLIC_STRAPI_API
    }  

    try {
        const response = await axios.get(url, { headers });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

$: if (id) {
    (async () => {
        promise = fetchPortfolios();
    })();
}

onMount(async () => {
    promise = fetchPortfolios();
})

</script>
{#await promise}
<div class="col text-center">Loading...</div>
{:then portfolios}
{@const items = portfolios}
    <div class="container masonry-wrapper">       
    {#each paginate({ items, pageSize, currentPage }) as project, index}			
        {#if index < propCount}
            <div class="masonry-items" in:fly="{{ y: 0, duration: 1000, delay:index * 1500}}" out:fly="{{y:0, duration:1000 }}"> 
                <a data-sveltekit-reload href="/portfolio/{project.attributes.slug}" class="zoomImg">  
                    {#if project.attributes.featuredImage.data != null}
                    <ImageLoader src="https://api.ulfbuilt.com/{project.attributes.featuredImage.data.attributes.url}" lowRes="https://api.ulfbuilt.com/{project.attributes.featuredImage.data.attributes.formats.small.url}" alt="{project.attributes.title}"></ImageLoader>
                    <!-- <img src="https://api.ulfbuilt.com/{project.attributes.featuredImage.data.attributes.url}" alt="{project.attributes.title}" >    -->
                    {:else}
                    <ImageLoader src="{noFeatured}" lowRes="{noFeatured}" alt="{project.attributes.title}"></ImageLoader>
                    <!-- <img src="{noFeatured}" alt="{project.attributes.title}" > -->
                    {/if}
                    <div class="masonry-items__text">
                        <span>{('0' + (index + 1)).slice(-2)}</span>
                        {project.attributes.title}
                        <i><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.29004 12.3459L6.29004 6.84595L1.29004 1.34595" stroke="#00ADEE" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </i>
                    </div>
                </a>
            </div>		
        {/if}			
    {/each}
    </div>  
    {#if addPagination == 'true' && pageSize < portfolios.length}
        <div class="paginate-section">
            <LightPaginationNav
            totalItems="{portfolios.length}"
            pageSize="{pageSize}"
            currentPage="{currentPage}"
            limit="{1}"
            showStepOptions="{true}"
            on:setPage="{(e) => currentPage = e.detail.page}"
            />
        </div>
    {/if} 	
{/await}

<style lang="scss">
    .container {
    overflow: hidden;
    }  
    .loading{
        width: 100%;
        text-align: center;
    }
    .masonry-wrapper {
        min-height: 31rem;
        column-count: 2;
        column-gap: 0.625rem;
        .masonry-items{
            display: grid;
            grid-template-rows: 1fr auto;
            break-inside: avoid;
            overflow: hidden;
            color: white;
            text-align: center;  
            padding-top: 0.8rem;
            &:hover{
                .masonry-items__text{
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
            @include media-max(sm){
                width: 100%;
                padding-top: 1rem;
            }

            @include media-max(lg){
                min-height: unset;
                min-width: unset;
            }   

            a{
                display: block;
                height: 100%;
                width: 100%;
                margin: .5rem;
                overflow: hidden;
                position: relative;

                &:hover{
                    .masonry-items__text{
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
                    
                @include media-max(sm){
                    width: 100%;
                    margin: 0;
                }               
                img{
                    height: 100%;
                    object-fit: cover;
                    min-height: 26.813rem;
                    min-width: 39.688rem;

                    @include media-max(xs){
                        min-height: unset;
                        min-width: unset;
                    }   
                }   
            }  
            &__text{
                background-color: $secondary-color;
                color: #fff;
                padding: 0.5rem;
                position: absolute;
                z-index: 2;
                bottom: 1rem;
                left: 0;
                width: 65%;
                text-align: left;
                transition: 0.3s;
                @include media-max(ipadmini){
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
                    }                
                }
                i{
                position: absolute;
                top: 20%;
                right: 1rem;
                }
            }
        }
    }
    
    .paginate-section {
        margin-top: 5rem; 
    }
    :global(.blog-card) {
        align-items: center;
    }
</style>
