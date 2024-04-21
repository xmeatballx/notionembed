<script lang="ts">
	export let items: any;
	export let type: string;
</script>

{#if type == 'bullet'}
	<ul>
		{#each items as item}
			<li>{item.name}</li>
		{/each}
	</ul>
{:else}
	<ol>
		{#each items as item}
			<li>{item.name}</li>
		{/each}
	</ol>
{/if}
