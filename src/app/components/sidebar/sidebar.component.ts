import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Rx';

import * as os from 'os';
import * as storage from 'electron-json-storage';

import { ADD_PLAYLIST, ADD_PLAYLISTS } from 'app/reducers/playlists';
import { LOAD_LIBRARY_VIEW } from 'app/reducers/views';
import { LOAD_PLAYABLE_SONGS } from 'app/reducers/playable';
import { CLEAR_SELECTIONS } from 'app/reducers/selection';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private create: boolean;
  private allSongs: Array<any>;
  private songs: Observable<any>;
  private playlists: Observable<any>;

  constructor(private store: Store<any>) {
    this.create = false;
    this.songs = store.select('songs');
    this.playlists = store.select('playlists');
  }

  ngOnInit() {
    storage.setDataPath(os.tmpdir());
    storage.get('playlists', (err, playlists) => {

      if (err) {
        throw err;
      }

      this.store.dispatch({ type: ADD_PLAYLISTS, payload: playlists.data });
    });
    this.songs.subscribe(songs => this.allSongs = songs);
    this.playlists.subscribe(playlists => storage.set('playlists', { data: playlists }));
  }

  onKey(createPlaylistInput, event) {
    if (event.key === 'Enter') {
      this.createPlaylist(createPlaylistInput.value);
      createPlaylistInput.value = '';
    }
  }

  createPlaylist(playlistName) {
    if (playlistName !== '') {
      this.store.dispatch({
        type: ADD_PLAYLIST, payload: {
          uuid: UUID.UUID(),
          playlistName: playlistName,
          songs: []
        }
      });
      this.create = false;
    }
  }

  loadLibrary() {
    this.store.dispatch({ type: LOAD_LIBRARY_VIEW, payload: { active: LOAD_LIBRARY_VIEW } });
    this.store.dispatch({ type: LOAD_PLAYABLE_SONGS, payload: this.allSongs });
    this.store.dispatch({ type: CLEAR_SELECTIONS });
  }
}
