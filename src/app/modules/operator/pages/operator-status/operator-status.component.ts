import { Operator } from './../../../../shared/models/operator.model';
import { Component, OnInit } from '@angular/core';
import { OperatorService } from '../../services/operator.service';
import * as signalR from '@microsoft/signalr';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-operator-status',
  templateUrl: './operator-status.component.html',
  styleUrls: ['./operator-status.component.scss']
})
export class OperatorStatusComponent implements OnInit {

  operators: Operator[];
  serverUrl = environment.imageUrl;

  constructor(private operatorService: OperatorService) { }

  ngOnInit(): void {
    const me = this;
    this.operatorService.getAll().subscribe(result => {
      this.operators = result.data;

      this.operatorService.getStatus("").subscribe(result => {
        // const status = JSON.parse(result);
        for (const [key, value] of Object.entries(result)) {
          let opt = me.operators.find(x => x.extentionNumber == Number(key));
          opt.status = String(value);
        }
      });

    });


    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.singalUrl + '/voipHub')
      .build();

    connection.start().then(function () {
      console.log('SignalR Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on('statusChangedSignal', (msg) => {
      console.log(`/statusChangedSignal/${msg}`);
    });
  }
}
