import { Action } from '@ngrx/store';

export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const ADD_SONGS_TO_PLAYLIST = 'ADD_SONGS_TO_PLAYLIST';
export const DELETE_SONG_FROM_PLAYLIST = 'DELETE_SONG_FROM_PLAYLIST';

export function playlistsReducer(state = {}, action) {
	switch (action.type) {
		case ADD_PLAYLIST:
			return {
				...state,
				[action.payload.uuid]: {
					title: action.payload.playlistName,
					songs: action.payload.songs
				}
			};
		case ADD_SONGS_TO_PLAYLIST:
			state[action.payload.uuid].songs =
				[...state[action.payload.uuid].songs, ...action.payload.songs];
			return state;
		case DELETE_SONG_FROM_PLAYLIST:
			state[action.payload.playlistId].songs = action.payload.songs;
			return state;
		default:
			return state;
	}
}