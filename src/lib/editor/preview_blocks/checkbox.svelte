<script lang="ts">
	export let checked: boolean;
	export let element: string; 
</script>
{#if element=="checkbox"}
<input type="checkbox" checked={checked} disabled />
{:else if element=="emoji"}
	{#if checked}
		<p>✅</p>
	{:else}
		<p>❌</p>
	{/if}
{/if}
