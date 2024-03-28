<script lang="ts">
	import * as api from '../_api';
	import { page } from '$app/stores';
	import { state, updateState } from '../../stores';
	import ExpandButton from '$lib/expand button/ExpandButton.svelte';
	import type { Block, StateValue } from 'src/types';
	import { onMount } from 'svelte';
	import { getDefaultBlockType, getFirstProp } from '$lib/utils';
	export let databases: any;
	export let pages: any;
	let pagesOpen = false;

	async function resetDB(e: any) {
		const selectedOption = e.target.options[e.target.selectedIndex];
		pages = [];
		$state.database_name = selectedOption.getAttribute('data-name');
		$state.blocks = [];
		pages = await api.getPagesForDatabase($state.user_id, e.target.value);
		$state.preview_as_id = pages[0].id;
		$state.page_properties = pages[0].properties;
		console.log(pages);
		$state.page_ids = [pages[0].id];
		addBlock();
	}

	async function randomizePage() {
		const randomIndex = Math.round(Math.random() * $state.page_ids.length);
		$state.preview_as_id = $state.page_ids[randomIndex];
		$state.page_properties = pages.filter(
			(page: any) => page.id == $state.page_ids[randomIndex]
		)[0].properties;
	}
	let currentPageTitle: string = 'No pages selected';

	function selectAllPages(e: any): any {
		if (e.target.checked) {
			const allPageIds = pages.map((page: any) => page.id);
			updateState('page_ids', allPageIds);
		} else {
			updateState('page_ids', [] as StateValue);
		}
	}

	function goToNextPage(): any {
		const index = $state.page_ids.indexOf($state.preview_as_id);
		if (index < $state.page_ids.length) {
			updateState('preview_as_id', $state.page_ids[index + 1] as StateValue);
		} else {
			updateState('preview_as_id', $state.page_ids[0] as StateValue);
		}
	}

	function goToLastPage(): any {
		const index = $state.page_ids.indexOf($state.preview_as_id);
		if (index > 0) {
			updateState('preview_as_id', $state.page_ids[index - 1] as StateValue);
		} else {
			updateState('preview_as_id', $state.page_ids[$state.page_ids.length - 1] as StateValue);
		}
	}

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

	onMount(() => {
		const newPageIdArray: string[] = [pages[0].id];
		$state.preview_as_id = pages[0].id;
		updateState('preview_as_id', pages[0].id);
		updateState('page_ids', newPageIdArray as StateValue);
		$state.database_name = databases[0]?.title[0]?.text?.content;
		currentPageTitle = api.getTitle(pages[0].properties);
	});

	$: if ($state.preview_as_id) {
		// console.log('HERE');
		const currentPage = pages.filter((page: any) => page.id == $state.preview_as_id)[0];
		currentPageTitle = currentPage?.properties ? api.getTitle(currentPage.properties) : '';
	}
</script>

<div>
	<div class="database_select--container">
		<label for="database">Pick a database</label>
		<select bind:value={$state.database_id} class="select" on:change={resetDB} name="database">
			{#await databases}
				<!-- <option value="">loading</option> -->
			{:then res}
				{#each databases as database, i}
					<option value={database.id} data-name={database.title[0]?.text?.content}>
						{#if database.icon}
							{database.icon.emoji ?? ''} {database.title[0].text.content}
						{:else}
							{database.title[0]?.text?.content}
						{/if}
					</option>
				{/each}
			{/await}
		</select>
	</div>
	<div class="current_page">
		<label for="">Current Page</label>
		<div class="current_page--title">{currentPageTitle}</div>
		<div class="page_controls">
			<button class="page_controls--next" on:click={() => goToLastPage()}>
				<div class="next" /></button
			>
			<button class="page_controls--last" on:click={() => goToNextPage()}>
				<div class="last" /></button
			>
			<button class="page_controls--random" on:click={randomizePage}>Random</button>
		</div>
	</div>
	<div class="page_select--container">
		<div class="page_select--label">
			<label for="page">Pages To Include</label>
			<ExpandButton clicked={() => (pagesOpen = !pagesOpen)} small={true} open={pagesOpen} />
		</div>
		<div class="preview_as">
			{#if pagesOpen}
				<div class="page_check--container">
					<input type="checkbox" on:change={selectAllPages} />
					<label class="page_check--label">Select All</label>
				</div>
				<!-- <select bind:value={$state.preview_as_id} class="select" name="page"> -->
				{#await pages then pages}
					{#each pages as item, i}
						<div class="page_check--container">
							<input
								type="checkbox"
								name="page"
								bind:group={$state.page_ids}
								id={item.id}
								value={item.id}
							/>
							<label class="page_check--label" for={item.id}>{api.getTitle(item.properties)}</label>
						</div>
						<!-- {#if i == 0}
							<option value={item.id}>{api.getTitle(item.properties)}</option>
						{:else}
							<option value={item.id}>{api.getTitle(item.properties)}</option>
						{/if} -->
					{/each}
				{/await}
				<!-- <p>Selected values: {$state.page_ids.join(', ')}</p> -->
			{/if}
			<!-- </select> -->
			<!-- <button type="button" on:click={randomizePage}>Randomize</button> -->
		</div>
	</div>
</div>

<style>
	.select {
		width: 100%;
	}
	/* .preview_as {
		display: flex;
		flex-direction: column;
		gap: 1em;
	} */
	.page_select--label {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.page_check--container {
		display: flex;
		align-items: center;
		gap: var(--size-2);
		margin: 0;
	}
	.page_check--label {
		white-space: nowrap;
		text-overflow: ellipsis;
		font-weight: 400;
	}
	label {
		font-weight: 700;
	}

	.database_select--container,
	.page_select--container {
		display: grid;
		gap: 8px;
		margin-bottom: 8px;
	}

	.page_controls {
		display: flex;
		gap: var(--size-1);
		margin-bottom: 1em;
	}

	.page_controls--next .next {
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;

		border-top: 8px solid var(--text-2);
		rotate: 0.25turn;
	}
	.page_controls--last .last {
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;

		border-top: 8px solid var(--text-2);
		rotate: -0.25turn;
	}
	.page_controls--random {
		font-size: var(--font-size-0);
	}

	.current_page--title {
		font-size: var(--font-size-4);
		font-weight: 500;
		margin-bottom: 0.5rem;
	}
</style>
