import { PageMode } from './../../../../shared/models/enums';
import { Contract } from './../../../../shared/models/contract..model';
import { Dictionary } from './../../../../shared/models/dictionary';
import { ContractService } from './../../services/contract.service';
import { EmployeeService } from './../../../admin/services/employee.service';
import { CustomerService } from './../../services/customer.service';
import { environment } from './../../../../../environments/environment';
import { Employee } from 'app/shared/models/employee.model';
import { Customer } from './../../../../shared/models/customer.model';
import { Task } from 'app/shared/models/session.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'app/modules/admin/services/project.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Project } from 'app/shared/models/project.model';
import { MatDrawer } from '@angular/material/sidenav';
import { CaseService } from '../../services/case.service';
import { ContractEmployee } from 'app/shared/models/contract.employee.model';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateContractCommand } from '../../models/createContractCommand';
import { AddPageBase } from 'app/modules/admin/models/add-page-base';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.scss']
})
export class AddContractComponent extends AddPageBase implements OnInit {
  serverUrl = environment.imageUrl;
  @Input()
  pageMode: PageMode = PageMode.Add;

  @Input()
  set contract(value: Contract) {
    if (value == null)
      return;
    this.pageMode = PageMode.Update;
    this.customer.id = value.taskModel.customerId;
    this.loadCustomer();
    this.form.get("projectId").setValue(value.projectModels.find(x => x.parentId == null).id);
    this.form.get("projectSubItems").setValue(value.projectModels.filter(x => x.parentId != null).map(x => x.id));
    this.form.get("descriptions").setValue(value.descriptions);
    this.involvedEmployee = value.involvedEmployees;

  }

  @ViewChild('matDrawer', { static: true }) protected matDrawer: MatDrawer;

  public drawerMode: 'side' | 'over';
  public addVisible = false;

  task: Task = <Task>{};//to store taskId and caseId param
  customer: Customer = <Customer>{ personModel: {} };//to store customerId param;
  projects: Project[];
  allProjects: Project[];
  involvedEmployee: ContractEmployee[];
  selectedProject: Project;
  form: FormGroup;
  empForm: FormGroup;
  filteredOptions: Observable<Employee[]>;
  allEmployee: Employee[];

  constructor(
    private contractService: ContractService,
    private projectService: ProjectService,
    private caseService: CaseService,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fuseConfirmationService: FuseConfirmationService,
    private _location: Location) {
    super(fuseConfirmationService);



    //Create Project Form
    this.form = this.formBuilder.group({
      projectId: [0, Validators.required],
      projectSubItems: [[], Validators.required],
      descriptions: ['', Validators.required],
    });
    this.form.controls.projectId?.valueChanges.subscribe(id => {
      console.log(id);
      this.selectedProject = this.allProjects.filter(x => x.id == id)[0];
    });
    //Create Employee Search Form
    this.empForm = this.formBuilder.group({
      employeeFullName: [],
    });
  }

  ngOnInit(): void {
    if (this.pageMode == PageMode.Add) {
      this.customer.id = Number(this.route.snapshot.paramMap.get('customerId'));
      this.task.id = Number(this.route.snapshot.paramMap.get('taskId'));
      this.task.caseId = Number(this.route.snapshot.paramMap.get('caseId'));
      this.initCommonData();
    }
    this.projectService.getAll(100, 0, '').subscribe(result => {
      this.projects = result.data.filter(x => x.parentId == null);
      this.allProjects = result.data;
    });
  }

  initCommonData() {
    this.loadCustomer();

    this.caseService.GetAllInvolved(this.task.caseId).subscribe(result => {
      this.involvedEmployee = result.data as ContractEmployee[];
    });

    this.employeeService.getAll().subscribe((result) => {
      this.allEmployee = result.data;
      this.searchPerson();

    });
  }

  loadCustomer() {
    this.customerService.getById(this.customer.id).subscribe(result => {
      // console.log(result);
      this.customer = result;
    });
  }

  editCustomer() {
    this.addVisible = true;
  }

  removeInvolved(index: number) {
    this.involvedEmployee[index].isDeleted = !this.involvedEmployee[index].isDeleted;
  }

  save() {
    if (!this.form.valid) {
      this.validationErrorDialog();
      return;
    }

    var dict = {}
    this.involvedEmployee.forEach((el) => dict[String(el.id)] = el.amount);

    let command = <CreateContractCommand>{
      taskId: this.task.id,
      descriptions: this.form.get('descriptions').value,
      caseId: this.task.caseId,
      attachmentsUrl: [],
      projectsId: [this.selectedProject.id, ...this.form.get('projectSubItems').value],
      involvedEmployeesCommision: dict
    }
    this.saving = true;
    this.contractService.add(command).subscribe(result => {
      this.saving = false;
      this.router.navigate([`/contracts`]);
    });
  }

  cancel() {
    this.onClose.emit(false);
  }


  public closeAdd(result: boolean) {
    this.addVisible = false;
    if (result)
      this.loadCustomer();
  }

  searchPerson() {
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

}
