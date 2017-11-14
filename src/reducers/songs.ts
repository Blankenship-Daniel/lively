import { Action } from '@ngrx/store';

export const ADD = 'ADD';

export function songsReducer(state = [], action) {
	switch (action.type) {
		case ADD:
			return [...state, ...action.payload];
		default:
			return state;
	}
}