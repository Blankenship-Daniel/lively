import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { DELETE_PLAYLIST } from 'app/reducers/playlists';
import { LOAD_LIBRARY_VIEW } from 'app/reducers/views';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.scss']
})
export class PlaylistViewComponent implements OnInit {

  public title: string;

  private playableSongs: Observable<any>;
  private playlist: Observable<any>;
  private playlistId: string;

  constructor(private store: Store<any>) {
    this.title = '';
    this.playlistId = '';
    this.playableSongs = store.select('playable');
    this.playlist = store.select('playlist');
  }

  ngOnInit() {
    this.playlist.subscribe(playlist => {
      if (playlist.value) {
        this.title = playlist.value.title;
        this.playlistId = playlist.key;
      }
    });
  }

  deletePlaylist() {
    this.store.dispatch({ type: DELETE_PLAYLIST, payload: { uuid: this.playlistId } });
    this.store.dispatch({ type: LOAD_LIBRARY_VIEW, payload: { active: LOAD_LIBRARY_VIEW } });
  }
}
