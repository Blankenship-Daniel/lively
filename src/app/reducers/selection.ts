import { Action } from '@ngrx/store';

export const SELECT_SONG = 'SELECT_SONG';

export function selectionReducer(state = [], action) {
	switch (action.type) {
		case SELECT_SONG:
			if (state.some(song => song.id === action.payload.id)) {
				return state.filter(song => song.id !== action.payload.id);
			}

			return [...state, ...action.payload];
		default:
			return state;
	}
}