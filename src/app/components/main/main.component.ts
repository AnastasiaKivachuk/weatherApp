import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../services/service.service';
import {ObjDay} from '../../services/objDay';
import {HttpClient} from '@angular/common/http';
import {Observable, forkJoin} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private mainInfo: ObjDay[];
  public ready = false;
  public errorMassage = false;
  public objectKeys = Object.keys;


  constructor(public service: ServiceService) {
  }

  ngOnInit() {
    forkJoin(this.service.getData())
      .subscribe((data) => {
        console.log(data);
        this.mainInfo = data.map((item) => {
          const {name, main: {temp, pressure, humidity, temp_min, temp_max}} = item;
          return new ObjDay(name, pressure, temp, humidity, temp_min, temp_max);
          // this.mainInfo.name = item.name;
          // this.mainInfo.temp = item.main.temp;
          // this.mainInfo.pressure = item.main.pressure;
          // this.mainInfo.humidity = item.main.humidity;
          // this.mainInfo.tempMin = item.main.temp_min;
          // this.mainInfo.tempMax = item.main.temp_max;
          // console.log(1);

        });
        console.log(this.mainInfo);
        this.ready = true;
        console.log(this.service.getDate());
        console.log(this.objectKeys(this.mainInfo));
      }, err => {
        console.log('HTTP Error', err);
        this.errorMassage = true;
      });
  }

  openForm() {
    this.service.openForm();
  }

}
