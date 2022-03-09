import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'app/modules/admin/services/employee.service';
import { ContractEmployee } from 'app/shared/models/contract.employee.model';
import { Employee } from 'app/shared/models/employee.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CaseService } from '../../services/case.service';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-add-comision',
  templateUrl: './add-comision.component.html',
  styleUrls: ['./add-comision.component.scss']
})
export class AddComisionComponent implements OnInit {

  @Input()
  caseId: number;

  allEmployee: Employee[];
  involvedEmployee: ContractEmployee[];
  filteredOptions: Observable<Employee[]>;
  empForm: FormGroup;

  constructor(private contractService: ContractService,
    private formBuilder: FormBuilder,
    private caseService: CaseService,
    private employeeService: EmployeeService,) {
    this.empForm = this.formBuilder.group({
      employeeFullName: [],
    });
  }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((result) => {
      this.allEmployee = result.data;
      this.searchPerson();

    });
    this.caseService.GetAllInvolved(10027).subscribe(result => {
      this.involvedEmployee = result.data as ContractEmployee[];

    });
  }

  searchPerson() {
    // this.filteredOptions = this.empForm.get('employeeFullName')?.valueChanges
    //   .pipe(
    //     startWith<string | Employee>(''),
    //     debounceTime(400),
    //     distinctUntilChanged(),
    //     switchMap(val => {
    //       return typeof val === 'string' ? this._filter(val) : this._filter(val.personModel.fullName);
    //     }),
    //   );
    this.filteredOptions = this.empForm.get('employeeFullName')?.valueChanges.pipe(
      startWith<string | Employee>(''),
      map((value) => {
        if (typeof value === 'string') {
          return value;
        } else {
          let newEMp = <ContractEmployee>{
            isDeleted: false,
            isNew: true,
            id: value.id,
            amount: 0,
            employeeId: value.id,
            employeeFullName: value.personModel.fullName,
            unitPositionTitle: value.unitPositionTitle
          };
          this.involvedEmployee.push(newEMp);

          return value.personModel.fullName + " | " + value.unitPositionTitle;
        }
      }),
      map((name) => {
        return name ? this._filter(name) : this.allEmployee.slice();
      })
    );
  }

  displayFn(user: Employee): string {
    return user && user.personModel.fullName ? user.personModel.fullName : '';
  }

  private _filter(name: string): Employee[] {
    const filterValue = name.toLowerCase();

    return this.allEmployee.filter((option) =>
      option.personModel.fullName.toLowerCase().includes(filterValue)
    );
  }


  removeInvolved(index: number) {
    this.involvedEmployee[index].isDeleted = !this.involvedEmployee[index].isDeleted;
  }
}
