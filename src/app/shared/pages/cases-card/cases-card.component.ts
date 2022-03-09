import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Case } from 'app/shared/models/case.model';

@Component({
  selector: 'app-cases-card',
  templateUrl: './cases-card.component.html',
  styleUrls: ['./cases-card.component.scss']
})
export class CasesCardComponent implements OnInit {

  @Input()
  items: Case[];
  constructor(private router: Router,) { }

  ngOnInit(): void {
  }


  detail(item: Case) {
    this.router.navigate([`/detail/${item.customerId}`]);

  }
}
