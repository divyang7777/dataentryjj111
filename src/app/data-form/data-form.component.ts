import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  isLinear = true;
  showDataForm: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    public FB: FormBuilder,
  ) { }

  ngOnInit() {
    this.firstFormGroup = this.FB.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.FB.group({
      secondCtrl: ['', Validators.required]
    });
  }

  showForm(){
    this.showDataForm = true;
  }
}
