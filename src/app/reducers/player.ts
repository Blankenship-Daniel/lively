import { Action } from '@ngrx/store';

export const PLAY_SONG = 'PLAY_SONG';

export function playerReducer(state = { song: {} }, action) {
	switch (action.type) {
		case PLAY_SONG:
			return action.payload;
		default:
			return state;
	}
}