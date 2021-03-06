import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

const ONE_HOUR: number = 3600;

@Injectable()
export class SongsService {

  private songs: Array<any>;
  private isMultiSong: boolean;

  constructor() {
    this.songs = [];
  }

  setSongs(songs: Array<any>) {
    this.songs = songs;
  }

  getSongs() : Array<any> {
    return this.songs;
  }

  getPrevSong(song: any) : any {
    // Combined songs
    if (song.songs && song.songs.length > 0 && song.currSongIndex > 0) {
      song.currSongIndex--;
      return song;
    }

    if (song.repeat) {
      return song;
    }

    // Single songs
    const i = this.songs.findIndex(s => s.id === song.id);
    if (i === 0) { // Return to the end of the songs list if we are at the first song
      return this.songs[this.songs.length - 1];
    }

    return this.songs[i - 1];
  }

  getNextSong(song: any) : any {
    // Continue to cycle through the set of combined songs
    //  until the end of the list is reached
    if (song.songs && song.songs.length > 0) {
      song.currSongIndex++;
      if (song.currSongIndex < song.songs.length) {
        return song;
      }
      song.currSongIndex = 0;
    }

    if (song.repeat) {
      return song;
    }

    // Move onto the next song in the list. Cycle back to the beginning
    //  when the end of the list is reached
    const nextIndex = (this.songs.findIndex(s => s.id === song.id) + 1) % this.songs.length;
    return this.songs[nextIndex];
  }

  flattenSongs(songs: Array<any>): Array<any> {
    let flattenedSongs: Array<any> = [];
    for (let i = 0; i < songs.length; i++) {
      if (songs[i].songs) {
        flattenedSongs = [...flattenedSongs, ...this.flattenSongs(songs[i].songs)];
      }
      else {
        flattenedSongs.push(songs[i]);
      }
    }
    return flattenedSongs;
  }

  combineSongs(songs: Array<any>): any {
    let flattenedSongs = this.flattenSongs(songs);
    return {
      id: UUID.UUID(),
      album: this.getAlbum(flattenedSongs),
      artist: this.getArtists(flattenedSongs),
      currSongIndex: 0,
      duration: this.getTotalSongDuration(flattenedSongs),
      songs: flattenedSongs,
      title: this.getSongTitles(flattenedSongs),
      year: (new Date()).getFullYear()
    };
  }

  getAlbum(songs: Array<any>): string {
    const same = songs.every((el, idx, arr) => el.album === arr[0].album);
    return same ? songs[0].album : '';
  }

  getTotalSongDuration(songs: Array<any>): number {
    return songs
      .map(song => song.duration)
      .reduce((total, duration) => total + duration);
  }

  getArtists(songs: Array<any>): string {
    let artists: Array<string> = [];
    songs.forEach(song => {
      if (song.artist && song.artist !== '' && !artists.includes(song.artist)) {
        artists.push(song.artist);
      }
    });
    return artists.join(', ');
  }

  getSongTitles(songs: Array<any>) : string {
    let titles: Array<string> = [];
    songs.forEach(song => titles.push(song.title));
    return titles.join(' > ');
  }

  shuffleSongs(songs: Array<any>) : Array<any> {
    let shuffleSongs: Array<any> = [...songs]; // deep copy so we don't change the incoming songs array
    return shuffleSongs.sort(() => Math.random() - 0.5);
  }

  formatTime(seconds): string {
    const date: Date = new Date(null);
    date.setSeconds(seconds);
    const iso: string = date.toISOString();
    return seconds > ONE_HOUR ? iso.substr(11, 8) : iso.substr(14, 5);
  }
}
