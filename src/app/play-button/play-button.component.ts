import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css'],
})
export class PlayButtonComponent implements OnInit {
  @Input()
  playing: boolean = false;

  @Output()
  play = new EventEmitter<void>();

  @Output()
  pause = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
