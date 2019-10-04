import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { PlanetsComponent } from './planets/planets.component';
import { StarshipsComponent } from './starships/starships.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { PersonProfileComponent } from './people/person/person-profile.component';

const routes: Routes = [
    {
        path: 'people',
        component: PeopleComponent,
        children: [
            {
                path: ':personId',
                component: PersonProfileComponent
            }
        ]
    },
    {
        path: 'planets',
        component: PlanetsComponent
    },
    {
        path: 'starships',
        component: StarshipsComponent
    },
    {
        path: 'vehicles',
        component: VehiclesComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
