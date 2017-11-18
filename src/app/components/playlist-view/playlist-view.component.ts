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
  private playlist: Observable<any>;
  private playlistData;

  constructor(private store: Store<any>) {
    this.playlist = store.select('playlist');
    this.playlistData = {};
  }

  ngOnInit() {
    this.playlist.subscribe(playlist => this.playlistData = playlist);
  }
}
