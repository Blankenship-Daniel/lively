import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SELECT_SONG } from '../../reducers/selection';
import { PLAY_SONG } from '../../reducers/player';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  @Input() song;
  private active: boolean;
  private audio;

  constructor(private store: Store<any>) {
    this.active = false;
  }

  ngOnInit() {
    this.song.id = UUID.UUID();
  }

  selectSong(song) {
    this.active = !this.active;
    this.store.dispatch({ type: SELECT_SONG, payload: song });
  }

  playSong(song) {
    this.store.dispatch({ type: PLAY_SONG, payload: song });
  }
}
