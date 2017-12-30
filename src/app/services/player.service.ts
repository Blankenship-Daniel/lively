import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {

  player: any;

  constructor() {}

  init() {
    this.player = new Audio();
  }

  isPlaying(): boolean {
    return this.player.currentTime || !this.player.paused;
  }
}
