<script lang="ts">
	import PlusIcon from './PlusIcon.svelte';
	export let clicked: any;
	export let small = false;

	export let open = true;

	function handleClick() {
		open = !open;
		clicked();
	}
</script>

<button
	class={'plus--button ' + (open ? 'open' : '') + (small ? ' small' : '')}
	on:click={handleClick}
>
	<PlusIcon {small} />
</button>

<style>
	.plus--button {
		width: 2em;
		height: 2em;
		background-color: var(--surface-1);
		/*border: 1px solid var(--surface-3);*/
		border: none;
		box-shadow: var(--shadow-2), 0 1px var(--surface-2),
			0 0 0 var(--_highlight-size) var(--_highlight);
	}

	.plus--button.small {
		width: 1em;
		height: 1em;
		padding: 0.5em 1em;
		background-color: transparent;
		border: none;
		box-shadow: none;
	}
</style>
