import { Customer } from './../../../../shared/models/customer.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CaseService } from '../../services/case.service';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { Case } from 'app/shared/models/case.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  @ViewChild('matDrawer', { static: true }) protected matDrawer: MatDrawer;

  public drawerMode: 'side' | 'over';
  public addVisible = false;

  customerId: number;
  customer: Customer;
  cases: Case[];

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute) {
    this.customerId = Number(this.route.snapshot.paramMap.get('customerId'));

  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { intialData: any[] }) => {
      this.customer = data.intialData[0];
      this.cases = data.intialData[1];
    });
  }
  editCustomer() {
    this.addVisible = true;
  }

  public closeAdd(result: boolean) {
    this.addVisible = false;
    if (result)
      this.loadCustomer();
  }

  loadCustomer() {
    this.customerService.getById(this.customerId).subscribe(result => {
      this.customer = result;
    });
  }

}
