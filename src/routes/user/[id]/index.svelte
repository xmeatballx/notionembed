<script lang="ts">
	import { page } from '$app/stores';
	import { state } from '../../../stores';
	import * as api from '../../../lib/_api';
	import Editor from '$lib/editor/editor.svelte';
	import Preview from '$lib/editor/preview.svelte';
	import DBOptions from '$lib/editor/dbOptions.svelte';

	export let databases: any;
	export let pages: any;
	$state.user_id = $page.params.id;
	$state.database_id = databases[0].id;
	$state.preview_as_id = pages[0].id;
	$state.page_properties = pages[0].properties;

	async function resetDB(e: any) {
		pages = await api.getDatabase($page.params.id, e.target.value);
		$state.page_properties = pages[0].properties;
		$state.blocks = [];
	}
</script>

<section class="page">
	<!-- {JSON.stringify($state.blocks[0])} -->
	<div class="controls">
		<DBOptions {databases} {pages} />
		<Editor />
	</div>
	<div>
		<Preview />
	</div>
</section>

<style>
	.select {
		width: 100%;
	}

	.page {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
	}

	.controls {
		padding: 1em;
	}
</style>
