import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { combineLatest, map } from 'rxjs';
import { Play, Pause } from '../state/app.actions';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-song-list-item',
  templateUrl: './song-list-item.component.html',
  styleUrls: ['./song-list-item.component.css'],
})
export class SongListItemComponent implements OnInit {
  @Input()
  item: any;

  playing$ = combineLatest([
    this.store.select(AppState.playing),
    this.store.select(AppState.url),
  ]).pipe(
    map(([playing, url]) => playing === 'playing' && url === this.item.url)
  );

  constructor(private store: Store) {}

  ngOnInit(): void {}

  play() {
    this.store.dispatch(new Play(this.item.url));
  }

  pause() {
    this.store.dispatch(new Pause());
  }
}
