import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url: string;
  private urlDet: string;
  private nameOfCity: string;
  private period: string;
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
      return [this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.nameOfCity}&cnt=1&APPID=8c3440e993cabf23aa02d6325889c9d5`)];
    }
    return [this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.nameOfCity}&cnt=1&APPID=8c3440e993cabf23aa02d6325889c9d5`),
      this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.nameOfCity}&cnt=2&APPID=8c3440e993cabf23aa02d6325889c9d5`),
      this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.nameOfCity}&cnt=3&APPID=8c3440e993cabf23aa02d6325889c9d5`)];
  }

  getDate(): Observable<any> {
      return this.period;
  }

  openMain() {
    this.router.navigate([`/main`]);
  }

  openForm() {
    this.router.navigate([`/form`]);
  }
}

