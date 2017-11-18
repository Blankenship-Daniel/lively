import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { ADD_SONGS } from '../../reducers/songs';
import * as id3Parser from 'id3-parser';
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

  ngOnInit() {}

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
      this.store.dispatch({ type: ADD_SONGS, payload: songs });
    });
  }
}
