<script lang="ts">
	import type { Block } from 'src/types';
	import { state } from '../../stores';

	import Preview from './preview.svelte';
	import BlockEditor from './blocks.svelte';

	import { getDefaultBlockType, getFirstProp } from '$lib/utils';

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
</script>

<button on:click={addBlock}>Add a Block</button>
{#each $state.blocks as block, i}
	<BlockEditor {block} index={i} />
{/each}

<style>
</style>
