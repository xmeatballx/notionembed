<script lang="ts">
	import type { Block } from 'src/types';
	import { state } from '../../stores';
	import BlockEditor from './blocks.svelte';
	import { getDefaultBlockType, getFirstProp } from '$lib/utils';
	import DbOptions from './dbOptions.svelte';
	import { page } from '$app/stores';
	import * as api from '../../lib/_api';
	import ExpandButton from '$lib/expand button/ExpandButton.svelte';
	import { onMount } from 'svelte';

	function addBlock() {
		let blocks = $state.blocks as Array<Block>;
		console.log($state.page_properties);
		const currentProp = $state.page_properties.Name ?? getFirstProp($state.page_properties);
		let block: Block = {
			propertyId: `title-${$state.page_properties.Name?.title[0].text.content}`,
			propertyType: currentProp.type,
			previewElement: getDefaultBlockType(currentProp.type),
			order: blocks.length
		};
		blocks.push(block);
		$state.blocks = blocks;
	}

	export let databases: any;
	export let pages: any;
	// console.log(pages)
	$state.user_id = $page.params.id;
	$state.database_id = databases[0].id;
	$state.preview_as_id = pages[0].id;
	$state.page_properties = pages[0].properties;
	let dbOpen = true;
	let blocksOpen = true;
	console.log('PAGES 0: ', pages[0].properties);
	addBlock();
</script>

<div class="container">
	<div class="section--label">
		<h3>Database</h3>
		<ExpandButton clicked={() => (dbOpen = !dbOpen)} />
	</div>
	{#if dbOpen}
		<DbOptions {databases} {pages} />
	{/if}
</div>
<hr />
<div class="container">
	<div class="section--label">
		<h3 class="blocks-heading">Blocks</h3>
		<ExpandButton clicked={() => (blocksOpen = !blocksOpen)} />
	</div>
	{#if blocksOpen}
		<div class="blocks-scroll-container">
			<div>
				{#each $state.blocks as block, i}
					<BlockEditor {block} index={i} />
				{/each}
			</div>
		</div>
	{/if}
</div>
{#if blocksOpen}
	<div class="add_block_button--container">
		<button on:click={addBlock}>Add a Block</button>
	</div>
{/if}

<style>
	.blocks-heading {
		/* margin-bottom: var(--size-4); */
		/* padding-left: var(--size-2); */
	}
	.add_block_button--container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.container {
		padding: var(--size-2);
	}
	.section--label {
		display: flex;
		justify-content: space-between;
	}

	.plus {
		width: 1em;
		height: 2px;
		background-color: var(--text-2);
		position: absolute;
		border-radius: 10px;
	}

	.plus--button {
		width: 2em;
		height: 2em;
	}

	.plus .plus--h {
	}

	.plus.plus--v {
		transition: opacity 0.25s;
		rotate: 90deg;
		opacity: 1;
	}

	.plus.plus--v {
		rotate: 90deg;
	}

	.plus--button.open .plus.plus--v {
		opacity: 0;
	}
	hr {
		margin: 0;
	}
</style>
