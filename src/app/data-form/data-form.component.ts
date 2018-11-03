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
  // countrys = ['India', 'South America', 'North America', 'Africa'];
  countrys = [];
  citys = ['Surat', 'Ahmedabad', 'kenya', 'london', 'canada'];
  otherCountryChange = false;
  otherCityChange = false;
  data = [
    {
      "country": "India",
      "city": "Ahmedabad"
    },
    {
      "country": "India",
      "city": "Anand"
    },
    {
      "country": "India",
      "city": "Ankleshwar"
    },
    {
      "country": "India",
      "city": "Bharuch"
    },
    {
      "country": "Australia",
      "city": "Australia_1"
    },
    {
      "country": "Australia",
      "city": "Polo"
    },
    {
      "country": "UAE",
      "city": "Sahara"
    },
    {
      "country": "UAE",
      "city": "Saudi"
    }];


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
    console.log(this.data);
    // this.countrys = this.data.map(data =>
    //   console.log(data.country.length)
    // );

    for (let i = 0; i < this.data.length; i++) {
      this.countrys.push(i);
      // if (i !== this.countrys[i-1]) {
      //   this.countrys.pop()        
      // }
    }
    console.log(this.countrys);

  }

  countryChange() {
    this.otherCountryChange ? this.otherCountryChange = false : this.otherCountryChange = true;
  }

  cityChange() {
    this.otherCityChange ? this.otherCityChange = false : this.otherCityChange = true;
  }

  radioGender(event) {
    this.dataForm.value.gender = event.value
    console.log(event, this.dataForm.value.gender);
  }

  showForm() {
    this.showDataForm = true;
  }

  submit() {
    console.log(this.dataForm);
  }

}
