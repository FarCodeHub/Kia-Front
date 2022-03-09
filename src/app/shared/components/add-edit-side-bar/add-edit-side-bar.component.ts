import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageMode } from 'app/shared/models/enums';

@Component({
  selector: 'cmpt-add-edit-side-bar',
  templateUrl: './add-edit-side-bar.component.html',
  styleUrls: ['./add-edit-side-bar.component.scss']
})
export class AddEditSideBarComponent implements OnInit {
  //---To use in html
  public PageMode = PageMode;

  @Input()
  form: FormGroup;

  @Input()
  pageName: string;

  @Input()
  pageMode: PageMode;

  @Input()
  isHeader:boolean = true;

  /* ---------- OnClose for save(with result=true) and cancel(with result=false) ---------------- */
  @Output()
  onClose = new EventEmitter<boolean>();

  @Output()
  onSave = new EventEmitter<boolean>();




  saving = false;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.onClose.emit();
  }

  save() {
    this.onSave.emit();
  }

}
