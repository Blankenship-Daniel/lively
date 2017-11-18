import { Action } from '@ngrx/store';

export const LOAD_PLAYLIST = 'LOAD_PLAYLIST';

export function playlistReducer(state = {}, action) {
	switch (action.type) {
		case LOAD_PLAYLIST:
			return action.payload;
		default:
			return state;
	}
}