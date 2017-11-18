import { Action } from '@ngrx/store';

export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const ADD_SONGS_TO_PLAYLIST = 'ADD_SONGS_TO_PLAYLIST';

export function playlistsReducer(state = {}, action) {
	switch (action.type) {
		case ADD_PLAYLIST:
			const uuid = action.payload.uuid;
			const title = action.payload.title;

			return Object.assign({}, state, {
				[uuid]: {
					title: title,
					songs: []
				}
			});
		case ADD_SONGS_TO_PLAYLIST:
			const id = action.payload.id;
			const songs = action.payload.songs;
			state[id].songs = [...state[id].songs, ...songs];
			return state;
		default:
			return state;
	}
}