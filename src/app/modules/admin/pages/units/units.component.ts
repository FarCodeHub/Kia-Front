import { Branch } from './../../../../shared/models/branch.model';
import { LoaderService } from './../../../../core/base/loader.service';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BranchService } from '../../services/branch.service';
import { UnitService } from '../../services/unit.service';
import { PositionService } from '../../services/position.service';
import { CreateUnitCommand } from '../../models/command/create-uint-command';
import { Unit } from 'app/shared/models/unit.model';
import { PagedList } from 'app/shared/models/paged-list';
import { CrudBase } from '../../models/CrudBase';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { FuseConfirmationService } from '@fuse/services/confirmation';

interface UnitFlatNode extends Unit {
  expandable: boolean;
  level: number;
}

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent extends CrudBase<Unit> implements OnInit {

  selectedBranchId: number;
  treeUnit: Unit[];
  flatUnits: Unit[];
  branchs: Branch[];
  //units$: Observable<PagedList<Unit[]>>;
  displayedColumns: string[] = ['title', 'branchTitle'];


  private transformer = (node: Unit, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      title: node.title,
      branchTitle: node.branchTitle,
      level: level,
      id: node.id,
    };
  };

  treeControl = new FlatTreeControl<UnitFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );


  constructor(private unitService: UnitService,
    private branchService: BranchService,
    public loaderService: LoaderService,
    private fuseConfirmationService: FuseConfirmationService) {
    super(fuseConfirmationService);
  }

  loadData() {
    this.unitService.GetAllByBranchId(this.selectedBranchId).subscribe((items) => {
      this.flatUnits = items.data;
      this.treeUnit = this.toTreeUnit(items.data, null);

      this.dataSource.data = this.treeUnit;
    });

  }


  ngOnInit(): void {
    this.branchService.getAll().subscribe(result => this.branchs = result.data);
  }

  hasChild = (_: number, node: UnitFlatNode) => node.expandable;

  onBranchChange() {
    this.loadData();
  }

  selectUnit(item) {
    this.updateItem = this.flatUnits.find(x => x.id == item.id);//For vanshing parentId/branchId Bug
    // this.updateItemChange.emit(item);
  }

  toTreeUnit(items: Unit[], parentId?: number): Unit[] {
    let level_items = items.filter((x) => x.parentId == parentId);
    level_items.forEach((u) => {
      u.children = this.toTreeUnit(items, u.id);
    });
    return level_items;
  }

}
