<script lang="ts">
	import { DateTime } from 'luxon';
	export let element: string;	
	export let date: string;
</script>
{#if element == 'short'}
	<p>
		Last edited {DateTime.fromISO(date).toLocaleString(DateTime.DATE_SHORT)}
	</p>
{:else if element == 'medium'}
	<p>
		Last edited {DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_SHORT)}
	</p>
{:else}
	<p>
		Last edited {DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_FULL)}
	</p>
{/if}
