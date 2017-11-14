import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import * as id3Parser from 'id3-parser';
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  private title: string;
  private playlists: Observable<any>;
  private song: any;

  constructor(private store: Store<any>) {
    this.title = 'New Playlist';
    this.playlists = store.select('playlists');
    this.song = new Audio();
  }

  ngOnInit() {}

  playSong(path: string) {
    this.song.src = path;
    this.song.play();
  }

  onFileChange(event) {
    let files: FileList = event.target.files;
    let tracks: Array<any> = [];
    Array.from(files).forEach((file: File) => {
      id3Parser.parse(file).then(tag => { // grab metadata from mp3 file
        tracks.push(tag);
      });
    });
    console.log('tracks', tracks);
  }
}
