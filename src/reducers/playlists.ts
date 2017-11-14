import { Action } from '@ngrx/store';

export const ADD = 'ADD';

export function playlistsReducer(state = {}, action) {
	switch (action.type) {
		case ADD:
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