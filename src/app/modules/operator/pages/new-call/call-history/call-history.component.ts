import { Communication } from 'app/shared/models/communication.model';
import { CallService } from './../../../services/call.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { AudioService } from 'app/shared/services/audio.service';

@Component({
  selector: 'app-call-history',
  templateUrl: './call-history.component.html',
  styleUrls: ['./call-history.component.scss']
})
export class CallHistoryComponent implements OnInit {

  @Input()
  customerId: number;

  calls: Communication[]
  selectedCallTaskId: number;

  constructor(private _callService: CallService,
    public audioService: AudioService,) { }

  ngOnInit(): void {
    this._callService.getCallByCustomer(this.customerId).subscribe(result => {
      this.calls = result.data;
    })
  }

  /**
    * Returns whether the given dates are different days
    *
    * @param current
    * @param compare
    */
  isSameDay(current: string, compare: string): boolean {
    return moment(current, moment.ISO_8601).isSame(moment(compare, moment.ISO_8601), 'day');
  }

  /**
   * Get the relative format of the given date
   *
   * @param date
   */
  getRelativeFormat(date: string): string {
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'day').startOf('day');

    // Is today?
    if (moment(date, moment.ISO_8601).isSame(today, 'day')) {
      return 'امروز';
    }

    // Is yesterday?
    if (moment(date, moment.ISO_8601).isSame(yesterday, 'day')) {
      return 'دیروز';
    }

    return moment(date, moment.ISO_8601).fromNow();
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  playVoice(voipNumber) {
    this._callService.getRecordedSound(voipNumber).subscribe(url => {
      this.audioService.playStream(url).subscribe(events => {
        // listening for fun here
      });
    })

  }

  detail(call: Communication) {

    this.selectedCallTaskId = call.taskId;
    console.log("detail call " + this.selectedCallTaskId);
  }

}
