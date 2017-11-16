import { Injectable } from '@angular/core';

@Injectable()
export class SongsService {

  private songs: Array<any>;

  constructor() {
    this.songs = [];
  }

  setSongs(songs) {
    this.songs = songs;
  }

  getNextSong(song) {
    const nextIndex = (this.songs.indexOf(song) + 1) % this.songs.length;
    return this.songs[nextIndex];
  }

  getSongsById(songIds: Array<any>) {

  }
}
