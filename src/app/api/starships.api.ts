import { Injectable } from '@angular/core';
import { Api, ObjectAssistant } from './api.service';
import { IStarship } from './models/starship.model';

@Injectable()
export class StarshipService {
    constructor(private api: Api) { }

    private normalize = (ship: IStarship) => {
        ObjectAssistant.normalizeFields<IStarship>(ship, [
            'MGLT',
            'cargoCapability',
            'costInCredits',
            'crew',
            'hyperdriveRating',
            'length',
            'passengers'], 'number');
        ObjectAssistant.normalizeFields(ship, ['films', 'pilots'], 'id');
        return ship;
    }

    async getStarships(page: number, search?: string) {
        return await this.api.getList<IStarship>('starships/', { page, search }, this.normalize);
    }

    async getStarship(shipId: number) {
        return await this.api.get<IStarship>(`starships/${shipId}/`, undefined, this.normalize);
    }
}
