import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADD_PLAYLIST } from '../../reducers/playlists';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Rx';
import { LOAD_LIBRARY_VIEW } from 'app/reducers/views';
import { LOAD_SONGS } from 'app/reducers/songs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private create: boolean;
  private playlists: Observable<any>;


  constructor(private store: Store<any>) {
    this.create = false;

    this.playlists = store.select('playlists');
  }

  ngOnInit() {
    this.playlists.subscribe(p => console.log('playlists', p));
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
    this.store.dispatch({ type: LOAD_SONGS });
  }
}
