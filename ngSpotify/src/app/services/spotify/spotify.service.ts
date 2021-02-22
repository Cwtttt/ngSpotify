import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  private clientId:string = '3633b9805ce74f379b244c930a17d7d9';
  private clientSecret:string = '724f3495c7b743bf98b21c52ed1cf1dc';

  private token:string;

  constructor(private _http: HttpClient) { }

   getToken(){
    of(this._http.request<any>('POST', 'https://accounts.spotify.com/api/token',{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Authorization' : `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}` 
      },
      body: 'grant_type=client_credentials'
    }).subscribe((res) => {
      this.token = res.access_token.toString();
    }));
  }

  searchMusic(str:string, type='artist'){
    this.getToken();
    console.log(this.token);
    return  this._http.request('GET', `https://api.spotify.com/v1/search?q=${str}&offset=0&limit=20&type=${type}&market=US`,{
      headers: {
        'Content-Type': 'application/json', 
        'Authorization' : `Bearer ${this.token}}` 
      }
    });
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