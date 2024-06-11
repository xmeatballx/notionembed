import { derived, get, writable, type Writable } from 'svelte/store';
import type { Block, State, StateValue } from './types';

const defaultState: State = {
	user_id: 'not set',
	database_id: 'not set',
	database_name: 'not set',
	page_ids: [],
	preview_as_id: 'not set',
	page_properties: [],
	blocks: [] as Block[],
	deleteWarningOpen: false,
	filters: []
};

const state: Writable<State> = writable(defaultState);
const blocks = derived(state, ($state: State) => $state.blocks);
const dbOptions = derived(state, ($state: State) => {
	return {
		database_id: $state.database_id,
		preview_as_id: $state.preview_as_id
	}
});

function updateState(key: keyof State, value: StateValue) {
	const temp: State = get(state);
	for (const item in temp) {
		if (key == item) {
			temp[key] = value;
		}
	}
	state.set(temp);
}

export { state, blocks, dbOptions, updateState };
