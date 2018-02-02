import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { DELETE_PLAYLIST } from 'app/reducers/playlists';
import { LOAD_LIBRARY_VIEW } from 'app/reducers/views';
import { LOAD_ACTIVE_SONGS } from 'app/reducers/active';
import { PLAY_SONG } from 'app/reducers/player';
import { LOAD_PLAYABLE_SONGS } from 'app/reducers/playable';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.scss']
})
export class PlaylistViewComponent implements OnInit {

  public title: string;

  private playableSongs: Observable<any>;
  private playlist: Observable<any>;
  private songs: Observable<any>;
  private playlistId: string;
  private allSongs: Array<any>;

  constructor(private store: Store<any>) {
    this.title = '';
    this.playlistId = '';
    this.playableSongs = store.select('playable');
    this.playlist = store.select('playlist');
    this.songs = store.select('songs');
  }

  ngOnInit() {
    this.playlist.subscribe(playlist => {
      if (playlist.value) {
        this.title = playlist.value.title;
        this.playlistId = playlist.key;
      }
    });
    this.songs.subscribe(songs => this.allSongs = songs);
  }

  deletePlaylist() {
    this.store.dispatch({ type: DELETE_PLAYLIST, payload: { uuid: this.playlistId } });
    this.store.dispatch({ type: LOAD_ACTIVE_SONGS, payload: [] });    // Since we are deleting the playlist, remove the active songs
    this.store.dispatch({ type: LOAD_PLAYABLE_SONGS, payload: this.allSongs });
    this.store.dispatch({ type: PLAY_SONG, payload: { song: null }}); // Wipe the currently queued song
    this.store.dispatch({ type: LOAD_LIBRARY_VIEW, payload: { active: LOAD_LIBRARY_VIEW } });
  }
}
