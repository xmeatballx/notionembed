<script lang="ts">
	import { state } from '../../stores'
	export let onDelete: () => void;
</script>
<p class="warning">
💀 Are you sure you want to delete this embed? 💀
</p>
<div class="buttons">
	<button on:click={() => $state.deleteWarningOpen = false}>No</button>
	<button on:click={() => onDelete()}>Yes</button>
</div>

<style>
	.buttons {
		display: flex;
		gap: var(--size-1);
		justify-content: center;
		margin: var(--size-4) auto var(--size-2) auto;
	}
</style>
