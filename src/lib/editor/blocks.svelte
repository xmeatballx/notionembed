<script lang="ts">
	import { state } from '../../stores';
	import type { Block } from 'src/types';
	import { getDefaultBlockType } from '$lib/utils';

	export let block: Block;
	export let index: number;
	let propertyType = block.propertyType;
	let propertyId = decodeURI(block.propertyId);
	const properties: any = Object.entries($state.page_properties);
	let open = false;

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
	<li>
		<details>
			<summary>{propertyType} - {$state.blocks[index].previewElement}</summary>
			<div class="block">
				<div class="field property">
					<label for="property" class="label">Property</label>
					<select class="select" id="property" on:change={propertyHandler} bind:value={propertyId}>
						{#each properties as [name, value]}
							{#if value.type != 'formula'}
								<option
									value={value.id != 'title' ? value.id : 'title-' + value.title[0]?.text?.content}
									data-type={value.type}
									>{name ?? 'Untitled'}
								</option>
							{/if}
						{/each}
						<option value="cover" data-type="cover">Cover</option>
						<option value="icon" data-type="icon">Icon</option>
					</select>
				</div>
				<div class="field element">
					<label class="label" for="element">As</label>
					<select
						class="select"
						name="text"
						id="element"
						bind:value={$state.blocks[index].previewElement}
					>
						{#if propertyType == 'multi_select'}
							<option value="ul">Bulleted List</option>
							<option value="ol">Numbered List</option>
						{:else if propertyType == 'url'}
							<option value="a">Link</option>
							<option value="object">Embed</option>
						{:else if propertyType == 'relation' || propertyType == 'email'}
							<option value="a">Link</option>
						{:else if propertyType == 'cover' || propertyType == 'icon'}
							<option value="img">Image</option>
						{:else if propertyType == 'status'}
							<option value="status">Badge</option>
						{:else if propertyType == 'date' || propertyType == 'created_time' || propertyType == 'last_edited_time'}
							<option value="short">Short</option>
							<option value="medium">Medium</option>
							<option value="long">Long</option>
						{:else if propertyType == 'checkbox'}
							<option value="checkbox">Checkbox</option>
							<option value="emoji">Emoji</option>
						{:else}
							<option value="h1" selected>Heading 1</option>
							<option value="h2">Heading 2</option>
							<option value="h3">Heading 3</option>
							<option value="p">Text</option>
							<option value="blockquote">Blockquote</option>
						{/if}
					</select>
				</div>
			</div>
			<button on:click={() => removeBlock(block)}><img src="/icons/trash.svg" width="16px"/></button>
		</details>
	</li>
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
	</div>
{/key}

<style>
	li {
		padding: 0;
	}

	summary {
		border-radius: 0;
		list-style: none;
		background-color: var(--surface-1-mid);
		padding: 10px;
	}

	summary:hover {
		background-color: var(--surface-1);
	}

	summary::-webkit-details-marker {
		display: none;
	}

	details {
		background-color: var(--surface-2-mid);
		border-radius: 0;
	}
	li:first-of-type details, li:first-of-type details summary {
		border-radius: var(--size-2) var(--size-2) 0 0;
	}

	li:last-of-type details, li:last-of-type details summary {
		border-radius: 0 0 var(--size-2) var(--size-2);
	}

	button {
		width: 100%;
		background-color: var(--surface-2-mid);
		border: 0;
	}
	
	button img {
		filter: invert(0.8);
	}

	.select {
		width: 100%;
		background-color: var(--surface-1);
		border: 1px solid var(--surface-3);
		padding: var(--size-3);
		font-weight: bold;
		border-radius: var(--size-2);
	}

	.block {
		display: grid;
		gap: var(--size-2);
		margin-bottom: var(--size-2);
		width: 100%;
		/* margin-top: var(--size-4);
		gap: 0.25em; */
	}

	.controls {
		display: none !important;
		grid-area: c;
		width: 100%;
		display: flex;
		gap: var(--size-1);
		/* overflow: hidden; */
	}

	.controls button {
		width: 100%;
		border-radius: 0;
		padding: 6px;
		background-color: var(--surface-1);
		border: none;
		box-shadow: var(--shadow-2), 0 1px var(--surface-2),
			0 0 0 var(--_highlight-size) var(--_highlight);
		border: 1px solid var(--surface-3);
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
		width: 100%;
	}
</style>
