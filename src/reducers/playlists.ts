import { Action } from '@ngrx/store';

export const ADD = 'ADD';

export function playlistsReducer(state: Array<any> = [], action: any) {
	switch (action.type) {
		case ADD:
			return [...state, ...action.payload];
		default:
			return state;
	}
}