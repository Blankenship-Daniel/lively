import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-selection-queue',
  templateUrl: './selection-queue.component.html',
  styleUrls: ['./selection-queue.component.scss']
})
export class SelectionQueueComponent implements OnInit {
  private selectionDisplay: string;
  private selection: Observable<any>;

  constructor(private store: Store<any>) {
    this.selectionDisplay = '';
    this.selection = store.select('selection');
  }

  ngOnInit() {
    this.selection.subscribe(songs => {
      this.selectionDisplay = '';
      songs.forEach(song => this.selectionDisplay += song.title + ' > ');
    });
  }

}
