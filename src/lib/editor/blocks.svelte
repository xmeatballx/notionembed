<script lang="ts">
	import { state } from '../../stores';
	import type { Block } from 'src/types';
	import { getDefaultBlockType } from '$lib/utils';

	export let block: Block;
	export let index: number;
	let propertyType = block.propertyType;
	const properties: any = Object.entries($state.page_properties);

	function propertyHandler(e: any) {
		const data = e.target.value.split("|||");
		const id = data[0];
		const type = data[1];
		// console.log(data)
		if (e.target.value != 'cover' && e.target.value != 'icon') {
			$state.blocks[index].propertyId = encodeURIComponent(
				id
				);
				$state.blocks[index].propertyType = type;
			} else {
			$state.blocks[index].propertyType = e.target.value;
			$state.blocks[index].propertyId = '';
		}
		$state.blocks[index].previewElement = getDefaultBlockType(type ?? e.target.value);
		propertyType = type ?? e.target.value;
	}
</script>

{#key properties}
<div class="block">
	<div class="field">
		<label for="property" class="label">Property</label>
		<select class="select" id="property" on:change={propertyHandler}>
			{#each properties as [name, value]}
				<option value={(value.id != "title" ? value.id : "title-"+value.title[0]?.text?.content)+"|||"+value.type}>{name ?? 'Untitled'}</option>
			{/each}
			<option value="cover">Cover</option>
			<option value="icon">Icon</option>
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
			{:else if propertyType == 'cover' || propertyType == 'icon'}
				<option value="img">Image</option>
			{/if}
		</select>
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

	.block:first-of-type {
		border-top: 1px solid var(--surface-3);
		border-bottom: 1px solid var(--surface-3);
	}

	.block:not(:first-of-type) {
		border-bottom: 1px solid var(--surface-3);
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
