import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADD } from '../../../reducers/playlists';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private store: Store<any>) {}

  ngOnInit() {
  }

  onFileChange(event: any) {
    let files = event.target.files;
    let playlist = Array.from(files).map(obj => {
      return {
        name: obj['name'],
        path: obj['path'],
        size: obj['size']
      }
    });
    console.log(playlist);
    this.store.dispatch({ type: ADD, payload: playlist });
  }
}
