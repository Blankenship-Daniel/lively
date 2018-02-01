import { Action } from '@ngrx/store';

export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const ADD_PLAYLISTS = 'ADD_PLAYLISTS';
export const ADD_SONGS_TO_PLAYLIST = 'ADD_SONGS_TO_PLAYLIST';
export const SET_SONGS_IN_PLAYLIST = 'SET_SONGS_IN_PLAYLIST';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';

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
		case ADD_PLAYLISTS:
			return { ...action.payload };
		case ADD_SONGS_TO_PLAYLIST:
			let songs = [...state[action.payload.uuid].songs, ...action.payload.songs];
			state[action.payload.uuid].songs = Array.from(new Set(songs)); // Don't allow duplicate songs in playlists.
			return { ...state };
		case SET_SONGS_IN_PLAYLIST:
			state[action.payload.uuid].songs = action.payload.songs;
			return { ...state };
		case DELETE_PLAYLIST:
			delete state[action.payload.uuid];
			return { ...state };
		default:
			return state;
	}
}