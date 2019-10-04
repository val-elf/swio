import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Api } from './api.service';
import { FilmsService } from './films.service';
import { PeopleService } from './people.api';
import { PlanetsService } from './planets.api';
import { StarshipService } from './starships.api';
import { VehiclesService } from './vehicles.api';
import { SpeciesService } from './species.api';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        PlanetsService,
        PeopleService,
        Api,
        StarshipService,
        SpeciesService,
        FilmsService,
        VehiclesService
    ]
})
export class ApiModule {}
