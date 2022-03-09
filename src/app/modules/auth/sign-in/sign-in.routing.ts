import { Route } from '@angular/router';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';

export const authSignInRoutes: Route[] = [
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: AuthSignInComponent
    }
];
