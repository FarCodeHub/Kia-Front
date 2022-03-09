import { Route } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { ProjectResolver } from '../project.resolvers';

export const landingHomeRoutes: Route[] = [
    {
        path: '',
        component: LandingHomeComponent,
        resolve: {
            data: ProjectResolver,
        },
    }
];
