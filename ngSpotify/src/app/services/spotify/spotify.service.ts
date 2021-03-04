import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import {environment} from "../../../environments/environment";
import {catchError, mergeMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  private clientId:string = environment.clientId;
  private clientSecret:string = environment.clientSecret;

  private token:string;

  constructor(private _http: HttpClient) { }

  //todo: get token only if 401 Unauthorized
   getToken(){
    if (this.token) {
      return of(null);
    }

    return this._http.post<any>('https://accounts.spotify.com/api/token',{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`
      },
      body: 'grant_type=client_credentials'
    })
      .pipe(tap(({ access_token }) => this.token = access_token.toString()));
  }

  searchMusic(q:string, type='artist'){
    return this.getToken().pipe(
      mergeMap(() => this._http.get<any>(`https://api.spotify.com/v1/search`, {
        params: {
          q,
          type,
          offset: '0',
          limit: '20',
          market: 'US',
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}}`
        }
      })),
    );
  }

}



// private getToken = async () => {

//   const result = await fetch(`https://account.spotify.com/api/token`, {
//     method: 'POST',
//     headers: {
//       'Content-Type' : 'application/x-www-form-urlencoded',
//       'Authorization' : 'Basic ' + this.clientId + ':' + this.clientSecret
//     },
//     body: 'grant_type=client_credentials'
//   });

//   const data = await result.json();

//   return data.access_token;
// }

// async searchMusic(str:string, type='artist'){
//   var token = this.getToken();

//   const result = await fetch(`https://api.spotify.com/v1/search?q=${str}&offset=0&limit=20&type=${type}&market=US`,{
//     method: 'GET',
//     headers: {'Authorization' : 'Bearer ' + token}
//   });

//   const data = await result.json()
//   return data;
// }

// private client_id:String = 'CLIENT_ID'; // Your client id
// private client_secret:String = 'CLIENT_SECRET'; // Your secret
// private authOptions:Object = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (new Buffer(this.client_id + ':' + this.client_secret).toString('base64'))
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

// httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
