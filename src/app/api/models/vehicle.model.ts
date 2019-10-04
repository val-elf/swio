import { ObjectBase, linkIdentity } from '../api.service';

export interface IVehicle extends ObjectBase {
    cargoCapacity: number;
    consumables: string;
    costInCredits: number;
    crew: number;
    length: number;
    manufacturer: string;
    maxAtmospheringSpeed: string;
    model: string;
    name: string;
    passengers: number;
    pilots: linkIdentity[];
    films: linkIdentity[];
    vehicleClass: string;
}
