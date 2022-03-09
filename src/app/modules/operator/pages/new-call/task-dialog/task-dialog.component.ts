import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'app/modules/admin/services/employee.service';
import { EndTaskCommand } from 'app/modules/operator/models/endTaskCommand';
import { CallService } from 'app/modules/operator/services/call.service';
import { Employee } from 'app/shared/models/employee.model';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

    employees:Employee[];
    form : FormGroup;
  constructor(private callService: CallService,
    @Inject(MAT_DIALOG_DATA) public endTaskCommand: EndTaskCommand,
    private _formBuilder : FormBuilder,
    private employeeService:EmployeeService) {
     }

  ngOnInit(): void {

    this.form=this._formBuilder.group({
            descriptions : '',
            dueAt:'',
            employeeId:0,
    })
  }

save(){


    this.callService.end(this.endTaskCommand).subscribe(x => {
        // Set the alert
        // this.alert = {
        //   type: 'error',
        //   message: 'Something went wrong, please try again.'
        // };

        // Show the alert
    //    this.saving = false;
    //    this.showAlert = true;
      });


}



}
