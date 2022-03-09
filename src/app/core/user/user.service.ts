import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { ServiceResult } from 'app/shared/models/result.model';
import { User } from 'app/shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    currentUser: User;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
        let token = localStorage.getItem('accessToken') ?? '';
        if (token != '')
            this.user = this.getUserFromToken(token);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        this.currentUser = value;
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    getUserFromToken(token: string): User {
        let tokenData = this.decodeJWT(token);
        let user = <User>{
            id: tokenData.Id,
            email: tokenData.Email,
            name: tokenData.FullName,
            employeeId: tokenData.EmployeeId,
            extentionNumber: tokenData.ExtentionNumber,
            unitId: tokenData.UnitId,
            positionId: tokenData.PositionId,
            unitTitle: tokenData.UnitTitle,
            positionTitle: tokenData.PositionTitle,
         //   profilePhotoUrl: tokenData.UserAvatarReletiveAddress,
            permissions: tokenData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        };
        return user;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        let userData = this.decodeJWT(localStorage.getItem('accessToken') ?? '');
        return this._httpClient.get<ServiceResult<User>>(`${environment.apiUrl}/User/get?Id=${userData.Id}`).pipe(
            map((result) => result.objResult),
            tap((user) => {
                this._user.next(user);
            })
        );

        // let tokenData = this.decodeJWT(localStorage.getItem('accessToken') ?? '');
        // let user = <User>{
        //     id: tokenData.Id,
        //     email: tokenData.Email,
        //     name: tokenData.FullName,
        //     EmployeeId: tokenData.EmployeeId
        // };
        // this._user.next(user);
        // const observable = new Observable<User>(subscriber => {
        //     subscriber.next(user);
        // });
        // return observable;
    }

    decodeJWT(token: string): any {

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    /**
     * Update the user
     *
     * @param user
     */
    // update(user: User): Observable<any> {
    //     return this._httpClient.patch<User>(environment.singalUrl+'api/VoipCrm/TurnOnDnd', { user }).pipe(
    //         map((response) => {
    //             this._user.next(response);
    //         })
    //     );
    // }

    updateStatus(on: boolean): Observable<ServiceResult<boolean>> {
        if (on)
            return this._httpClient.get<ServiceResult<boolean>>(environment.singalUrl + '/VoipCrm/TurnOffDnd')
        else
            return this._httpClient.get<ServiceResult<boolean>>(environment.singalUrl + '/VoipCrm/TurnOnDnd');
    }
}
