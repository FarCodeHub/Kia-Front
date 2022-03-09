
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PagedList } from 'app/shared/models/paged-list';
import { Pagination } from 'app/shared/models/pagination';
import { Task } from 'app/shared/models/session.model';
import { Observable } from 'rxjs';
import { CallService } from '../../services/call.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {


  isLoading: boolean = false;
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  // tasks$: Observable<PagedList<Task[]>>;
  tasks: PagedList<Task[]>;

  searchInputControl: FormControl = new FormControl();
  selectedItem: Task | null = null;
  selectedItemForm: FormGroup;
  pagination: Pagination = {
    length: 10,
    size: 0,
    pageIndex: 10,
    lastPage: 10,
    startIndex: 1,
    endIndex: 10,
  };

  constructor(private callService: CallService,
    private _formBuilder: FormBuilder,) {
    this.callService.getAll().subscribe(result => {
      this.tasks = result;
    });

  }

  ngOnInit(): void {
    this.selectedItemForm = this._formBuilder.group({
      id: [''],
      category: [''],
      firstName: ['', [Validators.required]],
      lastName: [''],
      genderBaseId: [0],
      nationalCode: [''],
      birthDate: [''],
      email: [''],
      postalCode: [''],
      zipCodeId: [''],
      address: [''],
      employeeCode: [''],
      employmentDate: [''],
      taxPercent: [''],
      price: [''],
      weight: [''],
      profilePhotoUrl: [''],
      images: [[]],
      currentImageIndex: [0], // Image index that is currently being viewed
      active: [false]
    });
  }

  addEmployee() {

  }

  toggleDetails(Id: number): void {
    // If the product is already selected...
    if (this.selectedItem && this.selectedItem.id === Id) {
      // Close the details
      this.closeDetails();
      return;
    }

    // Get the product by id
    this.callService.get(Id)
      .subscribe((item) => {

        // Set the selected product
        this.selectedItem = item;

        // Fill the form
        this.selectedItemForm.patchValue(item);

        // Mark for check
        // this.selectedItemForm.markForCheck();
      });
  }

  /**
   * Close the details
   */
  closeDetails(): void {
    this.selectedItem = null;
  }

}
