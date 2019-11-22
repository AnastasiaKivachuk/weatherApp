import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../services/service.service';
import {ObjDay} from '../../services/objDay';
import {forkJoin} from 'rxjs';

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
  public dateArr: string[];
  public textErrorMassage: string;


  constructor(public service: ServiceService) {
  }

  ngOnInit() {
    forkJoin(this.service.getData())
      .subscribe((data) => {
        console.log(data[0].weather[0].icon);
        this.mainInfo = data.map((item) => {
          const {name, weather: [{icon}], main: {temp, pressure, humidity, temp_min, temp_max}} = item;
          return new ObjDay(name, icon, pressure, temp, humidity, temp_min, temp_max);
        });
        console.log(this.mainInfo);
        this.ready = true;
      }, err => {
        console.log('HTTP Error', err);
        this.errorMassage = true;
        this.textErrorMassage = err.status === 404 ? `Введите корректное название города` : err.message;
      });
    this.dateArr = this.service.getDate();
  }

  openForm() {
    this.service.openForm();
  }

}
