import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private today: string = moment().format('D MMM YYYY');
  private day2: string = moment().add(1, 'days').format('D MMM YYYY');
  private day3: string = moment().add(2, 'days').format('D MMM YYYY');
  private nameOfCity: string;
  private period: string;
  url = environment.api;
  apiKey = environment.apiKey;

  constructor(public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) {
  }

  takeNameCity(nameCity) {
    this.nameOfCity = nameCity.city;
    this.period = nameCity.day;
    console.log(nameCity.day);
  }

  getData(): Observable<any>[] {
    if (this.period === 'today') {
      return [this.http.get(`${this.url}q=${this.nameOfCity}&cnt=1&APPID=${this.apiKey}`)];
    }
    return [this.http.get(`${this.url}q=${this.nameOfCity}&cnt=1&APPID=${this.apiKey}`),
      this.http.get(`${this.url}q=${this.nameOfCity}&cnt=2&APPID=${this.apiKey}`),
      this.http.get(`${this.url}q=${this.nameOfCity}&cnt=3&APPID=${this.apiKey}`)];
  }

  getDate() {
    return this.period === 'today' ? [this.today] : [this.today, this.day2, this.day3];
  }

  openMain() {
    this.router.navigate([`/main`]);
  }

  openForm() {
    this.router.navigate([`/form`]);
  }
}

