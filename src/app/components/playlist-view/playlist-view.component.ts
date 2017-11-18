import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.scss']
})
export class PlaylistViewComponent implements OnInit {

  private title: string = 'Playlist';
  private playableSongs: Observable<any>;
  private playlist: Observable<any>;

  constructor(private store: Store<any>) {
    this.playableSongs = store.select('playable');
    this.playlist = store.select('playlist');
  }

  ngOnInit() {
    this.playlist.subscribe(playlist => {
      if (playlist.value !== undefined)
        this.title = playlist.value.title;
    });
  }
}
