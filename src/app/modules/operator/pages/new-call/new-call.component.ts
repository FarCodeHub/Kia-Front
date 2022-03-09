import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Communication } from 'app/shared/models/communication.model';
import { CallService } from './../../services/call.service';
import { Question } from './../../../../shared/models/question.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BaseValue } from 'app/shared/models/base-value.model';
import { Customer } from 'app/shared/models/customer.model';
import { Task } from 'app/shared/models/session.model';
import { SessionSurvey } from '../../models/session-survey.model';
import { EndTaskCommand } from '../../models/endTaskCommand';
import { FuseAlertType } from '@fuse/components/alert';
import { GlobalService } from 'app/shared/services/global.service';
import { CustomerService } from 'app/modules/admin/services/customer.service';
import { CountryDivisionService } from 'app/modules/admin/services/country-division.service';
import { CountryDivision } from 'app/shared/models/country-division';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { EmployeeService } from 'app/modules/admin/services/employee.service';
import { Employee } from 'app/shared/models/employee.model';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-new-call',
  templateUrl: './new-call.component.html',
  styleUrls: ['./new-call.component.scss']
})
export class NewCallComponent implements OnInit {

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: 'با موفقیت ثبت شد'
  };

  isDateTime: boolean = false;
  isDescriptions: boolean = false;
  isEmployee: boolean = false;

  hoursTime: number[] = [];
  minutesTime: number[] = [0, 15, 30, 45]


  showAlert: boolean = false;
  saving: boolean = false;
  task: Task;
  form: FormGroup;
  selectTaskForm: FormGroup;
  customer: Customer;
  call: Communication = <Communication>{ typeBaseUniqueName: "incomingCall" };
  questions: Question[];
  resultTypes: BaseValue[];
  genders: BaseValue[];

  provinces: any[];
  allCities: CountryDivision[];
  resultId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private callService: CallService,
    private _formBuilder: FormBuilder,
    private customerService: CustomerService,
    private countryDivision: CountryDivisionService,
    private globalService: GlobalService,
    private _matDialog: MatDialog,
    private router: Router,
    private _location: Location,
    private _fuseConfirmationService: FuseConfirmationService,
    private employeeService: EmployeeService) {
    for (let i = 0; i < 24; i++)
      this.hoursTime.push(i);



    //Get ResultType of sessions
    const word = "consultant";
    const match = new RegExp(`\\b${word}\\b`)
    this.resultTypes = this.globalService.getBaseValue("resultTypes")
      .filter(x => match.test(x.value.toLowerCase()));

    //Deliver Signal
    const signalId = this.activatedRoute.snapshot.paramMap.get('signalId');
    this.callService.deliverSignal(signalId).subscribe();

    this.genders = this.globalService.getBaseValue("gender");

    //Load Country Devisions
    this.countryDivision.getAllCities().subscribe(result => {
      this.allCities = result;
      this.provinces = this.allCities.filter(item => item.parentId == null);
      this.provinces.forEach(p => p.cities = this.allCities.filter(cd => cd.parentId == p.id))

    });

    this.form = this._formBuilder.group({

      firstName: ['', { updateOn: 'blur' }],
      lastName: ['', { updateOn: 'blur' }],
      genderBaseId: [, { updateOn: 'blur' }],
      zipCodeId: [, { updateOn: 'blur' }],
    });

  }

  ngOnInit(): void {
    //this.employeeService.getAll().subscribe(items => this.employees = items.data);

    this.activatedRoute.data.subscribe((data: { intialData: any[] }) => {
      this.task = data.intialData[0];
      //if task already ended prevent to display
      if (this.task.endAt != null) {
        this.showDialog();
        return;
      }
      this.customerService.get(this.task.customerId).subscribe(result => {
        this.customer = result;
        this.form.reset(this.customer.personModel);
        this.form.valueChanges.subscribe(v => {
          let command = this.form.getRawValue();
          command.id = this.task.customerId;
          this.customerService.update(command)
            .subscribe((result) => {

            });
        });
      })
    });
    this.selectTaskForm = this._formBuilder.group({
      duaAt: '',
      //  assignToEmployeeId:null,
      hours: 0,
      minutes: 0,
      descriptions: ''
    });
  }

  showDialog() {
    const dialogConfig = <FuseConfirmationConfig>{
      title: ' عدم دسترسی',
      message: 'این تسک قبلا به اتمام رسیده و امکان ورود مجدد به آن وجود ندارد',
      icon: {
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warning',
      },
      actions: {
        confirm: {
          show: true,
          label: 'تایید',
          color: 'primary',
        },
        cancel: {
          show: false,

        },
      },
      dismissible: false
    };

    const dialogRef = this._fuseConfirmationService.open(dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this._location.back();
    });
  }

  searchCountryDivision(term: string) {
    let filteredCities = this.allCities.filter(item => item.title.indexOf(term) > -1);
    let parentIds = filteredCities.map(x => x.parentId);

    this.provinces = this.allCities.filter(item => item.parentId == null && parentIds.indexOf(item.id) > -1);
    this.provinces.forEach(p => p.cities = filteredCities.filter(cd => cd.parentId == p.id))
  }


  save() {
    let answers: SessionSurvey[] = [];
    let date = new Date(this.selectTaskForm.get('duaAt').value);
    date.setHours(this.selectTaskForm.get('hours').value);
    date.setMinutes(this.selectTaskForm.get('minutes').value);
    this.questions.forEach(q => {
      if (q.answer != null)
        answers.push(<SessionSurvey>{
          taskId: this.task.id,
          questionId: q.id,
          answerId: (q.answerTypeBaseUniqueName == 'option' ? q.answer : null) as number,
          answer: q.answerTypeBaseUniqueName == 'text' ? q.answer : null,

        });
    });
    let endTaskCommand = <EndTaskCommand>{
      taskId: this.task.id,
      resultBaseId: this.resultId,
      communicationId: this.task.communicationId,
      dueAt: date,
      saveChanges: true,
      sessionSurveyCreateModels: answers,
      descriptions: this.selectTaskForm.get('descriptions').value,
      // assignToEmployeeId : this.selectTaskForm.get('assignToEmployeeId').value,

    }
    this.saving = true;

    this.callService.end(endTaskCommand).subscribe(x => {

      // Show the alert
      this.saving = false;
      this.showAlert = true;
      this.router.navigate([`/cases`]);
    });
  }



  setDetail(data) {
    let item = this.resultTypes.find(x => x.id == data.value);
    this.isDateTime = false
    this.isDescriptions = false
    this.isEmployee = false

    if (item.uniqueName == "follow" ||
      item.uniqueName == "requestAppointment" ||
      item.uniqueName == "requestApplyToVisitTheLand" ||
      item.uniqueName == "confirmAppointment" ||
      item.uniqueName == "confirmReference" ||
      item.uniqueName == "confirmApplyToVisitTheLand")
      this.isDateTime = true

    if (item.uniqueName == "requestCancel" ||
      item.uniqueName == "confirmCancel" ||
      item.uniqueName == "sendToBlackList" ||
      item.uniqueName == "cancleContract" ||
      item.uniqueName == "requestReference" ||
      item.uniqueName == "confirmReference")
      this.isDescriptions = true

    if (item.uniqueName == "confirmAppointment" ||
      item.uniqueName == "confirmApplyToVisitTheLand" ||
      item.uniqueName == "confirmReference")
      this.isEmployee = true

  }
}
