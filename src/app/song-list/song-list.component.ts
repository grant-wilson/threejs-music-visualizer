import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
})
export class SongListComponent implements OnInit {
  items = [
    {
      url: 'assets/Nul Tiel Records - Krautrock/01 Nul Tiel Records - Transit.mp3',
      title: '01 Nul Tiel Records - Transit',
      artist: 'Nul Tiel Records',
      album: 'Krautrock',
      license: 'CC BY-NC-SA',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    },
    {
      url: 'assets/Nul Tiel Records - Krautrock/02 Nul Tiel Records - Electrolyte.mp3',
      title: '02 Nul Tiel Records - Electrolyte',
      artist: 'Nul Tiel Records',
      album: 'Krautrock',
      license: 'CC BY-NC-SA',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    },
    {
      url: 'assets/Nul Tiel Records - Krautrock/03 Nul Tiel Records - Beanbag Fight.mp3',
      title: '03 Nul Tiel Records - Beanbag Fight',
      artist: 'Nul Tiel Records',
      album: 'Krautrock',
      license: 'CC BY-NC-SA',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    },
    {
      url: 'assets/Nul Tiel Records - Krautrock/04 Nul Tiel Records - Burgeon.mp3',
      title: '04 Nul Tiel Records - Burgeon',
      artist: 'Nul Tiel Records',
      album: 'Krautrock',
      license: 'CC BY-NC-SA',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    },
    {
      url: 'assets/Nul Tiel Records - Krautrock/05 Nul Tiel Records - Airtight.mp3',
      title: '05 Nul Tiel Records - Airtight',
      artist: 'Nul Tiel Records',
      album: 'Krautrock',
      license: 'CC BY-NC-SA',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    },
    {
      url: 'assets/Nul Tiel Records - Krautrock/06 Nul Tiel Records - Ebb and Flow.mp3',
      title: '06 Nul Tiel Records - Ebb and Flow',
      artist: 'Nul Tiel Records',
      album: 'Krautrock',
      license: 'CC BY-NC-SA',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    },
    {
      url: 'assets/Nul Tiel Records - Krautrock/07 Nul Tiel Records - Automaton en Avant.mp3',
      title: '07 Nul Tiel Records - Automaton en Avant',
      artist: 'Nul Tiel Records',
      album: 'Krautrock',
      license: 'CC BY-NC-SA',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    },
    {
      url: 'assets/Nul Tiel Records - Krautrock/08 Nul Tiel Records - Sunlight.mp3',
      title: '08 Nul Tiel Records - Sunlight',
      artist: 'Nul Tiel Records',
      album: 'Krautrock',
      license: 'CC BY-NC-SA',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
