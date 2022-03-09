import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'app/core/base/loader.service';
import { PageMode } from 'app/shared/models/enums';
import { UserService } from 'app/core/user/user.service';
import { CreateUserCommand } from '../../models/command/create-user-command';
import { UserAdminService} from '../../services/user.service';
import { User } from 'app/shared/models/user.model';
import { Employee } from 'app/shared/models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { UploadFileService } from '../../services/upload-file.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { of } from 'rxjs';
import { CreateEmployeeCommand } from '../../models/command/create-employee-command';
import { PersonService } from '../../services/person.service';
import { Person } from 'app/shared/models/person.model';
import { UpdatePersonAvatarCommand } from '../../models/command/update-person-avatar-command';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    public PageMode = PageMode;
    /* ---------- OnClose for save(with result=true) and cancel(with result=false) ---------------- */
    @Output()
    onClose = new EventEmitter<boolean>();
    pageMode: PageMode = PageMode.Update;
    saving = false;
    form: FormGroup;
    isLoading: boolean = false;
    hide = true;
    user:User;
    employee : Employee;
   // person:Person;

   // employeeAddCommand : CreateEmployeeCommand ;
   updatePersonAvatarCommand : UpdatePersonAvatarCommand =<UpdatePersonAvatarCommand>{

        id:0,
        profilePhotoUrl: '',
     saveChanges:true

    };

    usersAddCommand: CreateUserCommand = {
        password: '',
        username: '',
        personId: 0,
        rolesIdList: [],
        saveChanges: false,
        newPassword:'',
        id: 0,
    };

    uploadedFile: { progressStatus: '' | 'in-progress' | 'uploaded', progress: number, filePath: string, fullFilePath: string, extention: string } = {
        progressStatus: '',
        progress: 0,
        filePath: '',
        fullFilePath: '',
        extention: '',
      };

  constructor( private _formBuilder: FormBuilder,
    public loaderService: LoaderService,
    private userAdminService: UserAdminService,
    private userService:UserService,
    private personService:PersonService,
    private employeeService:EmployeeService,private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
        password: '',
        username: '',
        newPassword:'',
        profilePhotoUrl:'',
     //   rolesIdList: [[], Validators.required],
        saveChanges: true,
     //   personName: ['', Validators.required],

    });
this.user = this.userService.currentUser;

this.employeeService.get(this.user.employeeId).subscribe(item =>{


    this.employee = item;
    this.uploadedFile.fullFilePath = `${environment.imageUrl}` + "/" + this.employee.personModel.profilePhotoUrl;
  //  this.employeeAddCommand.id = this.employee.id;
    this.updatePersonAvatarCommand.id = this.employee.personModel.id;
    this.updatePersonAvatarCommand.profilePhotoUrl = this.employee.personModel.profilePhotoUrl;
});

this.form.controls['username'].setValue(this.user.username);




  }

  removeAvatar() {
    this.form.controls['profilePhotoUrl'].setValue('');
    this.uploadedFile = {
      progressStatus: '',
      progress: 0,
      filePath: '',
      fullFilePath: '',
      extention: '',
    };
  }
  uploadAvatar(file) {
    let formData = new FormData();
    formData.set('file', file);

    this.uploadedFile.progressStatus = 'in-progress';
    this.uploadFileService
      .upload(formData)
      .pipe(map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.uploadedFile.progress = Math.round(
              (event.loaded * 100) / event.total
            );
            break;
          case HttpEventType.Response:
            let fileName = event.body.objResult;
            this.form.controls['profilePhotoUrl'].setValue(fileName);
            this.uploadedFile.extention = fileName.split(".")[1].toUpperCase();
            this.uploadedFile.filePath = fileName;
            this.uploadedFile.fullFilePath = `${environment.imageUrl}` + "/" + fileName;
            this.uploadedFile.progressStatus = 'uploaded';
            this.updatePersonAvatarCommand.profilePhotoUrl = fileName;

            this.personService.updateAvatar(this.updatePersonAvatarCommand).subscribe(item=>{


            })
            // this.employeeService.update(this.employeeAddCommand).subscribe(item=>{

            // });


            // console.log("File Uploaded" + this.extentionFile + " " + fileName);
            return fileName;
        }
      }),
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          return of(`${file.data.name} upload failed.`);
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          console.log(event.body);
        }
      });
  }


  save() {
    if (this.form.valid) {
        /* ---------- change form value to model ---------------- */
        const id = this.user.id;
        this.usersAddCommand = <CreateUserCommand>this.form.getRawValue();
        this.usersAddCommand.id = id;
        this.usersAddCommand.saveChanges = true;
     //   this.usersAddCommand.

        //--------set saving----
        this.saving = true;

            this.userAdminService
                .updateUserSetting(this.usersAddCommand)
                .subscribe((result) => {
                    //--------finish and close the page----
                    this.saving = false;
                    this.onClose.emit(true);
                });

    }
}
cancel() {

}

}
