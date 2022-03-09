import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FuseConfirmationConfig, FuseConfirmationService } from "@fuse/services/confirmation";
import { PageMode } from "app/shared/models/enums";

@Component({
    template: ''
})
export abstract class AddPageBase {
    validationDialogConfig = <FuseConfirmationConfig>{
        title: 'خطای اعتبار سنجی',
        message: 'لطفا تمام موارد ستاره دار را پر نمایید',
        icon: {
            show: true,
            name: 'heroicons_outline:exclamation',
            color: 'warn',
        },
        actions: {
            confirm: {
                show: true,
                label: 'تایید',
                color: 'primary',
            },
            cancel: {
                show: false,
                label: 'خیر',
            },
        },
        dismissible: false
    };
    //---To use in html
    public PageMode = PageMode;

    /* ---------- OnClose for save(with result=true) and cancel(with result=false) ---------------- */
    @Output()
    onClose = new EventEmitter<boolean>();

    pageMode: PageMode = PageMode.Add;
    saving = false;
    form: FormGroup;

    constructor(private _fuseConfirmationService: FuseConfirmationService,) {

    }


    @Input()
    set updateItem(value: any) {

        if (value != null) {
            this.pageMode = PageMode.Update;
            this.form.reset(value);

        }
        else
            this.pageMode = PageMode.Add;
    }

    abstract save();

    cancel() {
        this.onClose.emit(false);
    }

    validationErrorDialog(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {

            const dialogRef = this._fuseConfirmationService.open(this.validationDialogConfig);
            dialogRef.afterClosed().subscribe((result) => {
                if (result == 'confirmed')
                    resolve(true);

            });
        });
    }
}