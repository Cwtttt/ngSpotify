import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { Artist } from '../../../Artist';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  searchRes: Artist[];

  constructor(private _spotifyService:SpotifyService) { }

  ngOnInit(): void {
    this._spotifyService.getToken().subscribe();

    this.form = new FormGroup({
      phrase: new FormControl(''),
    });

    this.form.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(({ phrase }) => this._spotifyService.searchMusic(phrase))
      ).subscribe(({ artists }) => this.searchRes = artists.items);
  }
}
