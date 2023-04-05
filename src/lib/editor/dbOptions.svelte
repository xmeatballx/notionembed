<script lang="ts">
	import * as api from '../_api';
	import { page } from '$app/stores';
	import { state } from '../../stores';
	export let databases: any;
	export let pages: any;

	async function resetDB(e: any) {
		pages = [];
		$state.page_properties;
		$state.blocks = [];
		pages = await api.getPagesForDatabase($state.user_id, $state.database_id);
		$state.preview_as_id = pages[0].id;
		$state.page_properties = pages[0].properties;
	}

	async function randomizePage(e: any) {
		const randomIndex = Math.round(Math.random()*pages.length);
		$state.preview_as_id = pages[randomIndex].id;
		$state.page_properties = pages[randomIndex].properties;
	}
</script>
<div>
	<div class="database_select--container">
		<label for="database">Pick a database</label>
		<select bind:value={$state.database_id} class="select" on:change={resetDB} name="database">
			{#await databases}
				<option value="">loading</option>
			{:then res}
				{#each databases as database, i}
					<option value={database.id}>
						{#if database.icon}
							{database.icon.emoji ?? ''} {database.title[0].text.content}
						{:else}
							{database.title[0].text.content}
						{/if}
					</option>
				{/each}
			{/await}
		</select>
	</div>
	<div class="page_select--container">
		<label for="page">Preview As</label>
		<div class="preview_as">
			<select bind:value={$state.preview_as_id} class="select" name="page">
				{#await pages then pages}
				{#each pages as item, i}
				{#if i == 0}
				<option value={item.id}>{api.getTitle(item.properties)}</option>
				{:else}
				<option value={item.id}>{api.getTitle(item.properties)}</option>
				{/if}
				{/each}
				{/await}
			</select>
			<button type="button" on:click={randomizePage}>Randomize</button>
		</div>
	</div>
</div>

<style>
	.select {
		width: 100%;
	}
	.preview_as {
		display: flex;
		gap: 1em;
	}
	label {
		font-weight: 700;
	}

	.database_select--container, .page_select--container {
		display: grid;
		gap: 8px;
		margin-bottom: 8px;
	}
</style>
