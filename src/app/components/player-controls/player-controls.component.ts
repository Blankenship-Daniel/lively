import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { SongsService } from '../../services/songs.service';

import { PLAY_SONG } from 'app/reducers/player';
@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.scss']
})
export class PlayerControlsComponent implements OnInit {

  private path: string;
  private player: any;
  private song: Observable<any>;
  private songs: Array<any>;
  private activeSongs: Observable<any>;
  private currSong: any;
  private isShuffled: boolean = false;
  private isPlaying: boolean = false;

  private currTime: number;
  private duration: number;
  private range: number;

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store<any>,
    private songsService: SongsService
  ) {
    this.song = store.select('player');
    this.activeSongs = store.select('active');
    this.songs = [];
    this.player = new Audio();

    this.currTime = 0;
    this.duration = 0.1; // prevents NaN divide by zero error.
  }

  ngAfterViewInit() {
    this.song.subscribe(songObj => {
      if (Object.keys(songObj.song).length > 0) {
        this.setSong(songObj.song);
      }
    });
    this.player.addEventListener('ended', event => {
      this.store.dispatch({ type: PLAY_SONG, payload: { song: this.songsService.getNextSong(this.currSong) }});
    });
    this.player.addEventListener('timeupdate', event => {
      this.currTime = this.player.currentTime;
      this.cd.detectChanges();
    });
    this.player.addEventListener('durationchange', event => {
      this.duration = this.player.duration;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
    this.activeSongs.subscribe(songs => {
      this.songs = songs;
      this.setActiveSongs(songs);
    });
  }

  seekProgressBar(event) {
    this.player.currentTime = event.target.valueAsNumber;
  }

  setSong(song: any) {
    this.currSong = song || this.currSong;
    // a single song
    if (song && song.path && song.path !== '') {
      this.player.src = song.path;
    }
    // a set of combined songs
    else if (song && song.songs && song.songs.length > 0) {
      this.player.src = song.songs[song.currSongIndex].path;
    }

    this.playSong();
  }

  playNextSong() {
    if (this.currSong) {
      this.store.dispatch({ type: PLAY_SONG, payload: { song: this.songsService.getNextSong(this.currSong) }});
    }
  }

  playPrevSong() {
    if (this.currSong) {
      // TODO: implement previous song functionality
    }
  }

  playSong() {
    if (this.player.src !== '') {
      this.isPlaying = true;
      this.player.play();
    }
  }

  pauseSong() {
    this.isPlaying = false;
    this.player.pause();
  }

  shuffleSongs() {
    this.isShuffled = !this.isShuffled;
    this.setActiveSongs(this.songs);
  }

  setActiveSongs(songs: Array<any>) {
    if (this.isShuffled) {
      this.songsService.setSongs(this.songsService.shuffleSongs(songs));
    }
    else {
      this.songsService.setSongs(songs);
    }
  }
}
