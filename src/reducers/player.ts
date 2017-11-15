import { Action } from '@ngrx/store';

export const PREV_SONG = 'PREV_SONG';
export const PLAY_SONG = 'PLAY_SONG';
export const NEXT_SONG = 'NEXT_SONG';

export function playerReducer(state = '', action) {
	switch (action.type) {
		case PREV_SONG:
			return state;
		case PLAY_SONG:
			return state = action.payload;
		case NEXT_SONG:
			return state;
		default:
			return state;
	}
}