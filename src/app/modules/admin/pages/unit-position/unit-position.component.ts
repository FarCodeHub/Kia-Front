import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Position } from 'app/shared/models/position.model';
import { UnitPosition } from 'app/shared/models/unit-position.model';
import { Unit } from 'app/shared/models/unit.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CreateUnitCommand } from '../../models/command/create-uint-command';
import { CreateUnitPositionCommand } from '../../models/command/Create-unit-position-command';
import { PositionService } from '../../services/position.service';
import { UnitService } from '../../services/unit.service';
import { UnitpositionService } from '../../services/unitposition.service';

@Component({
    selector: 'app-unit-position',
    templateUrl: './unit-position.component.html',
    styleUrls: ['./unit-position.component.scss'],
})
export class UnitPositionComponent implements OnInit {
    form: FormGroup;
    saving = false;

    positions: Position[];
    unitPositions: UnitPosition[];



    _unit: Unit;
    @Input()
    set unit(value: Unit) {
        this._unit = value;
        this.saving = false;
        this.unitPositions = [];
        if (value)
            this.unitPositionService.GetAllByUnitId(this._unit.id)
                .subscribe((items) => {
                    this.unitPositions = items.data
                    this.form.get("positions").setValue(this.unitPositions.map(x => x.positionId));
                });
    }

    constructor(
        private positionService: PositionService,
        private unitService: UnitService,
        private unitPositionService: UnitpositionService,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            positions: [[]]
        });

        this.loadPositions();
    }

    ngOnInit(): void {

    }

    loadPositions() {
        this.positionService.getAll().subscribe((result) => {
            this.positions = result.data;
        });
    }

    save() {
        this.saving = true;
        let unitUpdateCommand: CreateUnitCommand = <CreateUnitCommand>{
            branchId: this._unit.branchId,
            parentId: this._unit.parentId,
            positionList: this.form.get("positions").value,
            saveChanges: false,
            title: this._unit.title,
            id: this._unit.id
        };
        this.unitService.update(unitUpdateCommand).subscribe((result) => {
            this.saving = false;
        });
    }

    reset() {
        this.form.get("positions").setValue(this.unitPositions.map(x => x.positionId));
    }

}
