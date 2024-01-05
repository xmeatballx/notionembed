<script lang="ts">
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
	<div class={'plus plus--h ' + (small && ' small')} />
	<div class={'plus plus--v ' + (small && ' small')} />
</button>

<style>
	.plus {
		width: 1em;
		height: 2px;
		background-color: var(--text-2);
		position: absolute;
		border-radius: 10px;
	}

	.plus.small {
		width: 1em;
		height: 2px;
	}

	.plus--button {
		width: 2em;
		height: 2em;
	}

	.plus--button.small {
		width: 1em;
		height: 1em;
		padding: 0.5em 1em;
		background-color: transparent;
		border: none;
		box-shadow: none;
	}

	.plus .plus--h {
	}

	.plus.plus--v {
		transition: opacity 0.25s;
		rotate: 90deg;
		opacity: 1;
	}

	.plus.plus--v {
		rotate: 90deg;
	}

	.plus--button.open .plus.plus--v {
		opacity: 0;
	}
</style>
