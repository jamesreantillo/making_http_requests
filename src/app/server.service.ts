import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor( private http: Http) {}
  storeServers( servers: any[]) {
    const headers =  new Headers({
      'Content-type': 'application/json'
    });
      // return this.http.post('https://udemy-ng-http-56f0b.firebaseio.com/data.json', servers, {headers: headers});
      return this.http.put('https://udemy-ng-http-56f0b.firebaseio.com/data.json', servers, {headers: headers});
    }

    getServers() {
      return this.http.get('https://udemy-ng-http-56f0b.firebaseio.com/data').pipe(map(
        (response: Response) => {
          const data = response.json();
          for ( let server of data) {
            server.name = 'Fetched_' + server.name;
          }
          return data;
        }
      )).pipe(catchError(error => {
        return throwError('something went wrong');
      }));
    }

    getAppName() {
      return this.http.get('https://udemy-ng-http-56f0b.firebaseio.com/appName.json').pipe(map((response: Response) => {
        return response.json();
      }));
    }
}
