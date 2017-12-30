import { Action } from '@ngrx/store';

export const LOAD_PLAYABLE_SONGS = 'LOAD_PLAYABLE_SONGS';
export const ADD_PLAYABLE_SONG = 'ADD_PLAYABLE_SONG';

export function playableReducer(state = [], action) {
	switch (action.type) {
		case LOAD_PLAYABLE_SONGS:
			return action.payload;
		case ADD_PLAYABLE_SONG:
			return [...state, action.payload];
		default:
			return state;
	}
}