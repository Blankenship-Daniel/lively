import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { SongsService } from '../../songs.service';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.scss']
})
export class PlayerControlsComponent implements OnInit {

  @ViewChild('player') player: ElementRef;

  private path: string;
  private song: Observable<any>;
  private activeSongs: Observable<any>;
  private currSong;

  constructor(
    private store: Store<any>,
    private songsService: SongsService
  ) {
    this.song = store.select('player');
    this.activeSongs = store.select('active');
  }

  ngAfterViewInit() {
    this.song.subscribe(song => this.playSong(song));
    this.player.nativeElement.addEventListener('ended', _ => {
      this.playSong(this.songsService.getNextSong(this.currSong))
    });
  }

  ngOnInit() {
    this.activeSongs.subscribe(songs => this.songsService.setSongs(songs));
  }

  playSong(song) {
    this.currSong = song;
    if (song && song.path !== '') {
      this.player.nativeElement.src = song.path;
      this.player.nativeElement.play();
    }
  }
}
