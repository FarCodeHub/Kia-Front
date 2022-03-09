import { Component, EventEmitter, Inject, NgModule, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'app/modules/admin/pages/projects/add-project/add-project.component';
import { EmployeeService } from 'app/modules/admin/services/employee.service';
import { EndTaskCommand } from 'app/modules/operator/models/endTaskCommand';
import { SessionSurvey } from 'app/modules/operator/models/session-survey.model';
import { CallService } from 'app/modules/operator/services/call.service';
import { Employee } from 'app/shared/models/employee.model';
import { Task } from 'app/shared/models/session.model';
import { GlobalService } from 'app/shared/services/global.service';


@Component({
  selector: 'app-add-result-dialog',
  templateUrl: './add-result-dialog.component.html',
  styleUrls: ['./add-result-dialog.component.scss']
})
export class AddResultDialogComponent implements OnInit {

  @Output() inboxUpdate: EventEmitter<any> = new EventEmitter()

  selectTaskForm: FormGroup;
  isDateTime: boolean = false;
  isDescriptions: boolean = false;
  isEmployee: boolean = false;
  employees: Employee[];
  hoursTime: number[] = [];
  minutesTime: number[] = [0, 15, 30, 45]
  constructor(private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public matDialogRef: MatDialogRef<AddResultDialogComponent>,
    private callService: CallService,
    private globalService: GlobalService,
    private employeeService: EmployeeService) {
    for (let i = 0; i < 24; i++)
      this.hoursTime.push(i);
  }

  ngOnInit(): void {

    this.employeeService.getAll().subscribe(items => this.employees = items.data);
    this.selectTaskForm = this._formBuilder.group({
      duaAt: new Date(),
      assignToEmployeeId: 0,
      hours: 0,
      minutes: 0,
      descriptions: ''
    });


    this.isDateTime = false
    this.isDescriptions = false
    this.isEmployee = false

    if (this.data.typeBaseUniqueName == "follow" ||
      this.data.typeBaseUniqueName == "requestAppointment" ||
      this.data.typeBaseUniqueName == "requestApplyToVisitTheLand" ||
      this.data.typeBaseUniqueName == "confirmAppointment" ||
      this.data.typeBaseUniqueName == "confirmReference" ||
      this.data.typeBaseUniqueName == "confirmApplyToVisitTheLand")
      this.isDateTime = true

    if (this.data.typeBaseUniqueName == "requestCancel" ||
      this.data.typeBaseUniqueName == "confirmCancel" ||
      this.data.typeBaseUniqueName == "sendToBlackList" ||
      this.data.typeBaseUniqueName == "cancleContract" ||
      this.data.typeBaseUniqueName == "requestReference" ||
      this.data.typeBaseUniqueName == "confirmReference")
      this.isDescriptions = true

    if (this.data.typeBaseUniqueName == "confirmAppointment" ||
      this.data.typeBaseUniqueName == "confirmApplyToVisitTheLand" ||
      this.data.typeBaseUniqueName == "confirmReference")
      this.isEmployee = true;

    if (this.data.typeBaseUniqueName == 'requestCancel')
      this.data.resultBaseId = this.globalService.getBaseValueByUniqueName("confirmCancel").id;
    if (this.data.typeBaseUniqueName == 'confirmCancel')
      this.data.resultBaseId = this.globalService.getBaseValueByUniqueName("cancel").id;

    else if (this.data.typeBaseUniqueName == 'requestAppointment')
      this.data.resultBaseId = this.globalService.getBaseValueByUniqueName("confirmAppointment").id;
    else if (this.data.typeBaseUniqueName == 'confirmAppointment')
      this.data.resultBaseId = this.globalService.getBaseValueByUniqueName("appointment").id;


    else if (this.data.typeBaseUniqueName == 'requestApplyToVisitTheLand')
      this.data.resultBaseId = this.globalService.getBaseValueByUniqueName("confirmApplyToVisitTheLand").id;
    else if (this.data.typeBaseUniqueName == 'confirmApplyToVisitTheLand')
      this.data.resultBaseId = this.globalService.getBaseValueByUniqueName("applyToVisitTheLand").id;

    else if (this.data.typeBaseUniqueName == 'requestReference')
      this.data.resultBaseId = this.globalService.getBaseValueByUniqueName("confirmReference").id;
    else if (this.data.typeBaseUniqueName == 'confirmReference')
      this.data.resultBaseId = this.globalService.getBaseValueByUniqueName("reference").id;


    else if (this.data.typeBaseUniqueName == 'cancleContract')
      this.data.resultBaseId = this.globalService.getBaseValueByUniqueName("resultTypes").id;

  }


  endTask() {
    let answers: SessionSurvey[] = [];
    let date = new Date(this.selectTaskForm.get('duaAt').value);
    date.setHours(this.selectTaskForm.get('hours').value);
    date.setMinutes(this.selectTaskForm.get('minutes').value);


    let endTaskCommand = <EndTaskCommand>{
      taskId: this.data.id,
      resultBaseId: this.data.resultBaseId,
      communicationId: this.data.communicationId,
      dueAt: date,
      saveChanges: true,
      sessionSurveyCreateModels: answers,
      descriptions: this.selectTaskForm.get('descriptions').value,
      assignToEmployeeId: this.selectTaskForm.get('assignToEmployeeId').value,

    }
    //  this.saving = true;

    this.callService.end(endTaskCommand).subscribe(x => {
      this.inboxUpdate.emit(x);
      this.matDialogRef.close();
      // Show the alert

      //  this.router.navigate([`/cases`]);
    });
  }

  close() {
    this.matDialogRef.close();

  }

}
