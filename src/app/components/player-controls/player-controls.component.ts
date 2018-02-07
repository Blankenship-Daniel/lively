import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import * as storage from 'electron-json-storage';
import { SongsService } from 'app/services/songs.service';
import { PLAY_SONG } from 'app/reducers/player';
import { LOAD_SONGS } from 'app/reducers/songs';
import { LOAD_ACTIVE_SONGS } from 'app/reducers/active';
import { LOAD_PLAYABLE_SONGS } from 'app/reducers/playable';
import { LOAD_LIBRARY_VIEW, LOAD_PLAYLIST_VIEW } from 'app/reducers/views';
import { ADD_SONGS_TO_PLAYLIST, SET_SONGS_IN_PLAYLIST } from 'app/reducers/playlists';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.scss']
})
export class PlayerControlsComponent implements OnInit {

  private player: Observable<any>;
  private active: Observable<any>;
  private playable: Observable<any>;
  private deletedSong: Observable<any>;
  private views: Observable<any>;
  private playlist: Observable<any>;

  private path: string;
  private audio: any;
  private activeSongs: Array<any>;
  private playableSongs: Array<any>;
  private currSong: any;
  private isShuffled: boolean = false;
  private isPlaying: boolean = false;
  private isRepeat: boolean = false;

  private currTime: number;
  private duration: number;
  private range: number;
  private view: string;
  private playlistId: string;

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store<any>,
    private songsService: SongsService
  ) {
    this.player = store.select('player');
    this.active = store.select('active');
    this.playable = store.select('playable');
    this.deletedSong = store.select('delete');
    this.views = store.select('views');
    this.playlist = store.select('playlist');
    this.activeSongs = [];
    this.playableSongs = [];
    this.audio = new Audio();

    this.currTime = 0;
    this.duration = 0.1;  // Prevents NaN divide by zero error.
    this.currSong = null;
    this.playlistId = '';
  }

  ngAfterViewInit() {
    this.player.subscribe(song => {
      if (song) {
        this.setSong(song);
      }
    });
    this.audio.addEventListener('ended', event => {
      const nextSong = this.songsService.getNextSong(this.currSong);
      this.store.dispatch({ type: PLAY_SONG, payload: nextSong });
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
    this.active.subscribe(songs => {
      this.activeSongs = songs;
      this.setActiveSongs(songs);
    });
    this.playable.subscribe(songs => this.playableSongs = songs);
    this.deletedSong.subscribe(song => {
      if (song) {
        // Stop playing the song if it's being deleted.
        if (this.currSong && this.currSong.id === song.id) {
          this.stopSong();
        }
        this.deleteSong(song);
      }
    });
    this.views.subscribe(view => this.view = view.active);
    this.playlist.subscribe(playlist => this.playlistId = playlist.key);
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
        this.store.dispatch({ type: PLAY_SONG, payload: nextSong });
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
        this.store.dispatch({ type: PLAY_SONG, payload: prevSong });
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
    this.setActiveSongs(this.activeSongs);
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

  private stopSong() {
    this.audio.src = '';
    this.currSong = null;
    this.isRepeat = false;
    this.isShuffled = false;
  }

  private deleteSong(song: any) {
    const songs: Array<any> = this.playableSongs.filter(s => s.id !== song.id);

    switch (this.view) {
      case LOAD_LIBRARY_VIEW:
        this.store.dispatch({ type: LOAD_SONGS, payload: songs });
        storage.set('songs', { data: songs });
        break;
      case LOAD_PLAYLIST_VIEW:
        this.store.dispatch({ type: SET_SONGS_IN_PLAYLIST, payload: { uuid: this.playlistId, songs: songs }});
    }

    this.store.dispatch({ type: LOAD_ACTIVE_SONGS, payload: songs });
    this.store.dispatch({ type: LOAD_PLAYABLE_SONGS, payload: songs });
  }
}
