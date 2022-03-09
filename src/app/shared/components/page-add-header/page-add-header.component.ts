import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoaderService } from 'app/core/base/loader.service';

@Component({
  selector: 'cmpt-page-add-header',
  templateUrl: './page-add-header.component.html',
  styleUrls: ['./page-add-header.component.scss']
})
export class PageAddHeaderComponent implements OnInit {

      @Input()
  actionPermissionName: string = '';
  @Input()
  showAction: boolean = true;

  @Input()
  actionTitle: string = 'افزودن';

  @Input()
  title: string;

  @Output()
  onShowAdd = new EventEmitter<void>();

  constructor(public loaderService: LoaderService) { }

  ngOnInit(): void {
  }

  showAdd() {
    this.onShowAdd.emit();
  }
}
