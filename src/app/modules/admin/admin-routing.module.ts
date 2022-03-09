import { EmployeesComponent } from './pages/employees/employees.component';
import { AddpersonComponent } from './pages/persons/addperson/addperson.component';
import { PersonsComponent } from './pages/persons/persons.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { AddEmployeeComponent } from './pages/employees/add-employee/add-employee.component';
import { UnitsComponent } from './pages/units/units.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { PositionsComponent } from './pages/positions/positions.component';
import { LoadMapV2Component } from './pages/projects/load-map-v2/load-map-v2.component';
import { RolesComponent } from './pages/roles/roles.component';
import { UserComponent } from './pages/user/user.component';
import { SmsComponent } from './pages/ads/sms/sms.component';
import { BaseValueComponent } from './pages/base-value/base-value.component';
import { AddBaseValueTypeComponent } from './pages/base-value/add-base-value-type/add-base-value-type.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { InstagramComponent } from './pages/ads/instagram/instagram.component';
import { SitesComponent } from './pages/ads/sites/sites.component';
import { SentSmsComponent } from './pages/ads/sms/send-received/sent-sms/sent-sms.component';
import { ReceivedSmsComponent } from './pages/ads/sms/send-received/received-sms/received-sms.component';
import { SendReceivedComponent } from './pages/ads/sms/send-received/send-received.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CanDeactivateGuard } from 'app/core/auth/guards/can-deactivate.guard';
import { QuestionsComponent } from './pages/questions/questions.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'persons', component: PersonsComponent, children: [
          {
            path: 'add', component: AddpersonComponent, data: {
              title: 'Add Person'
            },
          }
        ]
      },
      {

        path: 'employees', component: EmployeesComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'employees/add', component: AddEmployeeComponent
      },

      {
        path: 'units', component: UnitsComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'projects', component: ProjectsComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'projects/map', component: LoadMapV2Component
      },
      {
        path: 'positions', component: PositionsComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'roles', component: RolesComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'permissions', component: PermissionsComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'branches', component: BranchesComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'users', component: UserComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'ads', component: SmsComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'basevalues', component: BaseValueComponent
      },
      {
        path: 'addBaseValueType', component: AddBaseValueTypeComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'instagramAds/:uniqueName', component: InstagramComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'siteAds/:uniqueName', component: SitesComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'sentSms', component: SentSmsComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'receivedSms', component: ReceivedSmsComponent,
        canDeactivate: [CanDeactivateGuard],
      },

      {
        path: 'sendReceivedComponent', component: SendReceivedComponent,
        canDeactivate: [CanDeactivateGuard],
      },

      {
        path: 'customerComponent', component: CustomerComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'questions', component: QuestionsComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'settings', component: SettingsComponent,
        canDeactivate: [CanDeactivateGuard],
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
