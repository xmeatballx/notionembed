<script lang="ts">
	import * as api from '../_api';
	import { page } from '$app/stores';
	import { state, updateState } from '../../stores';
	import ExpandButton from '$lib/expand button/ExpandButton.svelte';
	import type { Block, StateValue } from '../../types';
	import { onMount } from 'svelte';
	import { getDefaultBlockType, getFirstProp } from '$lib/utils';
	import SelectMenu from '../selectMenu.svelte';
	export let databases: any;
	export let pages: any;
	export let embed: any | undefined = undefined;
	let pagesOpen = false;

	console.log('STATE: ', $state);

	async function resetDB(e: any) {
		const selectedOption = e.target.options[e.target.selectedIndex];
		pages = [];
		$state.database_name = selectedOption.getAttribute('data-name');
		$state.blocks = [];
		pages = await api.getPagesForDatabase($state.user_id, e.target.value);
		$state.preview_as_id = pages[0].id;
		$state.page_properties = pages[0].properties;
		console.log(pages);
		$state.page_ids = pages.map((page: any) => page.id);
		addBlock();
	}

	async function randomizePage() {
		if ($state.page_ids.length == 1) return;
		const randomIndex = Math.round(Math.random() * $state.page_ids.length);
		$state.preview_as_id = $state.page_ids[randomIndex];
		$state.page_properties = pages.find(
			(page: any) => page.id == $state.page_ids[randomIndex]
		)?.properties ?? $state.page_properties;
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
		if (!embed) {
			const newPageIdArray: string[] = [pages[0].id];
			$state.preview_as_id = pages[0].id;
			updateState('preview_as_id', pages[0].id);
			updateState('page_ids', pages.map((page: any) => page.id) as StateValue);
			$state.database_name = databases[0]?.title[0]?.text?.content;
			currentPageTitle = api.getTitle(pages[0].properties);
		} else {
			const blocks = embed.blocks.map((block: any) => {
				const { propertyType, previewElement, propertyId, order } = block;
				return {
					propertyType,
					previewElement,
					propertyId,
					order
				};
			});
			const defaultPage = pages.filter((page) => page.id == embed.pageIds[0])[0];
			const { properties } = defaultPage as any;
			const defaultDatabase = databases.filter((db: any) => db.id == embed.databaseId)[0];
			updateState('page_properties', properties as StateValue);
			updateState('database_id', defaultDatabase.id as StateValue);
			updateState('database_name', defaultDatabase.title[0].plain_text as StateValue);
			updateState('preview_as_id', embed.pageIds[0] as StateValue);
			updateState('blocks', blocks as StateValue);
			updateState('page_ids', embed?.pageIds as StateValue);
		}
	});

	$: if ($state.preview_as_id && pages) {
		// console.log('HERE');
		const currentPage = pages.filter((page: any) => page.id == $state.preview_as_id)[0];
		currentPageTitle = currentPage?.properties ? api.getTitle(currentPage.properties) : '';
	}
</script>

<div class="db_options--container">
	<div class="database_select--container">
		<label for="database">Pick a database</label>
		<SelectMenu bind:value={$state.database_id} onChange={resetDB} name="database" id="database">
			{#await databases}
				<!-- <option value="">loading</option> -->
			{:then res}
				{#each databases as database}
					<option value={database.id} data-name={database.title[0]?.text?.content}>
						{#if database.icon}
							{database.icon.emoji ?? ''} {database.title[0].text.content}
						{:else}
							{database.title[0]?.text?.content}
						{/if}
					</option>
				{/each}
			{/await}
		</SelectMenu>
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
				{#await pages then _pages}
					{#each _pages as item, i}
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
					{/each}
				{/await}
			{/if}
		</div>
	</div>
	<div class="current_page">
		<label for="">Current Page</label>
		<div class="current_page--title">{currentPageTitle}</div>
		<div class="page_controls">
			<button class="page_controls--next" on:click={() => goToLastPage()}>
				<img src="/icons/next.svg" alt="next" width="12px" />
			</button>
			<button class="page_controls--last" on:click={() => goToNextPage()}>
				<img src="/icons/next.svg" alt="next" width="12px" />
			</button>
			<button class="page_controls--random" on:click={randomizePage}>
				<img src="/icons/random.svg" alt="next" width="24px" />
			</button>
		</div>
	</div>
</div>

<style>
	.db_options--container {
		display: grid;
		gap: var(--size-4);
		margin-bottom: 8px;
	}

	/* .preview_as {
		display: flex;
		flex-direction: column;
		gap: 1em;
	} */
	.page_select--container {
		/*	display: none;*/
	}

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

	.page_controls {
		display: flex;
		gap: var(--size-3);
		margin-bottom: 1em;
	}

	.page_controls--next,
	.page_controls--last,
	.page_controls--random {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border: 0;
		box-shadow: none;
		padding: 0;
	}

	.page_controls button img {
		filter: invert(0.8);
	}

	.page_controls--next .next {
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;

		border-top: 8px solid var(--text-2);
		rotate: 0.25turn;
	}
	.page_controls--next img {
		rotate: -0.5turn;
	}
	.page_controls--random {
		font-size: var(--font-size-0);
	}

	.current_page {
		display: flex;
		flex-direction: column;
	}

	.current_page--title {
		font-size: var(--font-size-4);
		font-weight: 500;
		margin-bottom: 0.5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 25vw;
	}
	.page_controls button img {
		filter: invert(0.3);
	}

	@media (prefers-color-scheme: dark) {
		.page_controls button img {
			filter: invert(0.8);
		}
	}

	@media (max-width: 820px) {
		.current_page--title {
			min-width: 100%;
		}
	}
</style>
