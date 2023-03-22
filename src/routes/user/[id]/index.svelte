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
	<div>
		<Preview />
	</div>
</section>

<style>

	.page {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
	}

	.controls {
		padding: 1em;
		display: grid;
		grid-template-rows: repeat(3, min-content);
		gap: 1em;
		height: 100vh;
	}
</style>
