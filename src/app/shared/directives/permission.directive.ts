
import { Directive, HostListener, HostBinding, ElementRef, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { UserService } from "app/core/user/user.service";

@Directive({
    selector: "[hasPermission]"
})
export class PermissionDirective {
    private logicalOp = 'AND';
    private permissions = [];
    private isHidden = true;

    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private userService: UserService
    ) {
    }

    @Input()
    set hasPermission(val) {
        this.permissions = val;
        this.updateView();
    }

    @Input()
    set hasPermissionOp(permop) {
        this.logicalOp = permop;
        this.updateView();
    }

    private updateView() {
        if (this.checkPermission()) {
            if (this.isHidden) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.isHidden = false;
            }
        } else {
            this.isHidden = true;
            this.viewContainer.clear();
        }
    }


    private checkPermission() {
        let hasPermission = false;

        if (this.userService.currentUser) {
            for (const checkPermission of this.permissions) {
                const permissionFound = this.userService.currentUser.permissions.find(x => x.toUpperCase() === checkPermission.toUpperCase());

                if (permissionFound) {
                    hasPermission = true;

                    if (this.logicalOp === 'OR') {
                        break;
                    }
                } else {
                    hasPermission = false;
                    if (this.logicalOp === 'AND') {
                        break;
                    }
                }
            }
        }

        return hasPermission;
    }
}