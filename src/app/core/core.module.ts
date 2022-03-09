import { MatTreeModule } from '@angular/material/tree';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthModule } from 'app/core/auth/auth.module';
import { IconsModule } from 'app/core/icons/icons.module';
import { TranslocoCoreModule } from 'app/core/transloco/transloco.module';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CanDeactivateGuard } from './auth/guards/can-deactivate.guard';

@NgModule({
    imports: [
        AuthModule,
        IconsModule,
        TranslocoCoreModule
    ],
    declarations: [

    ],
    providers: [
        CanDeactivateGuard
    ],
    exports: [

    ]
})
export class CoreModule {
    /**
     * Constructor
     */
    constructor(
        @Optional() @SkipSelf() parentModule?: CoreModule
    ) {
        // Do not allow multiple injections
        if (parentModule) {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }
    }
}
