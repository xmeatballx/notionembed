<script lang="ts">
	import Editor from '$lib/editor/editor.svelte';
	import Preview from '$lib/editor/preview.svelte';
	export let databases: any;
	export let pages: any;
</script>

<section class="page">
	<!-- {JSON.stringify($state.blocks[0])} -->
	<div class="controls">
		<Editor {databases} {pages}/>
	</div>
	<div class="preview-container">
		<Preview />
	</div>
</section>

<style>

	.preview-container {
		background-color: white;
		color: black;
		min-height: 20rem;
		max-width: 100vw;
		display: flex;
		flex-direction: column;
		height: 100vh;
		display: grid;
		place-items: center;
	}

	.preview-container * {
		color: var(--gray-10);
		/* max-inline-size: var(--size-content-2); */
	}

	.page {
		display: grid;
		grid-template-columns: 1fr 4fr;
		width: 100%;
	}

	.controls {
		padding: 1em;
		display: grid;
		grid-template-rows: repeat(3, min-content);
		gap: 1em;
		height: 100vh;
	}

	@media(max-width: 820px) {
		.page {
			grid-template-columns: 1fr;
		}

		.controls {
			grid-row: 2
		}

		.preview-container {
			height: auto;
			padding: 10%;
		}
	}
</style>
