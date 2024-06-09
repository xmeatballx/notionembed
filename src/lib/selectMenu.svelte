<script lang="ts">
	export let name: string;
	export let value: string;
	export let id: string;
	export let onChange: (e: any) => any = () => {}; 
</script>
<select class="select" {name} {id} bind:value={value} on:change={onChange}>
	<slot/>
</select>

<style>
	.select {
		width: 100%;
		background-color: var(--surface-1);
		border: 1px solid var(--surface-3);
		padding: var(--size-3);
		font-weight: bold;
		border-radius: var(--size-2);
	}

</style>
