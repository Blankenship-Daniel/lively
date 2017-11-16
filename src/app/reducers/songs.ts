import { Action } from '@ngrx/store';

export const ADD_SONGS = 'ADD_SONGS';

export function songsReducer(state = [], action) {
	switch (action.type) {
		case ADD_SONGS:
			return [...state, ...action.payload];
		default:
			return state;
	}
}