import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { reducers } from './reducers';

import { ElectronService } from './providers/electron.service';
import { SongsService } from './services/songs.service';
import { PlayerService } from './services/player.service';
import { KeysPipe } from './keys.pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongComponent } from './components/song/song.component';
import { PlayerControlsComponent } from './components/player-controls/player-controls.component';
import { PlaylistLinkComponent } from './components/playlist-link/playlist-link.component';
import { PlaylistViewComponent } from './components/playlist-view/playlist-view.component';
import { LibraryViewComponent } from './components/library-view/library-view.component';
import { SelectionQueueComponent } from './components/selection-queue/selection-queue.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    KeysPipe,
    SongListComponent,
    SongComponent,
    PlayerControlsComponent,
    PlaylistLinkComponent,
    PlaylistViewComponent,
    LibraryViewComponent,
    SelectionQueueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    StoreModule.forRoot(
      reducers
    )
  ],
  providers: [
    ElectronService,
    SongsService,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
