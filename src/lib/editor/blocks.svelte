<script lang="ts">
	import { state } from '../../stores';
	import type { Block } from 'src/types';
	import { getDefaultBlockType } from '$lib/utils';

	export let block: Block;
	export let index: number;
	let propertyType = block.propertyType;
	let propertyId = block.propertyId;
	const properties: any = Object.entries($state.page_properties);

	function propertyHandler(e: any) {
		const selectedOption = e.target.options[e.target.selectedIndex];
		const type = selectedOption.getAttribute('data-type');
		const id = e.target.value;
		console.log('property: ', $state.blocks[index]);
		if (type == 'cover') {
			$state.blocks[index].propertyId = 'cover';
			$state.blocks[index].propertyType = type;
		} else if (type == 'icon') {
			$state.blocks[index].propertyId = 'icon';
			$state.blocks[index].propertyType = type;
		} else {
			$state.blocks[index].propertyId = encodeURIComponent(id);
			$state.blocks[index].propertyType = type;
		}
		$state.blocks[index].previewElement = getDefaultBlockType(type);
		propertyType = type;
	}

	function moveBlock(element: Block, direction: string) {
		const array = $state.blocks;
		// Remove the element from the current position
		array.splice(index, 1);

		// Insert the element in the new position
		if (direction === 'forward' && index < array.length) {
			array.splice(index + 1, 0, element);
		} else if (direction === 'backward' && index > 0) {
			array.splice(index - 1, 0, element);
		} else {
			// If moving forward from the last position or moving backward from the first position
			// just insert the element back to its original position
			array.splice(index, 0, element);
		}
		array.map((block, i) => {
			return { ...block, order: i };
		});
		$state.blocks = array;
	}

	function removeBlock(block: Block) {
		const blocks = $state.blocks;
		blocks.splice(index, 1);
		blocks.map((block, i) => {
			return { ...block, order: i };
		});
		$state.blocks = blocks;
	}
</script>

{#key properties}
	<div class="block">
		<div class="field">
			<label for="property" class="label">Property</label>
			<select class="select" id="property" on:change={propertyHandler} bind:value={propertyId}>
				{#each properties as [name, value]}
					<option
						value={value.id != 'title' ? value.id : 'title-' + value.title[0]?.text?.content}
						data-type={value.type}
						>{name ?? 'Untitled'}
					</option>
				{/each}
				<option value="cover" data-type="cover">Cover</option>
				<option value="icon" data-type="icon">Icon</option>
			</select>
		</div>
		<div class="field">
			<label class="label" for="element">As</label>
			<select
				class="select"
				name="text"
				id="element"
				bind:value={$state.blocks[index].previewElement}
			>
				{#if propertyType == 'rich_text' || propertyType == 'title' || propertyType == 'select'}
					<option value="h1" selected>Heading 1</option>
					<option value="h2">Heading 2</option>
					<option value="h3">Heading 3</option>
					<option value="p">Text</option>
					<option value="blockquote">Blockquote</option>
				{:else if propertyType == 'multi_select'}
					<option value="ul">Bulleted List</option>
					<option value="ol">Numbered List</option>
				{:else if propertyType == 'url'}
					<option value="a">Link</option>
					<option value="object">Embed</option>
				{:else if propertyType == 'relation'}
					<option value="a">Link</option>
				{:else if propertyType == 'cover' || propertyType == 'icon'}
					<option value="img">Image</option>
				{/if}
			</select>
		</div>
		<div class="controls">
			{#if index == 0}
				<button class="controls" disabled><div class="controls--up" /></button>
			{:else}
				<button class="controls" on:click={() => moveBlock($state.blocks[index], 'backward')}
					><div class="controls--up" /></button
				>
			{/if}
			{#if index == $state.blocks.length - 1}
				<button class="controls" disabled><div class="controls--down" /></button>
			{:else}
				<button class="controls" on:click={() => moveBlock($state.blocks[index], 'forward')}
					><div class="controls--down" /></button
				>
			{/if}

			<button class="controls" on:click={() => removeBlock($state.blocks[index])}>
				<div class="x x1" />
				<div class="x x2" />
			</button>
		</div>
	</div>
{/key}

<style>
	.select {
		width: 100%;
	}

	.block {
		padding: 0.5em;
		display: flex;
		flex-direction: column;
		/* gap: 0.25em; */
	}

	.controls {
		width: 100%;
		display: flex;
		gap: 1px;
		/* overflow: hidden; */
	}

	.controls button {
		width: 100%;
		border-radius: 0;
		padding: 6px;
	}

	.controls button:hover {
		z-index: 10;
	}

	.controls--up {
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;

		border-bottom: 8px solid var(--text-2);
	}
	.controls--down {
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;

		border-top: 8px solid var(--text-2);
	}

	.controls button:first-child {
		border-bottom-left-radius: var(--size-1);
		border-top-left-radius: var(--size-1);
	}

	.controls button:last-child {
		border-bottom-right-radius: var(--size-1);
		border-top-right-radius: var(--size-1);
	}

	.x {
		width: 16px;
		height: 2px;
		background-color: var(--text-2);
		position: absolute;
	}

	.x.x1 {
		rotate: 45deg;
	}

	.x.x2 {
		rotate: -45deg;
	}

	.block:first-of-type {
		/* border-top: 1px solid var(--surface-3); */
		/* border-bottom: 1px solid var(--surface-3); */
	}

	.block:not(:first-of-type) {
		/* border-bottom: 1px solid var(--surface-3); */
	}

	.label {
		font-size: var(--font-size-0);
		font-weight: 700;
		/* margin-bottom: 1rem; */
	}

	.field {
		display: grid;
		/* gap: 8px; */
		margin-bottom: 8px;
		width: 100%;
	}
</style>
