import { Action } from '@ngrx/store';

export const ADD_SONG = 'ADD_SONG';

export function songsReducer(state = [], action) {
	switch (action.type) {
		case ADD_SONG:
			return [...state, ...action.payload];
		default:
			return state;
	}
}