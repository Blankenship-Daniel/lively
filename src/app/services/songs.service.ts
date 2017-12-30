import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

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

  getPrevSong(song: any) : any {}

  getNextSong(song: any) : any {
    // continue to cycle through the set of combined songs
    //  until the end of the list is reached
    if (song.songs && song.songs.length > 0) {
      song.currSongIndex++;
      if (song.currSongIndex < song.songs.length) {
        return song;
      }
      song.currSongIndex = 0;
    }

    // move onto the next song in the list. Cycle back to the beginning
    //  when the end of the list is reached
    let nextIndex = (this.songs.indexOf(song) + 1) % this.songs.length;
    return this.songs[nextIndex];
  }

  flattenSongs(songs: Array<any>) {
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

  combineSongs(songs: Array<any>) {
    let flattenedSongs = this.flattenSongs(songs);
    return {
      id: UUID.UUID(),
      artist: this.getArtists(flattenedSongs),
      currSongIndex: 0,
      songs: flattenedSongs,
      title: this.getSongTitles(flattenedSongs),
      year: (new Date()).getFullYear()
    };
  }

  getArtists(songs: Array<any>) : string {
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
    let shuffleSongs: Array<any> = JSON.parse(JSON.stringify(songs)); // deep copy so we don't change the incoming songs array
    return shuffleSongs.sort(() => Math.random() - 0.5);
  }
}
