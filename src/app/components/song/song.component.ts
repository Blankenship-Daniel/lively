import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { LOAD_ACTIVE_SONGS } from 'app/reducers/active';
import { SELECT_SONG } from 'app/reducers/selection';
import { PLAY_SONG } from 'app/reducers/player';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  @Input() song;

  private playableSongs: Observable<any>;
  private songs: Array<any>;
  private views: Observable<any>;
  private active: boolean;
  private audio;

  constructor(private store: Store<any>) {
    this.views = store.select('views');
    this.playableSongs = store.select('playable');
    this.songs = [];
    this.active = false;
  }

  ngOnInit() {
    this.song.id = UUID.UUID();
    this.views.subscribe(view => this.active = false);
    this.playableSongs.subscribe(songs => this.songs = songs);
  }

  selectSong(song) {
    this.active = !this.active;
    this.store.dispatch({ type: SELECT_SONG, payload: song });
  }

  playSong(song) {
    this.store.dispatch({ type: PLAY_SONG, payload: song });
    this.store.dispatch({ type: LOAD_ACTIVE_SONGS, payload: this.songs });
  }
}
