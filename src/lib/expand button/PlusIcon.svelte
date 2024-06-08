<script lang="ts">
	export let small = false;
</script>

<div>
	<div class={'plus plus--h ' + (small && ' small')} />
	<div class={'plus plus--v ' + (small && ' small')} />
</div>

<style>
	.plus {
		width: 1em;
		height: 2px;
		position: absolute;
		border-radius: 10px;
		background-color: var(--text-2);
	}

	.plus.small {
		width: 1em;
		height: 2px;
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
