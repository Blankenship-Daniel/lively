import { Action } from '@ngrx/store';

export const LOAD_ACTIVE_SONGS = 'LOAD_ACTIVE_SONGS';

export function activeReducer(state = [], action) {
	switch (action.type) {
		case LOAD_ACTIVE_SONGS:
			return action.payload;
		default:
			return state;
	}
}