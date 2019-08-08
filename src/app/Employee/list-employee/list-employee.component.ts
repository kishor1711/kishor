import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.serive';
import { IEmployee } from '../IEmployee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees: IEmployee[];
  constructor(private employeeSerive: EmployeeService, private route: Router) { }
  ngOnInit() {
    this.employeeSerive.getEmployee().subscribe((listEmployees) => this.employees = listEmployees,
    );
    console.log(this.employees);
  }

  editButtonClick(employeeId: number) {
    this.route.navigate(['/edit', employeeId]);
  }

}
