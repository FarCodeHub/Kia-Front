import { AuthService } from 'app/core/auth/auth.service';
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { environment } from 'environments/environment';
import { UserService } from './core/user/user.service';
import { GlobalService } from './shared/services/global.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    /**
     * Constructor
     */
    constructor(private router: Router,
        private globalService: GlobalService,
        private zone: NgZone,
        private _userService: UserService,
        private _authService: AuthService) {
    }

    ngOnInit(): void {
        if (this._authService.accessToken) {
            this.globalService.loadBaseValue().then(x => {
                console.log("Base Values loaded");
            });

            const connection = new signalR.HubConnectionBuilder()
                .withAutomaticReconnect()
                .configureLogging(signalR.LogLevel.Information)
                .withUrl(environment.singalUrl + '/voipHub')
                .build();


            connection.start().then(function () {
                console.log('SignalR Connected!');

            }).catch(function (err) {
                return console.error(err.toString());
            });
            // const queueNumber = this._userService.currentUser.queueNumber;
            // console.log(`/queueNumber/${queueNumber}`);
            connection.on('1102', (msg) => {
                const data = JSON.parse(msg);
                console.log(`new-call:`);
                console.log(data);
                if (data.StatusTitle == 'Ringing') {
                    console.log(`/new-call/${data.TaskId}`);
                    this.zone.run(() => {
                        this.router.navigate([`/new-call/${data.TaskId}/${data.SignalId}`]);
                    });
                }


            });
        }

    }
}
