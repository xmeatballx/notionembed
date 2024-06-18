<script lang="ts">
	import { state } from '_src/stores';
	import DeleteEmbedWarning from '$lib/embed/deleteEmbedWarning.svelte';
	import Modal from '$lib/modal.svelte';

	export let data;
	let user: any = data.user;
	let embeds: any[] = data.embeds;
	let selectedEmbedId: string | undefined;

	function confirmDelete(id: string) {
		$state.deleteWarningOpen = true;
		selectedEmbedId = id;
	}

	async function deleteEmbed() {
		if (selectedEmbedId) {
			const response = await fetch(`/embed/${selectedEmbedId}/delete?user_id=${user.id}`);
			const result = await response.json();
			embeds = result.embeds;
			$state.deleteWarningOpen = false;
		}
	}

	function goToEditPage(id: string): void {
		window.location.replace(`/user/${user.id}/edit/${id}`);
	}

	function logout() {
		window.localStorage.removeItem('user');
		window.location.replace(`/login`);
	}

	async function copyLinkToEmbed(id: string) {
		try {
			navigator.clipboard.writeText('https://notionembed.eerik.dev/embed/' + id);
			alert("Link Copied");
		} catch (error) {
			console.log(error);
		}
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
						<button type="button" on:click={() => copyLinkToEmbed(embed.id)}>
							<img src="/icons/link.png" alt="copy link" />
						</button>
						<button type="button" on:click={() => goToEditPage(embed.id)}>
							<img src="/icons/edit.png" alt="edit" />
						</button>
						<button type="button" on:click={() => confirmDelete(embed.id)}>
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
<section class="logout">
	<button class="" on:click={logout}>Log Out</button>
</section>
{#if $state.deleteWarningOpen}
	<Modal>
		<DeleteEmbedWarning onDelete={() => deleteEmbed()} />
	</Modal>
{/if}

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
	@media (max-width: 820px) {
		.embeds {
			justify-content: flex-start;
			padding: var(--size-4);
			width: 100%;
			height: auto;
			margin-bottom: var(--size-2);
		}
		.embeds .controls {
			gap: var(--size-2);
		}
		.logout {
			display: flex;
			justify-content: center;
		}
	}
</style>
