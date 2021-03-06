import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { ApiServiceService } from '../Services/api-service.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatAutocompleteTrigger, MatOptionSelectionChange } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})

export class DataFormComponent implements OnInit {

  @ViewChild('f') myNgForm;

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
  showOtherCity: boolean;
  pwd: string;
  today: Date;
  selectedCountry: any;

  constructor(
    public FB: FormBuilder,
    public api: ApiServiceService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {
    this.api.isAuthenticate = false;
    // this.today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  }

  ngOnInit() {
    this.dataForm = this.FB.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['Male', Validators.required],
      mobile: ['', Validators.pattern('[6789][0-9]{9}')],
      email: ['', Validators.email],
      country: ['', Validators.required],
      other_country: [''],
      other_city: [''],
      city: ['', Validators.required],
      education_affiliation: [false],
      password: [localStorage.getItem('pwd'), Validators.required]
    })
    console.log('this.dataForm.controls.city.value', this.dataForm.controls.city.value);
    this.loadCities();
    this.filteredOptions = this.dataForm.controls.city.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value != null ? value.toLowerCase() : value;
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  reset() {
    this.myNgForm.resetForm();
    this.dataForm.controls.gender.setValue('Male');
    this.dataForm.controls.country.setValue(this.countries[this.countries.indexOf('India')]);
    this.dataForm.controls.city.setValue(this.options[this.options.indexOf('Ahmedabad')]);
    this.dataForm.controls.other_country.setValue('');
    this.dataForm.controls.other_city.setValue('');
    this.options = this.cityData[this.countries[this.countries.indexOf('India')]];
    this.showOtherCity = false;
    this.showOtherCountry = false;
    this.dataForm.controls.education_affiliation.setValue(false);
    this.dataForm.controls.email.setValue('');
  }

  loadCities() {
    this.api.getRequest('/collect/center_master/').subscribe((res: any) => {
      console.log(res.data);
      this.cityData = res.data;
      for (var key in res.data) this.countries.push(key);
      this.dataForm.controls.country.setValue(this.countries[this.countries.indexOf('India')]);
      this.options = this.cityData[this.countries[this.countries.indexOf('India')]];
      this.dataForm.controls.city.setValue(this.options[this.options.indexOf('Ahmedabad')]);
    }, err => {
      console.log('Error in CountryMaster', err)
    });
  }

  countryChange() {
    this.dataForm.controls.city.setValue('');
    if (this.dataForm.controls.country.value == 'other') {
      this.showOtherCountry = true;
      this.dataForm.controls.city.setValue('Rest of India');
      this.showOtherCity = true;
      this.dataForm.controls.other_city.setValidators(Validators.required);
      this.dataForm.controls.other_country.setValidators(Validators.required);
    } else {
      this.dataForm.controls.other_city.clearValidators();
      this.dataForm.controls.other_country.clearValidators();
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
      this.dataForm.controls.other_city.setValue('');
      this.showOtherCountry = false;
    }
  }

  checkCity() {
    console.log(this.dataForm.controls.city.value);
    if (this.dataForm.controls.city.value == 'Rest of India') {
      this.showOtherCity = true;
    } else {
      this.showOtherCity = false;
      this.dataForm.controls.other_city.clearValidators();
    }
  }

  blurCity() {
    console.log(this.dataForm.controls.city.value);
    console.log(this.options.indexOf(this.dataForm.controls.city.value))
    if (this.options && this.dataForm.controls.city.value && this.options.indexOf(this.dataForm.controls.city.value) < 0 && this.dataForm.controls.city.value !== 'Rest of India') {
      this.dataForm.controls.city.setErrors(Validators.maxLength);
    }
  }

  cityChange() {
    this.otherCityChange ? this.otherCityChange = false : this.otherCityChange = true;
  }

  education() {
    if (this.dataForm.controls.education_affiliation.value == false) {
      this.dataForm.controls.education_affiliation.setValue(true);
    } else {
      this.dataForm.controls.education_affiliation.setValue(false);
    }
  }

  submit() {
    this.spinner.show();
    console.log(this.dataForm.controls.email.value, this.dataForm.controls.mobile.value)
    if (this.dataForm.controls.mobile.value) {
      this.dataForm.controls.email.clearValidators();
    } else if (this.dataForm.controls.email.value) {
      this.dataForm.controls.mobile.clearValidators();
    }
    if (this.dataForm.controls.email.value && this.dataForm.controls.mobile.value) {
    } else {
      this.dataForm.controls.mobile.setValidators(Validators.required);
    }
    this.dataForm.controls.password.setValue(localStorage.getItem('pwd'));
    console.log(this.dataForm.value);
    if (this.dataForm.valid) {
      console.log('valid');
      this.api.postRequest('/collect/users/', this.dataForm.value).subscribe((res: any) => {
        console.log('Successfully sended ', res);
        this.snackBar.open('Successfully Send !!', 'Okay', {
          duration: 5000,
        });
        this.reset();
        this.spinner.hide();
      }, err => {
        this.snackBar.open('There was an error please try again !!', 'Okay', {
          duration: 5000,
        });
        console.log('Error: ', err);
        this.spinner.hide();
      });
    } else {
      console.log('Invalid');
      console.log(this.dataForm.controls);
      this.spinner.hide();
    }
  }

  login() {
    const dialogRef = this.dialog.open(PasswordComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
})
export class PasswordComponent implements OnInit {

  password: string;
  today: Date;

  constructor(public dialogRef: MatDialogRef<PasswordComponent>, public api: ApiServiceService, ) { }

  ngOnInit() {
  }

  checkPassword() {
    if (this.password == 'test123') {
      this.api.isAuthenticate = true;
      localStorage.setItem('pwd', this.password);
      this.onNoClick();
    } else {
      console.log('Before ', this.password);
      this.today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      for (let i = 0; i < password.length; i++) {
        const element = password[i];
        if (element.date.getTime() == this.today.getTime()) {
          console.log('Date ', this.password);
          if (this.password == element.password) {
            console.log('correct ', this.password);
            localStorage.setItem('pwd', this.password);
            this.api.isAuthenticate = true;
            this.onNoClick();
            break;
          }
        }
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  login() {
    this.api.isAuthenticate = true;
  }

}

const password = [
  { date: new Date(2018, 10, 8), password: "eintag" },
  { date: new Date(2018, 10, 16), password: "twopair" },
  { date: new Date(2018, 10, 17), password: "companythree" },
  { date: new Date(2018, 10, 18), password: "fantasticfour" },
  { date: new Date(2018, 10, 19), password: "fivetofive" },
  { date: new Date(2018, 10, 20), password: "sixthsense" },
  { date: new Date(2018, 10, 21), password: "wonderofseven" },
  { date: new Date(2018, 10, 22), password: "the8member" },
  { date: new Date(2018, 10, 23), password: "gems9gems" },
  { date: new Date(2018, 10, 24), password: "dustendus" },
  { date: new Date(2018, 10, 25), password: "tenplusone" },
];
