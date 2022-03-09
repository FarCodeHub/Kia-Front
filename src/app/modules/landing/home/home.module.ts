import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { landingHomeRoutes } from 'app/modules/landing/home/home.routing';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { TranslocoModule } from '@ngneat/transloco';
import { HomePage1Component } from './home-page1/home-page1.component';
import { HomePage2Component } from './home-page2/home-page2.component';
@NgModule({
    declarations: [
        LandingHomeComponent,
        HomePage1Component,
        HomePage2Component,
    ],
    imports: [
        RouterModule.forChild(landingHomeRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        TranslocoModule,

        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,

        NgApexchartsModule,
    ]
})
export class LandingHomeModule {
}
