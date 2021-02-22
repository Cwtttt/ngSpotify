import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchStr:string;

  constructor(private _spotifyService:SpotifyService) { }

  ngOnInit(): void {
    this._spotifyService.getToken();
  }


  searchMusic(){
    this._spotifyService.searchMusic(this.searchStr)
    .subscribe((res) => {
      console.log(res);
    })
  }
}