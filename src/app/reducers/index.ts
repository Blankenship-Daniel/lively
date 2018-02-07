import { playerReducer } from './player';
import { playableReducer } from './playable';
import { playlistReducer } from './playlist';
import { playlistsReducer } from './playlists';
import { selectionReducer } from './selection';
import { songsReducer } from './songs';
import { viewsReducer } from './views';
import { activeReducer } from './active';
import { deleteReducer } from './delete';

export const reducers = {
	player: playerReducer,
	playable: playableReducer,
	playlist: playlistReducer,
	playlists: playlistsReducer,
	selection: selectionReducer,
	songs: songsReducer,
	views: viewsReducer,
	active: activeReducer,
	delete: deleteReducer
};