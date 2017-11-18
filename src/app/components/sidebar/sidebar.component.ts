import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Rx';
import { ADD_PLAYLIST } from 'app/reducers/playlists';
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
    this.songs.subscribe(songs => this.allSongs = songs);
  }

  onKey(playlistName, event) {
    if (event.key === 'Enter') {
      this.createPlaylist(playlistName);
    }
  }

  createPlaylist(playlistName) {
    if (playlistName !== '') {
      this.store.dispatch({ type: ADD_PLAYLIST, payload: {
          uuid: UUID.UUID(),
          title: playlistName
        }
      });
      this.create = false;
    }
  }

  loadLibrary() {
    this.store.dispatch({ type: LOAD_LIBRARY_VIEW, payload: { active: LOAD_LIBRARY_VIEW }});
    this.store.dispatch({ type: LOAD_PLAYABLE_SONGS, payload: this.allSongs });
    this.store.dispatch({ type: CLEAR_SELECTIONS });
  }
}
