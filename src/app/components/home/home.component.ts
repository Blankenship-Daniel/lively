import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { LOAD_LIBRARY_VIEW, LOAD_PLAYLIST_VIEW } from '../../reducers/views';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private views: Observable<any>;
  private hideView: boolean;

  constructor(private store: Store<any>) {
    this.hideView = true;
    this.views = store.select('views');
  }

  ngOnInit() {
    this.views.subscribe(view => {
      switch (view.active) {
        case LOAD_PLAYLIST_VIEW:
          this.hideView = false;
          break;
        case LOAD_LIBRARY_VIEW:
          this.hideView = true;
          break;
      }
    });
  }
}
