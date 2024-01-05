<script lang="ts">
	import type { Embed } from '@prisma/client';

	export let user;
	export let embeds: Embed[];

	async function deleteEmbed(id: string) {
		await fetch(`/embed/${id}`, { method: 'DELETE' });
		const embedIds = embeds.map((embed) => embed.id);
		const indexToRemove = embedIds.indexOf(id);
		const embedsCopy = [...embeds];
		embedsCopy.splice(indexToRemove, 1);
		embeds = embedsCopy;
	}
</script>

<section class="embeds">
	<h2>My Embeds</h2>
	<ul>
		{#if embeds.length}
			{#each embeds as embed}
				<li class="embed">
					<span>{embed.name}</span>
					<div class="controls">
						<button type="button">
							<img src="/icons/link.png" alt="copy link" />
						</button>
						<button type="button">
							<img src="/icons/edit.png" alt="edit" />
						</button>
						<button type="button" on:click={() => deleteEmbed(embed.id)}>
							<img src="/icons/trash.png" alt="delete" />
						</button>
					</div>
				</li>
			{/each}
		{:else}
			<p>No Embeds yet...</p>
		{/if}
	</ul>
</section>

<style>
	.embeds {
		width: var(--size-md);
		height: calc(100vh - 66px);
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.embed {
		display: flex;
		justify-content: space-between;
		max-inline-size: none;
		padding: var(--size-2) var(--size-1);
	}

	.embed:hover {
		background-color: var(--surface-3);
	}

	.embed .controls {
		display: flex;
		gap: var(--size-6);
	}

	.embed button {
		padding: 0;
		border: none;
		background-color: transparent;
		box-shadow: none;
	}

	.embed img {
		width: var(--size-5);
		height: var(--size-5);
		filter: invert();
	}
	ul {
		list-style: none;
		padding: 0;
	}
</style>
