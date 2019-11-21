import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ServiceService} from '../../services/service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    public service: ServiceService,
  ) {
    this.myForm = new FormGroup({
      city: new FormControl('', Validators.required),
      day: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }


  submit() {
    this.service.takeNameCity(this.myForm.value);

    this.openMain();
  }


  openMain() {
    this.service.openMain();
  }
}
