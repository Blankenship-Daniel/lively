import { Action } from '@ngrx/store';

export const DELETE_SONG = 'DELETE_SONG';

export function deleteReducer(state = null, action) {
	switch (action.type) {
		case DELETE_SONG:
			return action.payload;
		default:
			return state;
	}
}