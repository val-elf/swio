import { ObjectBase, linkIdentity } from '../api.service';

export interface IStarship extends ObjectBase {
    MGLT: number;
    cargoCapability: number;
    consumables: string;
    costInCredits: number;
    crew: number;
    hyperdriveRating: number;
    length: number;
    manufacturer: string;
    maxAtmospheringSpeed: string;
    model: string;
    name: string;
    passengers: number;
    films: linkIdentity[];
    pilots: linkIdentity[];
    starshipClass: string;
}
