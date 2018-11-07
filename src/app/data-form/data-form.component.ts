import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../Services/api-service.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  isLinear = true;
  showDataForm: boolean;
  dataForm: FormGroup;
  countries = [];
  cities = [];
  otherCountryChange = false;
  otherCityChange = false;
  data = [];
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  showOtherCountry: boolean;
  cityData: any;

  constructor(
    public FB: FormBuilder,
    public api: ApiServiceService
  ) {
    this.dataForm = this.FB.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      other_country: ['', Validators.compose([this.conditionalRequired()])],
      other_city: ['', Validators.required],
      city: ['', Validators.required],
      education_affiliation: ['', Validators.required],
    })
  }

  // conditionalOCRequired() {
  //   return (): { [s: string]: boolean } => {
  //     if (this.showOtherCountry ) {
  //       console.log('Required')
  //       return { required: true };
  //     } else {
  //       console.log('Not Required')
  //       return { required: false };
  //     }
  //   }
  // }

  conditionalRequired() {
    return (): { [s: string]: boolean } => {
      if (this.showOtherCountry) {
        console.log('Required')
        return { required: true };
      } else {
        console.log('Not Required')
        return { required: false };
      }
    }
  }

  ngOnInit() {
    console.log(this.data);
    this.loadCities();
    this.filteredOptions = this.dataForm.controls.city.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  reset() {
    this.dataForm.reset();
  }

  loadCities() {
    this.api.getRequest('/collect/center_master/').subscribe((res: any) => {
      console.log(res.data);
      this.cityData = res.data;
      for (var key in res.data) this.countries.push(key)
    }, err => {
      console.log('Error in CountryMaster', err)
    });
  }

  countryChange() {
    this.dataForm.controls.city.setValue('');
    if (this.dataForm.controls.country.value == 'other') {
      this.showOtherCountry = true;
    } else {
      this.options = [];
      for (var key in this.cityData) {
        if (key == this.dataForm.controls.country.value) {
          for (let i = 0; i < this.cityData[key].length; i++) {
            const element = this.cityData[key][i];
            this.options.push(element);
          }
        }
      }
      this.dataForm.controls.other_country.setValue('');
      this.showOtherCountry = false;
    }
  }

  cityChange() {
    this.otherCityChange ? this.otherCityChange = false : this.otherCityChange = true;
  }

  radioGender(event) {
    // this.dataForm.value.gender = event.value
    // console.log(this.dataForm.value.gender);
  }

  showForm() {
    this.showDataForm = true;
  }

  submit() {
    console.log(this.dataForm.value);
  }

}
