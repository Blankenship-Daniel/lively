import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Rx';
import { SongsService } from 'app/services/songs.service';

import { PLAY_SONG } from 'app/reducers/player';
import { DELETE_SONG } from 'app/reducers/songs';
import { SELECT_SONG } from 'app/reducers/selection';
import { LOAD_SONGS } from 'app/reducers/songs';
import { LOAD_ACTIVE_SONGS } from 'app/reducers/active';
import { LOAD_PLAYABLE_SONGS } from 'app/reducers/playable';
import { LOAD_LIBRARY_VIEW, LOAD_PLAYLIST_VIEW } from 'app/reducers/views';
import { DELETE_SONG_FROM_PLAYLIST } from 'app/reducers/playlists';
@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  @Input() index;
  @Input() song;

  private audio;

  private playableSongs: Observable<any>;
  private views: Observable<any>;
  private selections: Observable<any>;
  private player: Observable<any>;
  private playlist: Observable<any>;

  private songs: Array<any>;
  private active: boolean;
  private playing: boolean;
  private view: string;
  private playlistId: number;

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store<any>,
    private songsService: SongsService
  ) {
    this.views = store.select('views');
    this.playableSongs = store.select('playable');
    this.selections = store.select('selection');
    this.player = store.select('player');
    this.playlist = store.select('playlist');
    this.songs = [];
    this.active = false;
    this.playing = false;
  }

  ngOnInit() {
    this.song.id = UUID.UUID();
    this.views.subscribe(view => {
      this.view = view.active;
      this.active = false;
    });
    this.selections.subscribe(selections => {
      if (selections.length === 0) {
        this.active = false;
      }
    });
    this.playableSongs.subscribe(songs => {
      this.songs = songs;
    });
    this.player.subscribe(songObj => {
      if (this.song.id === songObj.song.id) {
        this.playing = true;
      }
      else {
        this.playing = false;
      }
    });
    this.playlist.subscribe(playlist => this.playlistId = playlist.key);
  }

  deleteSong(song) {
    const songs = this.songs.filter(s => s.id !== song.id);

    switch (this.view) {
      case LOAD_LIBRARY_VIEW:
        this.store.dispatch({ type: LOAD_SONGS, payload: songs });
        break;
      case LOAD_PLAYLIST_VIEW:
        this.store.dispatch({ type: DELETE_SONG_FROM_PLAYLIST, payload: { playlistId: this.playlistId, songs: songs }});
    }

    this.store.dispatch({ type: LOAD_ACTIVE_SONGS, payload: songs });
    this.store.dispatch({ type: LOAD_PLAYABLE_SONGS, payload: songs });
  }

  selectSong(song) {
    this.active = !this.active;
    this.store.dispatch({ type: SELECT_SONG, payload: song });
  }

  playSong(song) {
    this.store.dispatch({ type: PLAY_SONG, payload: { song: song }});
    this.store.dispatch({ type: LOAD_ACTIVE_SONGS, payload: this.songs });
  }
}
