import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'app/core/base/loader.service';

@Component({
  selector: 'app-send-received',
  templateUrl: './send-received.component.html',
  styleUrls: ['./send-received.component.scss']
})
export class SendReceivedComponent implements OnInit {

    smsMode:boolean = true;
  constructor(public loaderService:LoaderService) { }

  ngOnInit(): void {
  }

}
