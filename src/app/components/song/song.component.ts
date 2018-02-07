import { ChangeDetectorRef, Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { SongsService } from 'app/services/songs.service';
import * as os from 'os';
import * as storage from 'electron-json-storage';

import { PLAY_SONG } from 'app/reducers/player';
import { DELETE_SONG } from 'app/reducers/delete';
import { SELECT_SONG } from 'app/reducers/selection';
import { LOAD_SONGS } from 'app/reducers/songs';
import { LOAD_ACTIVE_SONGS } from 'app/reducers/active';
import { LOAD_PLAYABLE_SONGS } from 'app/reducers/playable';
import { LOAD_LIBRARY_VIEW, LOAD_PLAYLIST_VIEW } from 'app/reducers/views';
import { ADD_SONGS_TO_PLAYLIST, SET_SONGS_IN_PLAYLIST } from 'app/reducers/playlists';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  @Input() index;
  @Input() song;

  private playable: Observable<any>;
  private views: Observable<any>;
  private selections: Observable<any>;
  private player: Observable<any>;
  private playlist: Observable<any>;
  private playableSongs: Array<any>;
  private view: string;
  private playlistId: string;
  private active: boolean;
  private playing: boolean;
  private activeDropZoneAbove: boolean;
  private activeDropZoneBelow: boolean;

  public deleted: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store<any>,
    private songsService: SongsService
  ) {
    this.views = store.select('views');
    this.playable = store.select('playable');
    this.selections = store.select('selection');
    this.player = store.select('player');
    this.playlist = store.select('playlist');
    this.playableSongs = [];
    this.active = false;
    this.playing = false;
    this.activeDropZoneAbove = false;
    this.activeDropZoneBelow = false;
    this.playlistId = '';
    this.deleted = false;
  }

  ngOnInit() {
    storage.setDataPath(os.tmpdir());
    this.views.subscribe(view => {
      this.view = view.active;
      this.active = false;
    });
    this.selections.subscribe(selections => {
      if (selections.length === 0) {
        this.active = false;
      }
    });
    this.playable.subscribe(songs => {
      this.playableSongs = songs;
    });
    this.player.subscribe(song => {
      if (!song) {
        this.playing = false;
        return;
      }
      if (this.song.id === song.id) {
        this.playing = true;
      }
      else {
        this.playing = false;
      }
    });
    this.playlist.subscribe(playlist => this.playlistId = playlist.key);
  }

  dragStart(event: any) {
    event.dataTransfer.setData('text', event.target.id);
  }

  dragOverAbove(event: any) {
    event.preventDefault();
    this.activeDropZoneAbove = true;
  }

  dragLeaveAbove(event: any) {
    event.preventDefault();
    this.activeDropZoneAbove = false;
  }

  dragOverBelow(event: any) {
    event.preventDefault();
    this.activeDropZoneBelow = true;
  }

  dragLeaveBelow(event: any) {
    event.preventDefault();
    this.activeDropZoneBelow = false;
  }

  dropAbove(event: any) {
    event.preventDefault();
    this.activeDropZoneAbove = false;
    const draggedSongId: string = event.dataTransfer.getData('text');

    if (this.song.id === draggedSongId) {
      return false;
    }

    const draggedSongArr: Array<any>  = this.playableSongs.filter(s => s.id === draggedSongId);
    const songs: Array<any>           = this.playableSongs.filter(s => s.id !== draggedSongId);
    songs.unshift(draggedSongArr[0]);

    this.updateSongs(songs);
  }

  dropBelow(event: any) {
    event.preventDefault();
    this.activeDropZoneBelow = false;
    const draggedSongId: string = event.dataTransfer.getData('text');

    if (this.song.id === draggedSongId) {
      return false;
    }

    const draggedSongArr: Array<any>  = this.playableSongs.filter(s => s.id === draggedSongId);
    const songs: Array<any>           = this.playableSongs.filter(s => s.id !== draggedSongId);
    const draggedSongPos: number      = this.playableSongs.findIndex(s => s.id === draggedSongArr[0].id);

    const pos: number = draggedSongPos > this.index ? this.index + 1 : this.index;
    songs.splice(pos, 0, draggedSongArr[0]);

    this.updateSongs(songs);
  }

  updateSongs(songs: Array<any>) {
    this.store.dispatch({ type: LOAD_ACTIVE_SONGS, payload: songs });
    this.store.dispatch({ type: LOAD_PLAYABLE_SONGS, payload: songs });
    this.store.dispatch({ type: SET_SONGS_IN_PLAYLIST, payload: { uuid: this.playlistId, songs: songs }});
  }

  deleteSong(song: any) {
    this.deleted = true;
    this.store.dispatch({ type: DELETE_SONG, payload: song });
  }

  selectSong(song: any) {
    this.active = !this.active;
    if (this.view === LOAD_PLAYLIST_VIEW) {
      song.playlistId = this.playlistId;
    }
    this.store.dispatch({ type: SELECT_SONG, payload: song });
  }

  playSong(song: any) {
    this.store.dispatch({ type: PLAY_SONG, payload: song });
    this.store.dispatch({ type: LOAD_ACTIVE_SONGS, payload: this.playableSongs });
  }

  isDraggable(): boolean {
    return (this.view === LOAD_LIBRARY_VIEW ? false : true);
  }
}
