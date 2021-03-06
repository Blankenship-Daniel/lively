import { NgZone, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { UUID } from 'angular2-uuid';
import * as id3Parser from 'id3-parser';
import * as os from 'os';
import * as storage from 'electron-json-storage';

import { ADD_SONGS } from 'app/reducers/songs';
import { LOAD_PLAYABLE_SONGS } from 'app/reducers/playable';
import { LOAD_ACTIVE_SONGS } from 'app/reducers/active';

@Component({
  selector: 'app-library-view',
  templateUrl: './library-view.component.html',
  styleUrls: ['./library-view.component.scss']
})
export class LibraryViewComponent implements OnInit {

  private songs: Observable<any>;
  private songsLoaded: boolean;
  private songsLoading: boolean;

  constructor(private store: Store<any>) {
    this.songs = store.select('songs');
    this.songsLoaded = false;
    this.songsLoading = false;
  }

  ngOnInit() {
    this.songsLoading = true;
    storage.setDataPath(os.tmpdir());

    storage.get('songs', (err, songs) => {

      if (err) {
        throw err;
      }

      if (songs.data && Object.keys(songs.data).length > 0) {
        this.store.dispatch({ type: ADD_SONGS, payload: songs.data });
        this.store.dispatch({ type: LOAD_PLAYABLE_SONGS, payload: songs.data });
        this.store.dispatch({ type: LOAD_ACTIVE_SONGS, payload: songs.data });
        this.songsLoaded = true;
      }

      this.songsLoading = false;
    });

    this.songs.subscribe(songs => {
      storage.set('songs', { data: songs });

      this.store.dispatch({ type: LOAD_PLAYABLE_SONGS, payload: songs });
      this.store.dispatch({ type: LOAD_ACTIVE_SONGS, payload: songs });

      if (songs.length === 0) {
        this.songsLoaded = false;
      }
    });
  }

  getSongDuration(src: string): Promise<number> {
    let audio = new Audio();
    audio.preload = 'metadata';
    audio.src = src;

    return new Promise(resolve =>
      audio.addEventListener('loadedmetadata', ev => resolve(audio.duration)));
  }

  async onFileChange(event: any) {
    this.songsLoading = true;

    const files: FileList = event.target.files;
    let songsArray: Array<any> = [];
    let filesArray: Array<File> = Array.from(files);

    for (let i = 0; i < filesArray.length; i++) {
      if (filesArray[i].type !== 'audio/mp3') { // Only accept mp3 files.
        continue;
      }

      const path: string      = filesArray[i].path;
      const duration: number  = await this.getSongDuration(path);
      const songMetadata: any = await id3Parser.parse(filesArray[i]);
      songMetadata.duration   = duration;
      songMetadata.path       = path;
      songMetadata.id         = UUID.UUID();
      songMetadata.repeat     = false;

      if (songMetadata.image) {
        songMetadata.image.data = Array.from(songMetadata.image.data);
        songMetadata.image.dataUrl = this.createDataUrl(songMetadata.image);
      }

      songsArray.push(songMetadata);
    }

    this.songsLoading = false;
    if (!songsArray.length) {
      this.songsLoaded = false;
      return;
    }

    this.store.dispatch({ type: ADD_SONGS, payload: songsArray });
    this.songsLoaded = true;
  }

  private createDataUrl(image: any) : string {
      let base64String = "";
      for (let i = 0; i < image.data.length; i++) {
          base64String += String.fromCharCode(image.data[i]);
      }
      return `data:${image.mime};base64,${window.btoa(base64String)}`;
  }
}
