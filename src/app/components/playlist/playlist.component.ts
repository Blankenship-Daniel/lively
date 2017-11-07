import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  private playlists: Observable<any>;
  private song: any;

  constructor(private store: Store<any>) {
    this.playlists = store.select('playlists');
    this.song = new Audio();
  }

  ngOnInit() {}

  playSong(path: string) {
    this.song.src = path;
    this.song.play();
  }
}
