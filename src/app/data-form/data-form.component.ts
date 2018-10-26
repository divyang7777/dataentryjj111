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
  dataForm: FormGroup;
  countrys = ['India', 'South America', 'North America', 'Africa'];
  citys = ['Surat', 'Ahmedabad', 'kenya', 'london', 'canada'];
  otherCountryChange = false;
  otherCityChange = false;

  constructor(
    public FB: FormBuilder,
  ) {
    this.dataForm = this.FB.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      number: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  countryChange() {
    this.otherCountryChange ? this.otherCountryChange = false : this.otherCountryChange = true;
  }

  cityChange(){
    this.otherCityChange ? this.otherCityChange = false : this.otherCityChange = true;
  }

  showForm() {
    this.showDataForm = true;
  }

  submit(){
    
  }

}
