import { Action } from '@ngrx/store';

export const LOAD_LIBRARY_VIEW = 'LOAD_LIBRARY_VIEW';
export const LOAD_PLAYLIST_VIEW = 'LOAD_PLAYLIST_VIEW';

export function viewsReducer(state = { active: LOAD_LIBRARY_VIEW }, action) {
	switch (action.type) {
		case LOAD_LIBRARY_VIEW:
		case LOAD_PLAYLIST_VIEW:
			return action.payload;
		default:
			return state;
	}
}