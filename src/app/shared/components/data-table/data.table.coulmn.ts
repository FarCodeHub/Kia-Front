import { Validators } from '@angular/forms';
export default interface DataTableColumn {
    fieldName: string;
    title: string;
    editable: boolean;
    fieldType: FieldType;
    itemsSource: DataDropDown;
    validators: Validators,
    sortable: boolean,
    icon: string
}

export interface DataDropDown {
    displayFieldName: string;
    valueFieldName: string;
    enabledFieldName: string | null;
    items: any[]
}

export enum FieldType {
    Text,
    Time,
    Date,
    Tel,
    Email,
    CheckBox,
    DropDown,
    CopyPasteAction
}

