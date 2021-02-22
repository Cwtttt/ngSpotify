import { Component, OnInit, Input } from '@angular/core';
import { Artist } from '../../../Artist';

@Component({
  selector: 'small-artist',
  templateUrl: './small-artist.component.html',
  styleUrls: ['./small-artist.component.css']
})

export class SmallArtistComponent implements OnInit {
  @Input() artist: Artist;

  constructor() { }

  ngOnInit(): void {
  }

}
