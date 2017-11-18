import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { ADD_SONGS_TO_PLAYLIST } from 'app/reducers/playlists';
import { LOAD_PLAYLIST_VIEW } from 'app/reducers/views';
import { LOAD_PLAYLIST } from 'app/reducers/playlist';
import { CLEAR_SELECTIONS } from 'app/reducers/selection';

@Component({
  selector: 'app-playlist-link',
  templateUrl: './playlist-link.component.html',
  styleUrls: ['./playlist-link.component.scss']
})
export class PlaylistLinkComponent implements OnInit {

  @Input() playlist;

  private selectedSongs: Observable<any>;
  private selectedSongsArr: Array<any>;
  private songsAreSelected: boolean;

  constructor(private store: Store<any>) {
    this.songsAreSelected = false;
    this.selectedSongsArr = [];
    this.selectedSongs = store.select('selection');
  }

  ngOnInit() {
    this.selectedSongs.subscribe(songs => {
      this.selectedSongsArr = songs;
      if (songs.length > 0) {
        this.songsAreSelected = true;
      }
      else {
        this.songsAreSelected = false;
      }
    });
  }

  loadPlaylist() {
    this.store.dispatch({ type: LOAD_PLAYLIST_VIEW, payload: {
        active: LOAD_PLAYLIST_VIEW,
        playlistId: this.playlist.key
      }
    });
    this.store.dispatch({ type: LOAD_PLAYLIST, payload: this.playlist });
    this.store.dispatch({ type: CLEAR_SELECTIONS });
  }

  addSongsToPlaylist(songs: Array<any>) {
    this.store.dispatch({ type: ADD_SONGS_TO_PLAYLIST, payload: {
        id: this.playlist.key,
        songs: songs
      }
    });
  }
}
