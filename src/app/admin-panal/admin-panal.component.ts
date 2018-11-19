import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { ApiServiceService } from '../Services/api-service.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-admin-panal',
  templateUrl: './admin-panal.component.html',
  styleUrls: ['./admin-panal.component.css']
})
export class AdminPanalComponent implements OnInit {

  displayedColumns = ['id', 'name', 'age', 'mobile', 'email', 'country', 'city', 'education_affiliation'];
  dataSource: MatTableDataSource<UserData>;
  userDetail: any;
  users: UserData[] = [];
  statistics;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public api: ApiServiceService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllData();
    this.getStaticstics();
  }

  getAllData() {
    this.api.getRequest('/collect/users/').subscribe((data: any) => {
      this.users = [];
      console.log('userList', data);
      this.userDetail = data;

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        this.users.push({
          id: index + 1,
          name: element.name,
          age: element.age,
          mobile: element.mobile ? element.mobile : '',
          email: element.email ? element.email : '',
          country: element.country == 'other' ? element.other_country + ' (other)' : element.country,
          city: element.city == 'Rest of India' ? element.other_city + ' (other)' : element.city,
          education_affiliation: element.education_affiliation
        });
      }

      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getStaticstics() {
    this.api.getRequest('/collect/date_wise_stats/').subscribe((data: any) => {
      this.statistics = data.stats;
    }, err => {
      console.log('Error to get Statistics: ', err);
    });
  }

  refresh() {
    this.getAllData();
  }

  export() {
    var options = {
      headers: ['Id', 'Name', 'Age', 'Mobile', 'Email', 'Country', 'City', 'Education Affiliation']
    };
    new Angular5Csv(this.users, 'VisitorsData', options);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}

// 'id', 'name', 'age', 'mobile', 'email', 'country', 'city', 'education_affiliation'
export interface UserData {
  id: number;
  name: string;
  age: string;
  mobile: number;
  email: number;
  country: number,
  city: number,
  education_affiliation: number;
}