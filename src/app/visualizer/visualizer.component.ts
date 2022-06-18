import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { combineLatest } from 'rxjs';
import { AppState } from '../state/app.state';
import { Visualizer } from './visualizer';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css'],
})
export class VisualizerComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('audio', { static: true })
  audio!: ElementRef<HTMLAudioElement>;

  private visualizer?: Visualizer;

  constructor(private host: ElementRef, private store: Store) {}

  ngOnInit(): void {
    this.visualizer = new Visualizer(
      this.canvas.nativeElement,
      this.audio.nativeElement
    );
    this.visualizer.init();
    this.visualizer.start();
    const resizeObserver = new ResizeObserver((e) => {
      this.visualizer!.resize(e[0].contentRect.width, e[0].contentRect.height);
    });
    resizeObserver.observe(this.host.nativeElement);

    combineLatest([
      this.store.select(AppState.playing),
      this.store.select(AppState.url),
    ]).subscribe(async ([playing, url]) => {
      url = url ?? '';
      if (this.audio.nativeElement.src !== url) {
        this.audio.nativeElement.src = url ?? '';
        await this.audio.nativeElement.load();
      }
      switch (playing) {
        case 'playing':
          await this.audio.nativeElement.play();
          break;
        case 'paused':
          await this.audio.nativeElement.pause();
          break;
        case 'stopped':
          await this.audio.nativeElement.pause();
          break;
      }
    });
  }
}
