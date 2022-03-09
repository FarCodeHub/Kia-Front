import { AddComisionComponent } from './pages/add-comision/add-comision.component';
import { ComissionComponent } from './pages/comission/comission.component';
import { CustomerDetailDataResolver } from './pages/customer-detail/customer-detail-data.resolver';
import { InboxComponent } from './pages/inbox/inbox.component';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail.component';
import { CasesReportComponent } from './pages/cases-report/cases-report.component';
import { ContractsComponent } from './pages/contracts/contracts.component';
import { AddContractComponent } from './pages/add-contract/add-contract.component';
import { OperatorStatusComponent } from './pages/operator-status/operator-status.component';
import { NewCallComponent } from './pages/new-call/new-call.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NewCallDataResolver } from './pages/new-call/new-call-data.resolver';
import { SupervisorComponent } from './pages/supervisor/supervisor.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],

    children: [
      {
        path: 'new-call/:taskid/:signalId', component: NewCallComponent,
        resolve: {
          intialData: NewCallDataResolver,
        },
      },
      {
        path: 'comission', component: ComissionComponent,
        resolve: {

        },
      },
      {
        path: 'inbox', component: InboxComponent,
        resolve: {

        },
      },
      {
        path: 'cases', component: CasesReportComponent,
        resolve: {

        },
      },
      {
        path: 'add-contract/:customerId/:taskId/:caseId', component: AddContractComponent,
        resolve: {

        },
      },
      {
        path: 'contracts', component: ContractsComponent,
        resolve: {

        },
      },
      {
        path: 'detail/:customerId', component: CustomerDetailComponent,
        resolve: {
          intialData: CustomerDetailDataResolver,
        },
      },
      {
        path: 'operators-status', component: OperatorStatusComponent,
        resolve: {

        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorRoutingModule { }
