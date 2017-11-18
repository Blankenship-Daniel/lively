import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';
import { SongsService } from './songs.service';
import { KeysPipe } from './keys.pipe';

import { playerReducer } from './reducers/player';
import { playlistReducer } from './reducers/playlist';
import { playlistsReducer } from './reducers/playlists';
import { selectionReducer } from './reducers/selection';
import { songsReducer } from './reducers/songs';
import { viewsReducer } from './reducers/views';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongComponent } from './components/song/song.component';
import { PlayerControlsComponent } from './components/player-controls/player-controls.component';
import { PlaylistLinkComponent } from './components/playlist-link/playlist-link.component';
import { PlaylistViewComponent } from './components/playlist-view/playlist-view.component';
import { LibraryViewComponent } from './components/library-view/library-view.component';

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
    LibraryViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    StoreModule.forRoot({
      player: playerReducer,
      playlist: playlistReducer,
      playlists: playlistsReducer,
      selection: selectionReducer,
      songs: songsReducer,
      views: viewsReducer
    })
  ],
  providers: [
    ElectronService,
    SongsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
