import { Action } from '@ngrx/store';

export const ADD_PLAYLIST = 'ADD_PLAYLIST';

export function playlistsReducer(state = {}, action) {
	switch (action.type) {
		case ADD_PLAYLIST:
			const uuid = action.payload.uuid;
			const title = action.payload.title;

			return Object.assign({}, state, {
				[uuid]: {
					title: title,
					tracks: []
				}
			});
		default:
			return state;
	}
}