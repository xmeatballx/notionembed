import { get, writable, type Writable } from 'svelte/store';
import type { Block, State, StateValue } from './types';

const defaultState: State = {
	user_id: 'not set',
	database_id: 'not set',
	database_name: 'not set',
	page_ids: [],
	preview_as_id: 'not set',
	page_properties: [],
	blocks: [] as Block[]
};

const state: Writable<State> = writable(defaultState);

function updateState(key: keyof State, value: StateValue) {
	const temp: State = get(state);
	for (const item in temp) {
		if (key == item) {
			temp[key] = value;
		}
	}
	state.set(temp);
}

export { state, updateState };
