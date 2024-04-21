<div class="fullscreen">
	<div class="modal">
		<slot />
	</div>
</div>

<style>
	.fullscreen {
		width: 100vw;
		height: 100vh;
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		z-index: 1;
	}

	.modal {
		background-color: var(--surface-1);
		outline: 2px var(--text-1) solid;
		border-radius: 1ch;
		padding: 1em;
	}
</style>
