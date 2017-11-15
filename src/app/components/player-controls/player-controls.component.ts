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
  private songPath: string;
  private audio;

  constructor(
    private store: Store<any>,
  ) {
    this.isPlaying = false;
    this.playPromises = [];
    this.audio = new Audio();
    this.path = store.select('player');
    this.playSong();
  }

  ngOnInit() {
  }

  pauseSong() {
    console.log('pauseSong(', this.songPath, ')');


    if (this.playPromises.length) {
      Promise.all(this.playPromises).then(_ => {
        this.isPlaying = false;
        this.audio.pause();
      })
      .catch(error => {
        this.isPlaying = true;
      });
    }
  }

  play() {
    this.isPlaying = true;
    this.audio.src = this.songPath;
    this.playPromises.push(this.audio.play());
  }

  playSong() {
    this.path.subscribe(path => {
      this.songPath = path;

      console.log('playSong(', this.songPath, ')');

      if (path !== '') {
        if (this.playPromises.length) {
          Promise.all(this.playPromises).then(_ => {
            this.play();
          })
          .catch(error => {
            console.error(error);
          });
        }
        else {
          this.play();
        }
      }
    });
  }
}
