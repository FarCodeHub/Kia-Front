import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import DataTableColumn, { FieldType } from './data.table.coulmn';
import { ValueChanged } from './value.changed';

@Component({
  selector: 'c-datatable',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  public fieldType = FieldType;
  form!: FormGroup;
  copyMode = false;
  selectedRow?: FormGroup;

  @Input()
  copyPasteRowEnabled: boolean = true;

  columns: DataTableColumn[] = [];

  @Input()
  set dataColumns(value: DataTableColumn[]) {
    this.columns = value;
    if (this.copyPasteRowEnabled)
      this.columns.push(<DataTableColumn>{
        fieldName: "cp-action",
        title: "action",
        editable: true,
        fieldType: FieldType.CopyPasteAction,
        sortable: false,
      });
  }

  @Input()
  dataSource!: any[];

  @Input()
  formRows!: FormArray;
  @Output()
  formRowsChange = new EventEmitter<FormArray>();

  @Output()
  onF = new EventEmitter<any>();

  @Output()
  onItemClick = new EventEmitter<any>();

  @Output()
  onValueChanges = new EventEmitter<ValueChanged>();


  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //create utility container form to contains forms of each row
    const formG = this.mapToAbstractControl(this.dataSource, Validators.max);
    this.form = this._formBuilder.group({
      rows: formG
    });
    this.formRowsChange.emit(this.getRows);
  }

  get getRows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  onItemChange(event: any, form: FormGroup, fieldName: string) {
    console.log("value changed");
    const fieldValue = form.get(fieldName)?.value;
    console.log(fieldValue);
    this.onValueChanges.emit(<ValueChanged>{
      fieldName: fieldName,
      form: form
    });

    this.formRowsChange.emit(this.getRows);

  }

  onClickHandler(item: any) {
    this.onItemClick.emit(item);
  }

  getColumnsProps(): string[] {
    return this.columns.map((column: DataTableColumn) => column.fieldName);
  }

  camelCase(input: string) {
    return input[0].toLowerCase() + input.substring(1);
  }

  mapToAbstractControl(data: any, validators: Validators): AbstractControl {

    if (data != null && !Array.isArray(data) && typeof data === 'object') {

      const formGroupDescription: any = {};
      const keys = Object.keys(data);
      if (keys.length > 0) {
        keys.forEach(key => {
          let column = this.columns.find(x => this.camelCase(x.fieldName) == key);

          if (column?.fieldType == FieldType.Tel)
            validators = Validators.pattern('[- +()0-9]+');
          else if (column?.fieldType == FieldType.Email)
            validators = Validators.email;
          else if (column != null)
            validators = column?.validators;

          formGroupDescription[key] = this.mapToAbstractControl(data[key], validators);
        });
        return new FormGroup(formGroupDescription);
      }
      else
        return new FormControl(data, validators);
    } else if (data != null && Array.isArray(data)) {

      const formArrayDescription: any[] = [];
      data.forEach(elem => {
        formArrayDescription.push(this.mapToAbstractControl(elem, validators));
      });
      return new FormArray(formArrayDescription);

    } else {

      return new FormControl(data, validators);

    }

  }

  onCopy(row: any) {
    this.copyMode = true;
    this.selectedRow = row;
  }

  onCancelCopy() {
    this.copyMode = false;
    this.selectedRow = undefined;
  }

  onPaste(row: FormGroup) {
    for (const field in row.controls) {
      const col = this.columns.find(x => this.camelCase(x.fieldName) == field);
      if (col?.editable) {
        const value = this.selectedRow?.get(field)?.value;
        row.get(field)?.setValue(value);
      }

    }
  }

  onPasteAll() {
    for (let control of this.getRows.controls) {

      if (control instanceof FormGroup) {
        // is a FormGroup  
      }
      if (this.selectedRow != control)
        this.onPaste(control as FormGroup);
    }
  }

}
