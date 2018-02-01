import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { SongsService } from 'app/services/songs.service';
import { PLAY_SONG } from 'app/reducers/player';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.scss']
})
export class PlayerControlsComponent implements OnInit {

  private player: Observable<any>;
  private activeSongs: Observable<any>;

  private path: string;
  private audio: any;
  private songs: Array<any>;
  private currSong: any;
  private isShuffled: boolean = false;
  private isPlaying: boolean = false;
  private isRepeat: boolean = false;

  private currTime: number;
  private duration: number;
  private range: number;
  private currImgSrc: string;

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store<any>,
    private songsService: SongsService
  ) {
    this.player = store.select('player');
    this.activeSongs = store.select('active');
    this.songs = [];
    this.audio = new Audio();

    this.currTime = 0;
    this.duration = 0.1;  // Prevents NaN divide by zero error.
    this.currImgSrc = '';
  }

  ngAfterViewInit() {
    this.player.subscribe(songObj => {
      if (Object.keys(songObj.song).length > 0) {
        this.setSong(songObj.song);
      }
    });
    this.audio.addEventListener('ended', event => {
      const nextSong = this.songsService.getNextSong(this.currSong);
      this.store.dispatch({ type: PLAY_SONG, payload: { song: nextSong }});
    });
    this.audio.addEventListener('timeupdate', event => {
      this.currTime = this.audio.currentTime;
      this.cd.detectChanges();
    });
    this.audio.addEventListener('durationchange', event => {
      this.duration = this.audio.duration;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
    this.activeSongs.subscribe(songs => {
      this.songs = songs;
      this.setActiveSongs(songs);
    });
  }

  seekProgressBar(event: any) {
    this.audio.currentTime = event.target.valueAsNumber;
  }

  setSong(song: any) {
    this.currSong = song || this.currSong;
    this.currSong.repeat = this.isRepeat;

    // Represents a single song.
    if (song && song.path && song.path !== '') {
      this.audio.src = song.path;
    }
    // Represents a set of combined songs.
    else if (song && song.songs && song.songs.length > 0) {
      this.audio.src = song.songs[song.currSongIndex].path;
    }

    this.playSong();
  }

  playNextSong() {
    if (this.currSong) {
      if (this.songsService.getSongs().length) {
        const nextSong = this.songsService.getNextSong(this.currSong);
        this.store.dispatch({ type: PLAY_SONG, payload: { song: nextSong }});
      }
      else {
        this.audio.src = '';
      }
    }
  }

  playPrevSong() {
    if (this.currSong) {
      if (this.songsService.getSongs().length) {
        const prevSong = this.songsService.getPrevSong(this.currSong);
        this.store.dispatch({ type: PLAY_SONG, payload: { song: prevSong }});
      }
      else {
        this.audio.src = '';
      }
    }
  }

  playSong() {
    if (this.audio.src !== '') {
      this.isPlaying = true;
      this.audio.play();
    }
  }

  pauseSong() {
    this.isPlaying = false;
    this.audio.pause();
  }

  shuffleSongs() {
    this.isRepeat = false;
    this.currSong.repeat = false;
    this.isShuffled = !this.isShuffled;
    this.setActiveSongs(this.songs);
  }

  repeatSong() {
    this.isShuffled = false;
    this.isRepeat = !this.isRepeat;
    this.currSong.repeat = !this.currSong.repeat;
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
