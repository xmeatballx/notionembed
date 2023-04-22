<script lang="ts">
	import type { Block } from 'src/types';
	import { state } from '../../stores';
	import BlockEditor from './blocks.svelte';
	import { getDefaultBlockType, getFirstProp } from '$lib/utils';
	import DbOptions from './dbOptions.svelte';
	import { page } from '$app/stores';
	import * as api from '../../lib/_api';

	function addBlock() {
		let blocks = $state.blocks as Array<Block>;
		const currentProp = getFirstProp($state.page_properties);
		let block: Block = {
			propertyId: currentProp.id,
			propertyType: currentProp.type,
			previewElement: getDefaultBlockType(currentProp.type)
		};
		blocks.push(block);
		$state.blocks = blocks;
	}

	export let databases: any;
	export let pages: any;
	console.log(pages)
	$state.user_id = $page.params.id;
	$state.database_id = databases[0].id;
	$state.preview_as_id = pages[0].id;
	$state.page_properties = pages[0].properties;
</script>
	<div class="db_options--container">
		<h3>Database</h3>
		<DbOptions {databases} {pages}/>
	</div>
	<div>
		<h3 class="blocks-heading">Blocks</h3>
		<div class="blocks-scroll-container">
			<div >
			{#each $state.blocks as block, i}
				<BlockEditor {block} index={i} />
			{/each}
			</div>
		</div>
	</div>
	<div class="add_block_button--container">
		<button on:click={addBlock}>Add a Block</button>
	</div>

<style>
	.blocks-heading {
		margin-bottom: var(--size-4);
		padding-left: var(--size-2);
	}
	.add_block_button--container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.db_options--container {
		padding: var(--size-2) var(--size-2) 0 var(--size-2);
	}
</style>
