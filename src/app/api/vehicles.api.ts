import { Injectable } from '@angular/core';
import { IVehicle } from './models/vehicle.model';
import { Api, ObjectAssistant } from './api.service';

@Injectable()
export class VehiclesService {
    constructor(private api: Api) { }

    private normalize = (vehicle: IVehicle) => {
        ObjectAssistant.normalizeFields(vehicle, [
            'cargoCapacity',
            'costInCredits',
            'crew',
            'length',
            'maxAtmospheringSpeed',
            'passengers',
        ], 'number');
        ObjectAssistant.normalizeFields(vehicle, ['films', 'pilots'], 'id');
        return vehicle;
    }

    async getVehicles(page: number, search?: string) {
        return await this.api.getList<IVehicle>('vehicles/', { page, search }, this.normalize);
    }

    async getVehicle(vehicleId: number) {
        return await this.api.get<IVehicle>(`vehicles/${vehicleId}/`, undefined, this.normalize);
    }
}
