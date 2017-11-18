import { Action } from '@ngrx/store';

export const ADD_SONGS = 'ADD_SONGS';
export const LOAD_SONGS = 'LOAD_SONGS';

export function songsReducer(state = [], action) {
	switch (action.type) {
		case ADD_SONGS:
			return [...state, ...action.payload];
		case LOAD_SONGS:
		default:
			return state;
	}
}