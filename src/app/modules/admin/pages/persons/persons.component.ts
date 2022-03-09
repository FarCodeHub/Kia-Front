
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Person } from 'app/shared/models/person.model';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {


  personForm: FormGroup;
  personModel: Person = <Person>{
    firstName: "",
    lastName: "",
    birthDate: new Date(),
    nationalCode: "",
    genderBaseId: 1,
    address: ""
  };

  constructor() {
    let group = {};
    console.log(JSON.stringify((this.personModel)));
    Object.keys(this.personModel).forEach(property => group[property] = new FormControl());
    this.personForm = new FormGroup(group);

  }

  ngOnInit(): void {
  }

}
