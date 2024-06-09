<script lang="ts">
	export let summary: string;
</script>

<details class="details_list">
	<summary class="details_list">{summary}</summary>
	<slot />
</details>

<style>
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
</style>
