import { SharedModule } from 'app/shared/shared.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperatorRoutingModule } from './operator-routing.module';
import { NewCallComponent } from './pages/new-call/new-call.component';
import { QuestionsComponent } from './pages/new-call/questions/questions.component';
import { ProjectsComponent } from './pages/new-call/projects/projects.component';
import { CallHistoryComponent } from './pages/new-call/call-history/call-history.component';
import { SupervisorComponent } from './pages/supervisor/supervisor.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FuseAlertModule } from '@fuse/components/alert';
import { OperatorStatusComponent } from './pages/operator-status/operator-status.component';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail.component';
import { CasesReportComponent } from './pages/cases-report/cases-report.component';
import { ContractsComponent } from './pages/contracts/contracts.component';
import { AddContractComponent } from './pages/add-contract/add-contract.component';
import { AddComisionComponent } from './pages/add-comision/add-comision.component';
import { QuestionsAnswersComponent } from './pages/customer-detail/questions-answers/questions-answers.component';
import { ComissionComponent } from './pages/comission/comission.component';
import { TaskDialogComponent } from './pages/new-call/task-dialog/task-dialog.component';
import { AddResultDialogComponent } from './pages/inbox/add-result-dialog/add-result-dialog.component';



@NgModule({
  declarations: [
    NewCallComponent,
    QuestionsComponent,
    ProjectsComponent,
    CallHistoryComponent,
    SupervisorComponent,
    OperatorStatusComponent,
    CustomerDetailComponent,
    CasesReportComponent,
    ContractsComponent,
    AddContractComponent,
    AddComisionComponent,
    QuestionsAnswersComponent,
    ComissionComponent,
    TaskDialogComponent,
    AddResultDialogComponent,

  ],
  imports: [
    CommonModule,
    OperatorRoutingModule,
    SharedModule,

  ]
})
export class OperatorModule { }
