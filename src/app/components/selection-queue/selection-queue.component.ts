import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { SongsService } from '../../services/songs.service';

import { LOAD_LIBRARY_VIEW } from 'app/reducers/views';
import { ADD_PLAYABLE_SONG } from 'app/reducers/playable';
import { CLEAR_SELECTIONS } from 'app/reducers/selection';
@Component({
  selector: 'app-selection-queue',
  templateUrl: './selection-queue.component.html',
  styleUrls: ['./selection-queue.component.scss']
})
export class SelectionQueueComponent implements OnInit {
  private views: Observable<any>;
  private selection: Observable<any>;
  private songs: Array<any>;
  private currView: string;
  private selectionDisplay: string;
  private songTitles: Array<string>;

  constructor(
    private songsService: SongsService,
    private store: Store<any>
  ) {
    this.views = store.select('views');
    this.selection = store.select('selection');
    this.songs = [];
    this.songTitles = [];
    this.selectionDisplay = '';
  }

  ngOnInit() {
    this.views.subscribe(view => this.currView = view.active);
    this.selection.subscribe(songs => {
      this.songs = songs;
      this.songTitles = [];
      songs.forEach(song => this.songTitles.push(song.title));
      this.selectionDisplay = this.songTitles.join(' > ');
    });
  }

  combineSongs(songs: Array<any>) {
    const song = this.songsService.combineSongs(songs);
    this.store.dispatch({ type: ADD_PLAYABLE_SONG, payload: song });
    this.store.dispatch({ type: CLEAR_SELECTIONS });
  }

  hideSelectionQueue() {
    return this.songs.length === 0 || this.currView === LOAD_LIBRARY_VIEW;
  }
}
