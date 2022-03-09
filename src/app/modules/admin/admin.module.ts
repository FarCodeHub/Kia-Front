import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { PersonsComponent } from './pages/persons/persons.component';
import { AddpersonComponent } from './pages/persons/addperson/addperson.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { AddEmployeeComponent } from './pages/employees/add-employee/add-employee.component';
import { UnitsComponent } from './pages/units/units.component';
import { AddunitComponent } from './pages/units/addunit/addunit.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { PositionsComponent } from './pages/positions/positions.component';
import { LoadMapV2Component } from './pages/projects/load-map-v2/load-map-v2.component';
import { RolesComponent } from './pages/roles/roles.component';
import { AddRoleComponent } from './pages/roles/add-role/add-role.component';
import { UserComponent } from './pages/user/user.component';
import { AddUserComponent } from './pages/user/add-user/add-user.component';
import { AdsComponent } from './pages/ads/ads.component';

import { SmsComponent } from './pages/ads/sms/sms.component';
import { AddSmsComponent } from './pages/ads/sms/add-sms/add-sms.component';
import { BaseValueComponent } from './pages/base-value/base-value.component';
import { AddBaseValueTypeComponent } from './pages/base-value/add-base-value-type/add-base-value-type.component';
import { UnitPositionComponent } from './pages/unit-position/unit-position.component';
import { InstagramComponent } from './pages/ads/instagram/instagram.component';
import { AddInstagramComponent } from './pages/ads/instagram/add-instagram/add-instagram.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { MapBranchComponent } from './pages/branches/map-branch/map-branch.component';
import { AddBranchComponent } from './pages/branches/add-branch/add-branch.component';
import { AddPermissionComponent } from './pages/permissions/add-permission/add-permission.component';
import { SitesComponent } from './pages/ads/sites/sites.component';
import { AddAdsIntoSiteComponent } from './pages/ads/sites/add-ads-into-site/add-ads-into-site.component';
import { AddPositionComponent } from './pages/positions/add-position/add-position.component';

import { AddProjectComponent } from './pages/projects/add-project/add-project.component';
import { SentSmsComponent } from './pages/ads/sms/send-received/sent-sms/sent-sms.component';
import { ReceivedSmsComponent } from './pages/ads/sms/send-received/received-sms/received-sms.component';
import { JalaliDatePipe } from 'app/core/pipes/jalali-date-pipe';
import { SendReceivedComponent } from './pages/ads/sms/send-received/send-received.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { AddCustomerComponent } from './pages/customer/add-customer/add-customer.component';
import { AddBaseValueComponent } from './pages/base-value/add-base-value/add-base-value.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { AddQuestionComponent } from './pages/questions/add-question/add-question.component';
import { AnswerDetailComponent } from './pages/questions/answer-detail/answer-detail.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AdvertismentChartDialogComponent } from './pages/ads/advertisment-chart-dialog/advertisment-chart-dialog.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({

  declarations: [

    PersonsComponent,
    AddpersonComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    UnitsComponent,
    AddunitComponent,
    ProjectsComponent,
    PositionsComponent,
    LoadMapV2Component,
    RolesComponent,
    AddRoleComponent,
    UserComponent,
    AddUserComponent,
    SmsComponent,
    AdsComponent,
    AddBaseValueTypeComponent,
    AddSmsComponent,
    BaseValueComponent,

    UnitPositionComponent,
    InstagramComponent,
    AddInstagramComponent,
    PermissionsComponent,
    BranchesComponent,
    MapBranchComponent,
    AddBranchComponent,
    AddPermissionComponent,
    SitesComponent,
    AddAdsIntoSiteComponent,
    AddPositionComponent,
    AddProjectComponent,
    SentSmsComponent,
    ReceivedSmsComponent,
    SendReceivedComponent,
    CustomerComponent,
    AddBaseValueComponent,
    QuestionsComponent,
    AddQuestionComponent,
    AnswerDetailComponent,
    SettingsComponent,
    AdvertismentChartDialogComponent,


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgApexchartsModule,
  ]
})
export class AdminModule { }
