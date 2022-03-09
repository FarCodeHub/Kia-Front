import { FormGroup } from '@angular/forms';
export interface ValueChanged {
    fieldName: string;
    form: FormGroup
}