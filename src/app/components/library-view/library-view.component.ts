import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import * as id3Parser from 'id3-parser';

import { ADD_SONGS } from '../../reducers/songs';
import { LOAD_PLAYABLE_SONGS } from 'app/reducers/playable';
import { LOAD_ACTIVE_SONGS } from 'app/reducers/active';
@Component({
  selector: 'app-library-view',
  templateUrl: './library-view.component.html',
  styleUrls: ['./library-view.component.scss']
})
export class LibraryViewComponent implements OnInit {

  private songs: Observable<any>;

  constructor(private store: Store<any>) {
    this.songs = store.select('songs');
  }

  ngOnInit() {
  }

  getSongDuration(src: string): Promise<number> {
    let audio = new Audio();
    audio.preload = 'metadata';
    audio.src = src;

    return new Promise(resolve =>
      audio.addEventListener('loadedmetadata', ev => resolve(audio.duration)));
  }

  async onFileChange(event) {
    let files: FileList = event.target.files;
    let songsArray: Array<any> = [];

    let filesArray: Array<File> = Array.from(files);

    for (let i = 0; i < filesArray.length; i++) {
      const path: string      = filesArray[i].path;
      const duration: number  = await this.getSongDuration(path);
      let songMetadata: any   = await id3Parser.parse(filesArray[i]);
      songMetadata.duration   = duration;
      songMetadata.path       = path;
      songsArray.push(songMetadata);
    }

    this.store.dispatch({ type: ADD_SONGS, payload: songsArray });
    this.store.dispatch({ type: LOAD_PLAYABLE_SONGS, payload: songsArray });
    this.store.dispatch({ type: LOAD_ACTIVE_SONGS, payload: songsArray });
  }
}
