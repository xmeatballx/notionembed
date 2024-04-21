<script lang="ts">
	import Editor from '$lib/editor/editor.svelte';
	import Preview from '$lib/editor/preview.svelte';

	export let data: any;
	let databases = data.datbases;
	let pages = data.pages;
</script>

<section class="page">
	<!-- {JSON.stringify($state.blocks[0])} -->
	<div class="controls">
		<Editor {databases} {pages} />
	</div>
	<div class="preview-container">
		<Preview />
	</div>
</section>

<style>
	.preview-container {
		background-color: var(--surface-1);
		color: var(--text-1);
		min-height: 20rem;
		max-width: 100vw;
		display: flex;
		flex-direction: column;
		height: calc(100vh - 66px);
		display: grid;
		place-items: center;
		/* border: 1px solid var(--surface-3); */
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		/* box-shadow: var(--shadow-4); */
		align-self: start;
	}

	.page {
		display: grid;
		grid-template-columns: 1fr 3fr;
		/* display: flex; */
		width: 100%;
		/* height: calc(100vh - 66px); */
		/* position: relative; */
	}

	.controls {
		background-color: var(--surface-2);
		/* padding: var(--size-4); */

		display: flex;
		flex-direction: column;
		/* grid-template-rows: repeat(3, min-content); */
		gap: 0.5em;
		/* height: 100vh; */
		border-right: 1px solid var(--surface-3);
		/* max-height: calc(100vh - 66px); */
	}

	@media (max-width: 820px) {
		.page {
			grid-template-columns: 1fr;
		}

		.controls {
			grid-row: 2;
		}

		.preview-container {
			height: auto;
			padding: var(--size-2);
		}
	}
</style>
