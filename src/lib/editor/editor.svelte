<script lang="ts">
	import type { Block } from '../../types';
	import { state } from '../../stores';
	import BlockEditor from './blocks.svelte';
	import { getDefaultBlockType, getFirstProp } from '$lib/utils';
	import DbOptions from './dbOptions.svelte';
	import { page } from '$app/stores';
	import * as api from '../../lib/_api';
	import ExpandButton from '$lib/expand button/ExpandButton.svelte';
	import PlusIcon from '$lib/expand button/PlusIcon.svelte';
	import { onMount } from 'svelte';

	function addBlock() {
		let blocks = $state.blocks as Array<Block>;
		const currentProp = $state.page_properties.Name ?? getFirstProp($state.page_properties);
		console.log('PROP: ', $state.page_properties);
		if (currentProp) {
			let block: Block = {
				propertyId: `title-${$state.page_properties.Name?.title[0].text.content}`,
				propertyType: currentProp.type,
				previewElement: getDefaultBlockType(currentProp.type),
				order: blocks.length
			};
			blocks.push(block);
			$state.blocks = blocks;
		}
	}

	export let databases: any;
	export let pages: any;
	export let embed: any = undefined;
	export let userId: string;
	// console.log(pages)
	onMount(() => {
		console.log('STATE: ', $state);
		if ($state.database_id == 'not set') {
			$state.database_id = databases[0].id;
			$state.preview_as_id = pages[0].id;
			$state.page_properties = pages[0].properties;
			$state.blocks = [];
			$state.user_id = userId;
			addBlock();
		}
	});
	let dbOpen = true;
	let blocksOpen = true;


	function addFilter(): import("svelte/elements").MouseEventHandler<HTMLButtonElement> | null | undefined {
		throw new Error('Function not implemented.');
	}
</script>

<div class="container">
	<div class="section--label">
		<h3>Database</h3>
	</div>
	{#if dbOpen}
		<DbOptions {databases} {pages} {embed} />
	{/if}
</div>
<div class="container">
	<div class="section--label">
		<h3 class="blocks-heading">Filters</h3>
		<button on:click={addFilter}>
			<PlusIcon />
		</button>
	</div>
</div>
<div class="container">
	<div class="section--label">
		<h3 class="blocks-heading">Blocks</h3>
		<button on:click={addBlock}>
			<PlusIcon />
		</button>
	</div>
	<div class="blocks-scroll-container">
		<ul>
			{#each $state.blocks as block, i}
				<BlockEditor {block} index={i} />
			{/each}
		</ul>
	</div>
</div>

<style>
	ul {
		list-style: none;
		padding: 0;
	}

	.add_block_button--container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.add_block_button--container button {
		width: 100%;
		margin: 0 var(--size-4);
		background-color: var(--surface-1);
		border: 1px solid var(--surface-3);
	}
	.container {
		padding: var(--size-2) var(--size-2) 0 var(--size-2);
	}
	.section--label {
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--size-3);
	}

	.section--label button {
		width: 1.5em;
		height: 1.5em;
		background-color: transparent;
		border: 0;
		padding: 0;
		box-shadow: none;
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
