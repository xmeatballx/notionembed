<script lang="ts">
	import { onMount } from 'svelte';
	import { state } from '../../stores';
	import type { Filter } from '_src/types';
	import DropdownControls from './dropdownControls.svelte';
	import SelectMenu from '../selectMenu.svelte';
	import { debounce } from '../utils';

	export let databases: any;
	export let pages: any;
	export let filter: Filter;

	let database: any;
	let isTextField = true;
	let isArrayField = false;

	async function updatePageIds(e?: any) {
		console.log(filter);
		if (e) filter.value = e.target.value;
		isArrayField = ['multi_select', 'people', 'relation'].includes(database.properties[filter.key].type);
		isTextField = !isArrayField;
		if (isArrayField && ['equals', 'does_not_equal'].includes(filter.comparison))
			filter.comparison = 'does_not_contain';
		if (isTextField && ['contains', 'does_not_contain'].includes(filter.comparison))
			filter.comparison = 'does_not_equal';
		const resource = `/user/${$state.user_id}/database/${$state.database_id}/filter`;
		const data = {
			filters: $state.filters.map((filter) => {
			let propertyType = database.properties[filter.key].type;
				return { ...filter, accessor: propertyType };
			})
		};
		const response = await fetch(resource, { method: 'POST', body: JSON.stringify(data) });
		const result = await response.json();

		$state.page_ids = result.map((page: any) => page.id);

		if (!$state.page_ids.includes($state.preview_as_id)) {
			$state.preview_as_id = $state.page_ids[0];
		}
	}

	const debouncedUpdatePageIds = debounce(updatePageIds, 500);

	onMount(() => {
		database = databases.find((db: any) => db.id == $state.database_id);
		updatePageIds();
		filter.comparison = "does_not_equal";
		console.log('DATABASE: ', database);
		console.log('DATABASES: ', databases);
		console.log('DATABASE ID: ', $state.database_id);
	});

	console.log(isTextField, isArrayField);
</script>

<DropdownControls summary="{filter.key} {filter.comparison.replace(/_/g, " ")} {filter.value}">
	<label for="property">Property</label>
	<SelectMenu
		name="property"
		id="property"
		bind:value={filter.key}
		onChange={() => updatePageIds()}
	>
		{#each Object.keys($state.page_properties) as key}
			<option value={key}>{key}</option>
		{/each}
	</SelectMenu>
	<label for="comparison">Comparison</label>
	<SelectMenu
		name="comparison"
		id="comparison"
		bind:value={filter.comparison}
		onChange={() => updatePageIds()}
	>
		{#if isTextField}
			<option value="equals">Equals</option>
			<option value="does_not_equal">Doesn't equal</option>
		{:else if isArrayField}
			<option value="contains">Contains</option>
			<option value="does_not_contain">Doesn't contain</option>
		{/if}
	</SelectMenu>
	<fieldset>
		<label for="filter_value">Value</label>
		<input
			name="filter_value"
			id="filter_value"
			on:input={debouncedUpdatePageIds}
			class="filter_value_input"
		/>
	</fieldset>
</DropdownControls>

<style>
	fieldset {
		border: none;
		padding: 0;
	}
	input.filter_value_input {
		width: 100%;
		background-color: var(--surface-1);
		border-radius: var(--size-2);
		padding: var(--size-3);
		font-weight: bold;
		border: 1px solid var(--surface-3);
	}
</style>
