import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, forwardRef, Input, OnInit, OnChanges } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'c-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => TreeviewComponent)
  }]
})
export class TreeviewComponent implements OnInit, ControlValueAccessor {

  checklistSelection = new SelectionModel<any>(true /* multiple */);

  @Input()
  titleFieldName: string;

  @Input()
  IdFieldName: string;
  @Input()
  parentIdFieldName: string;


  @Input()
  set datasource(value: any[]) {
    let data = this.toTreeNode(value, null, 0);
    this.treedataSource.data = data;
    console.log("set datasource");


  }


  private transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      title: node[this.titleFieldName],
      level: level,
      id: node.id,
      parentId: node[this.parentIdFieldName],
      //OrderIndex: node.OrderIndex,
      // HasValue: node.HasValue
    };
  };


  treeControl = new FlatTreeControl<any>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  treedataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: any) => node.expandable;

  constructor() { }

  onChange: (value: number[]) => {}
  onTouch: any = () => { }

  writeValue(selectedItems: number[]): void {
    this.selectTree(selectedItems, this.treedataSource.data);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  toTreeNode(items: any[], parentId: number | null, level: number): any[] {
    if (items == null)
      return [];
    items.forEach(element => {
      element.expandable = false;
      element.level = level;
    });
    let level_items = items.filter((x) => x.parentId == parentId);
    level_items.forEach((u) => {
      u.children = this.toTreeNode(items, u.id, level + 1);
    });
    return level_items;
  }

  selectTree(selectedItems: number[], items: any[]) {
    items.forEach((item) => {
      if (selectedItems.filter(x => x == item[this.IdFieldName]).length > 0) {
        this.checklistSelection.select(item);
      }
      this.selectTree(selectedItems, item.children);

    });
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: any): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: any): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  selectionToggle(node: any): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
    let selectedKeys: number[] = [];
    for (let item of this.checklistSelection.selected) {
      selectedKeys.push(item[this.IdFieldName]);
    }
    this.onChange(selectedKeys);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  leafSelectionToggle(node: any): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: any): void {
    let parent: any | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: any): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: any): any | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  getLevel = (node: any) => node.level;

}
