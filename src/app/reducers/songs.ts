import { Action } from '@ngrx/store';

export const ADD_SONGS = 'ADD_SONGS';
export const LOAD_SONGS = 'LOAD_SONGS';
export const DELETE_SONG = 'DELETE_SONG';

export function songsReducer(state = [], action) {
	switch (action.type) {
		case ADD_SONGS:
			return [...state, ...action.payload];
		case LOAD_SONGS:
			return action.payload;
		default:
			return state;
	}
}