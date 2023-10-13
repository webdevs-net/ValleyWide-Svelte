<script>
import MasonryCard from "./MasonryCard.svelte";
import { fade } from "svelte/transition";

export let items = [];
let activeTab = items[0].id ;

function handleTabClick(category) {
    activeTab = category;
}	

let propCount = 10;
let listener = {};

export let subHeading2 = '';
export let paginate = '';
export let postperpage = '';

$: listener = {propCount, activeTab};

</script>

<div class="masonry">
    <div class="masonry__tabs">
        <div class="masonry__tabs__heading">
            <ul>
                {#each items as heading}
                    <li>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <span
                        data-category="{heading.id}"
                        class:active="{activeTab === heading.id}"
                        on:click="{() => handleTabClick(heading.id)}">
                        {heading.attributes.Title}
                        </span>
                    </li>
                {/each}
            </ul>
        </div>
		<!-- <div class="masonry__tabs__link view-all" >
			{#if propCount === 10} 
				<span on:click="{() => propCount = 999}">View All Projects</span>
			{:else}
				<span on:click="{() => propCount = 10}">View Less Projects</span>
			{/if}
		</div> -->
		<!-- {#if subHeading2}
		<div class="masonry__tabs__subheading">
			<p>{@html subHeading2}</p>
		</div>	
		{/if}				 -->
		<div class="categories__tabs__gallery">
			{#key listener}
				<div  id="modern" class="masonry__tabs__gallery__imgs "  data-test={activeTab} transition:fade >
					<MasonryCard id={activeTab} {propCount} addPagination={paginate} pageSize=9 />
				</div>			
			{/key}																		
		</div>					
    </div>
</div>


<style lang="scss">
	.masonry{
        min-height: 30vw;
		h2{
			margin-bottom: 3rem;
			font-size: 3rem;
		}
		&__tabs{
			&__heading{
				ul{
					display: flex;
					flex-wrap: wrap;
					width: 90%;
					margin: auto;
					margin-bottom: 2rem;
					padding-left: 0;					
					@include media-max(lg){
						flex-wrap: nowrap;
						padding: 1rem 0;
						overflow-x: scroll;
						width: 100%;
					}										
					li{
						list-style: none;
						width: 25%;
						@include media-max(sm){
							width: 15rem;
							padding: 0 1rem;
						}		
						border-right: 1px solid $gray;	
						&:last-child {
							border: none;
						}
						&:hover{
							background-color: rgba(32, 36, 41, 0.561);	
							transition: 0.3s all;
							span{
								color: #fff;
								&.active{
									color: #fff;
								}
							}
						}						
						span{				
							font-family: $secondary-font;
							font-size: 1.75rem;
							color: #D8D7D7;
							text-transform: uppercase;
							margin-bottom: 2em;
							// border-bottom: 3px solid #D8D7D7;
							font-weight: 500;
							cursor: pointer;
							@include media-max(lg){
								font-size: 1.5rem;
							}															
							@include media-max(md){
								font-size: 1.2rem;
							}
							&.active{
								color: $secondary-color;
								border-bottom-color: $primary-color;
							}
						}
					}
				}
			}
            &__link{
                margin-bottom: 4rem;
                span{
                    color: $secondary-color;
                    text-decoration: none;
					font-size: 1.25rem;
					font-weight: 400;
					&:hover{
						cursor: pointer;
					}
                }
            }
			&__gallery{
				&__imgs{
					// display: flex;
                    // flex-wrap: wrap;
                    // display: grid;
                    // grid-template-columns: repeat(2, 1fr);
                    // grid-gap: 2rem;
					min-height: 60vh;
					div{
						width: 33.33%;
						margin: 0 1rem;
						&:first-child{
							margin-left: 0;
						}
						&:last-child{
							margin-right: 0;
						}						
					}
				}
			}
			&__subheading {
				text-align: left;
				display: flex;
				justify-content: center;
				margin-bottom: 3rem;
				:global(p) {
					font-size: 1.25rem;
				}
			}
		}
	}    
</style>