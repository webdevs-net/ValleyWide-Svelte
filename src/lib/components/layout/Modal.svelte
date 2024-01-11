<script lang="ts">
	export let showModal; // boolean
	import xButton from "$lib/img/modal-close.svg";

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<img loading="lazy" src="{xButton}" class="close" alt="close" on:click={() => dialog.close()}>
		<slot />
	</div>
</dialog>

<style lang="scss">
	dialog {
		max-width: 80%;
        // min-height: 50.75rem;
        height: 95%;
		border-radius: 0.2em;
		border: none;
		padding: 0;
        position: fixed;
        padding: 4.875rem 3.563rem;
		mix-blend-mode: normal;
		box-shadow: 0px 4px 4px 2px rgba(103, 103, 103, 0.15);
		border-radius: 5px;
		overflow: hidden;

		@include media-max(default){
			max-width: 95%;
		}

		@include media-max(md){
            overflow: auto;
			@include scrollbars(0.824rem, 80px, $secondary-color, $white-color);
			// min-height: 60.75rem;
        }

		@include media-max(xs){
			padding: 4rem 2rem;
		}

		@include media-max(ml){
			padding: 3rem 1rem;
		}

        &:focus-visible {
            outline: none;
        }

        &::backdrop {
            background: rgba(0, 0, 0, 0.5);
        }

        &[open] {
            animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            &::backdrop {
                animation: fade 0.2s ease-out;
            }
        }

		.close {
			width: 3rem;
			height: 3rem;
			position: absolute;
			top: 3rem;
			right: 3.563rem;
			cursor: pointer;
			@include media-max(ml){
				top: 1rem;
				right: 1rem;
			}
		}
		

	}
	
	@keyframes zoom {
		from {
			transform: scale(0.95);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
		}
		to {
			transform: scale(1);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
		}
	}
	
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>