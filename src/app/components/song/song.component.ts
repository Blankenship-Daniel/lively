import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { PLAY_SONG } from '../../../reducers/player';

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
  }

  playSong(path: string) {
    this.store.dispatch({ type: PLAY_SONG, payload: path });
  }
}
