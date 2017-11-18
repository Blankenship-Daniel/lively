import { Action } from '@ngrx/store';

export const LOAD_PLAYLIST_DATA = 'LOAD_PLAYLIST_DATA';

export function playlistReducer(state = {}, action) {
	switch (action.type) {
		case LOAD_PLAYLIST_DATA:
			return action.payload;
		default:
			return state;
	}
}