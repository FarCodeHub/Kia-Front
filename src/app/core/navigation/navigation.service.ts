import { ServiceResult } from 'app/shared/models/result.model';
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, of, from } from 'rxjs';
import { mergeAll, tap, map } from 'rxjs/operators';
import { Navigation } from 'app/core/navigation/navigation.types';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { compactNavigation, defaultNavigation, defaultNavigation1, futuristicNavigation, horizontalNavigation } from './data';
import { cloneDeep } from 'lodash';
import { UserService } from '../user/user.service';
import { environment } from 'environments/environment';
import { Menu } from 'app/shared/models/menu';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private readonly _compactNavigation: FuseNavigationItem[] = compactNavigation;
    private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
    private readonly _defaultNavigation1: FuseNavigationItem[] = defaultNavigation1;
    private readonly _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;

    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient,
        private _userService: UserService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        // let nav = <Navigation>{
        //     compact: cloneDeep(this._defaultNavigation),
        //     default: cloneDeep(this._defaultNavigation),
        //     futuristic: cloneDeep(this._defaultNavigation),
        //     horizontal: cloneDeep(this._defaultNavigation),
        // };
        // of(nav).pipe(
        //     tap((navigation) => {
        //         this._navigation.next(navigation);
        //     })
        // );
        let nav = this._httpClient.get<ServiceResult<Menu[]>>(`${environment.apiUrl}/User/GetMenues`).pipe(
            map((menus) => {
                let navigation = <Navigation>{
                    // compact: cloneDeep(menus.objResult),
                    // default: cloneDeep(menus.objResult),
                    // futuristic: cloneDeep(menus.objResult),
                    // horizontal: cloneDeep(menus.objResult),
                    compact: [],
                    default: this.makeHeirachical(menus.objResult, null),
                    futuristic: [],
                    horizontal: []
                };
                this._navigation.next(navigation);
                return navigation;
            }
            )
        )

        return nav;
    }

    makeHeirachical(items: Menu[], parentId: number | null): FuseNavigationItem[] {
        if (items == null)
            return [];
        let navItems: FuseNavigationItem[] = [];
        //Get all items containing parentId
        let level_items = items.filter((x) => x.parentId == parentId);
        level_items.forEach((element) => {
            let navItem = <FuseNavigationItem>{
                id: String(element.id),
                link: element.link,
                icon: element.icon,
                title: element.title,
                subtitle: element.subTitle,

            }
            navItems.push(navItem);
            //find children of current item
            navItem.children = this.makeHeirachical(items, element.id);
            navItem.type = navItem.children.length > 0 ? 'collapsable' : 'basic';
        });
        return navItems;
    }
}
