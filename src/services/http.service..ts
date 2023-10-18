import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpCallService {
  constructor(private http: HttpClient) {}

  // this userData: [];

  public get(url: string) {
    return this.http.get(url);
  }

  public post(url: string, data: any) {
    return this.http.post(url, data);
  }

  public put(url: string, data: any) {
    return this.http.put(url, data);
  }

  public delete(url: string) {
    return this.http.delete(url);
  }
}
