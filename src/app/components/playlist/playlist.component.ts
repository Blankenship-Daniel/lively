import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { ADD_SONG } from '../../../reducers/songs';

import * as id3Parser from 'id3-parser';
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  private songs: Observable<any>;
  private song: any;

  constructor(private store: Store<any>) {
    this.songs = store.select('songs');
    this.songs.subscribe(s => console.log('songs', s));
    this.song = new Audio();
  }

  ngOnInit() {}

  playSong(path: string) {
    console.log('playSong(', path, ')');
    this.song.src = path;
    this.song.play();
  }

  onFileChange(event) {
    let files: FileList = event.target.files;
    let songsPromiseArray: Array<any> = [];

    Array.from(files).forEach((file: File) => {
      songsPromiseArray.push(id3Parser.parse(file).then((tag: any) => {
        tag.path = file.path;
        return tag;
      }));
    });

    Promise.all(songsPromiseArray).then(songs => {
      this.store.dispatch({ type: ADD_SONG, payload: songs });
    });
  }
}
