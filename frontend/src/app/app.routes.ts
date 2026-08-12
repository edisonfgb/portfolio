import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@core/components/main-layout/main-layout.component';
import { HomePageComponent } from './features/home/pages/home/home-page.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomePageComponent }
        ]
    }
];
