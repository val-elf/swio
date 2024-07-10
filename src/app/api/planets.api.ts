import { Injectable } from '@angular/core';
import { Api, ObjectAssistant } from './api.service';
import { IPlanet } from './models/planet.models';
import { getPlanets } from './mocks/planets.mock';


@Injectable()
export class PlanetsService {
    constructor(private api: Api) { }

    private normalize(planet: IPlanet) {
        ObjectAssistant.normalizeFields(planet, ['films', 'residents'], 'id');
        ObjectAssistant.normalizeFields(planet, ['diameter', 'orbitalPeriod', 'population', 'rotationPeriod', 'surfaceWater'], 'number');
        return planet;
    }

    async getPlanets(page: number, search?: string) {
        // return getPlanets(page, search, this.normalize);
        return await this.api.getList<IPlanet>('planets/', { page, search }, this.normalize);
    }

    async getPlanet(id: number) {
        return await this.api.get<IPlanet>(`planets/${id}/`, undefined, this.normalize);
    }
}
