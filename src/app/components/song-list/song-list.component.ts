import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  @Input() songs;

  constructor() {}

  ngOnInit() {}
}
