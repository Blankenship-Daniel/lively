import { Action } from '@ngrx/store';

export const LOAD_ACTIVE_SONGS = 'LOAD_ACTIVE_SONGS';

export function activeReducer(state = [], action) {
	switch (action.type) {
		case LOAD_ACTIVE_SONGS:
			console.log('activeReducer(', action.payload, ')');
			return action.payload;
		default:
			return state;
	}
}