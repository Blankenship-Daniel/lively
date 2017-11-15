import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.scss']
})
export class PlayerControlsComponent implements OnInit {

  private isPlaying: boolean;
  private playPromises: Array<any>;
  private path: Observable<any>;
  private selection: Observable<any>;
  private selectionDisplay: string;
  private songPath: string;
  private audio;

  constructor(
    private store: Store<any>,
  ) {
    this.isPlaying = false;
    this.playPromises = [];
    this.audio = new Audio();
    this.path = store.select('player');
    this.selection = store.select('selection');
    this.selectionDisplay = '';
    this.playSong();
  }

  ngOnInit() {
    this.selection.subscribe(songs => {
      this.selectionDisplay = '';
      songs.forEach(song => {
        this.selectionDisplay += song.title + ' > ';
      });
    });
  }

  pauseSong() {
    this.isPlaying = false;
    if (this.playPromises.length) {
      Promise.all(this.playPromises).then(_ => {
        this.audio.pause();
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

  newSong() {
    this.isPlaying = true;
    this.audio.src = this.songPath;
    this.playPromises.push(this.audio.play());
  }

  play() {
    this.isPlaying = true;
    this.audio.play();
  }

  playSong() {
    this.path.subscribe(path => {
      this.songPath = path;

      if (path !== '') {
        if (this.playPromises.length) {
          Promise.all(this.playPromises).then(_ => {
            this.newSong();
          })
          .catch(error => {
            console.error(error);
          });
        }
        else {
          this.newSong();
        }
      }
    });
  }
}
