<script lang="ts">
	import * as api from '../../_api';

	export let url: any;
</script>
{#await api.getEmbed(url)}
	<p>loading</p>
{:then embed}
	<!-- <p>{embed}</p> -->
{/await}
<iframe title="embed" src={url}>
	<a href={url}>Visit Site</a>
</iframe>
