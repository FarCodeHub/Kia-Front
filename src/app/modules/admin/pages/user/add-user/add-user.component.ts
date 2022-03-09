/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable arrow-parens */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { LoaderService } from 'app/core/base/loader.service';
import { CreateUserCommand } from 'app/modules/admin/models/command/create-user-command';
import { CrudBase } from 'app/modules/admin/models/CrudBase';
import { PermissionService } from 'app/modules/admin/services/permission.service';
import { PersonService } from 'app/modules/admin/services/person.service';
import { RoleService } from 'app/modules/admin/services/role.service';
import { UserAdminService } from 'app/modules/admin/services/user.service';
import { PageMode } from 'app/shared/models/enums';
import { PagedList } from 'app/shared/models/paged-list';
import { Permission } from 'app/shared/models/permission.model';
import { Person } from 'app/shared/models/person.model';
import { Role } from 'app/shared/models/role.model';
import { User } from 'app/shared/models/user.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
    public PageMode = PageMode;
    /* ---------- OnClose for save(with result=true) and cancel(with result=false) ---------------- */
    @Output()
    onClose = new EventEmitter<boolean>();
    pageMode: PageMode = PageMode.Add;
    saving = false;

    @Output()
    UpdateGrid: EventEmitter<User> = new EventEmitter();

    hide = true;
    isLoading: boolean = false;
    form: FormGroup;
    persons: Person[];
    selectedPerson: Person;
    filteredOptions: Observable<Person[]>;
    roles$: Observable<Role[]>;
    permissions$: Observable<PagedList<Permission[]>>;
    users$: Observable<PagedList<User[]>>;
    imageUrl: string = `${environment.imageUrl}`

    usersAddCommand: CreateUserCommand = <CreateUserCommand>{
        password: '',
        username: '',
        personId: 0,
        rolesIdList: [],
        saveChanges: false,
        newPassword:''
    };

    @Input()
    set updateItem(value: User) {



        if (value != null) {
            this.form.controls['password'].setValue(value.password);
            this.form.controls['username'].setValue(value.username);
            this.form.controls['rolesIdList'].setValue(value.rolesIdList);
            this.form.controls['personId'].setValue(value.personId);

            this.pageMode = PageMode.Update;
            this.usersAddCommand.id = value.id;
        } else if (this.form != undefined) {
            this.form.reset({ personName: '' });
            this.pageMode = PageMode.Add
        };

    }

    constructor(
        private personService: PersonService,
        private _formBuilder: FormBuilder,
        private roleService: RoleService,
        //    private permissionService: PermissionService,
        private userService: UserAdminService,
        public loaderService: LoaderService
    ) {
        //   this.permissions$ = this.permissionService.getAll();
        this.roles$ = this.roleService.getAll(100, 0).pipe(map((x) => x.data));
    }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            password: ['', Validators.required],
            username: ['', Validators.required],
            rolesIdList: [[], Validators.required],
            saveChanges: true,
            personId: ['', Validators.required],

        });
        this.personService.getAll().subscribe((result) => {
            this.persons = result.data;
            this.searchPerson();
        });
    }

    searchPerson() {
        this.filteredOptions = this.form.get('personId')?.valueChanges.pipe(
            startWith<string | Person>(''),
            map((value) => {
                if (value == null)
                    return "";
                if (typeof value === 'string')
                    return value;
                else if (typeof value === 'number') {
                    this.selectedPerson = this.persons.find(x => x.id == value);
                    return this.selectedPerson.firstName + ' ' + this.selectedPerson.lastName + ' ' + this.selectedPerson.nationalCode;
                }
                else {

                    this.selectedPerson = value;
                    return value.firstName + ' ' + value.lastName + ' ' + value.nationalCode;
                }
            }),
            map((name) => {
                return name ? this._filter(name) : this.persons.slice();
            })
        );
    }


    displayFn(person: Person): string {
        return person && person.fullName ? person.fullName : '';
    }

    private _filter(name: string): Person[] {
        const filterValue = name.toLowerCase();

        return this.persons.filter((option) =>
            option.fullName.toLowerCase().includes(filterValue)
        );
    }

    save() {
        if (this.form.valid) {
            /* ---------- change form value to model ---------------- */
            const id = this.usersAddCommand?.id;
            this.usersAddCommand = <CreateUserCommand>this.form.getRawValue();
            this.usersAddCommand.id = id;
            this.usersAddCommand.personId = this.selectedPerson.id;
            this.usersAddCommand.saveChanges = true;

            //--------set saving----
            this.saving = true;
            if (this.pageMode == PageMode.Add) {
                this.userService
                    .add(this.usersAddCommand)
                    .subscribe((result) => {
                        //--------finish and close the page----
                        this.saving = false;
                        this.onClose.emit(true);
                    });
            } else {
                this.userService
                    .update(this.usersAddCommand)
                    .subscribe((result) => {
                        //--------finish and close the page----
                        this.saving = false;
                        this.onClose.emit(true);
                    });
            }
        }
    }

    setDateReturn(e) {
        console.log(e);
    }

    dpickerFocus(picker) {
        picker.open();
    }

    updateGrid(item) {
        this.UpdateGrid.emit(item);
    }

    cancel() {
        this.onClose.emit(false);
    }
}
