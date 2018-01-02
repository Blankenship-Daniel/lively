import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Rx';

import { PLAY_SONG } from 'app/reducers/player';
import { SELECT_SONG } from 'app/reducers/selection';
import { LOAD_ACTIVE_SONGS } from 'app/reducers/active';
import { SongsService } from 'app/services/songs.service';
@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  @Input() index;
  @Input() song;

  private playableSongs: Observable<any>;
  private views: Observable<any>;
  private selections: Observable<any>;
  private player: Observable<any>;

  private songs: Array<any>;
  private active: boolean;
  private audio;
  private playing: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store<any>,
    private songsService: SongsService
  ) {
    this.views = store.select('views');
    this.playableSongs = store.select('playable');
    this.selections = store.select('selection');
    this.player = store.select('player');
    this.songs = [];
    this.active = false;
    this.playing = false;
  }

  ngOnInit() {
    this.song.id = UUID.UUID();
    this.views.subscribe(view => this.active = false);
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
