<script lang="ts">
	import * as api from '../_api';
	import { page } from '$app/stores';
	import { state } from '../../stores';
	export let databases: any;
	export let pages: any;

	async function resetDB(e: any) {
		pages = await api.getDatabase($page.params.id, e.target.value);
		$state.page_properties = pages[0].properties;
		$state.blocks = [];
	}
</script>

<div>
	<p>Pick a database</p>
	<select bind:value={$state.database_id} class="select" on:change={resetDB}>
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
<div>
	<p>Preview As</p>
	<select bind:value={$state.preview_as_id} class="select">
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
</div>

<style>
</style>
