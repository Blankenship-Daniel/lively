import { Action } from '@ngrx/store';

export const LOAD_PLAYABLE_SONGS = 'LOAD_PLAYABLE_SONGS';

export function playableReducer(state = [], action) {
	switch (action.type) {
		case LOAD_PLAYABLE_SONGS:
			return action.payload;
		default:
			return state;
	}
}