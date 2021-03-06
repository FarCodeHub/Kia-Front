import { JalaliPipe } from './core/pipes/jalali-pipe';
/* eslint-disable no-trailing-spaces */
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PersianDateAdapter, PERSIAN_DATE_FORMATS } from './core/base/persian.dateadapter';
import localeFa from '@angular/common/locales/fa';
import { registerLocaleData } from '@angular/common';
import { LoaderService } from './core/base/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './core/base/loader.interceptor';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPersianPaginatorIntl } from './shared/persian-paginator-intl';
registerLocaleData(localeFa);

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({

    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,

        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,


        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),

    ],
    bootstrap: [
        AppComponent
    ],
    providers: [

        { provide: MAT_DATE_LOCALE, useValue: 'fa-IR' },
        // { provide: DateAdapter, useClass: PersianDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MatPaginatorIntl, useValue: getPersianPaginatorIntl() },
        LoaderService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        }
    ],
})
export class AppModule {
}
