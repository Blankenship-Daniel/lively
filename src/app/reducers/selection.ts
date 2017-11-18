import { Action } from '@ngrx/store';

export const SELECT_SONG = 'SELECT_SONG';
export const CLEAR_SELECTIONS = 'CLEAR_SELECTIONS';

export function selectionReducer(state = [], action) {
	switch (action.type) {
		case SELECT_SONG:
			if (state.some(song => song.id === action.payload.id)) {
				return state.filter(song => song.id !== action.payload.id);
			}

			return [...state, ...action.payload];
		case CLEAR_SELECTIONS:
			return [];
		default:
			return state;
	}
}