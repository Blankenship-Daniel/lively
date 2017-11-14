import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADD } from '../../../reducers/playlists';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private create: boolean;
  private playlists: Observable<any>;

  constructor(private store: Store<any>) {
    this.create = false;
    this.playlists = store.select('playlists');

    this.playlists.subscribe(s => console.log(s));
  }

  ngOnInit() {
  }

  onKey(playlistName, event) {
    if (event.key === 'Enter') {
      this.createPlaylist(playlistName);
    }
  }

  createPlaylist(playlistName) {
    if (playlistName !== '') {
      this.store.dispatch({ type: ADD, payload: {
          uuid: UUID.UUID(),
          title: playlistName
        }
      });
      this.create = false;
    }
  }
}
