import { ObjectBase, linkIdentity } from '../api.service';

export interface IPlanet extends ObjectBase {
    climate: string;
    diameter: number;
    films: linkIdentity[];
    gravity: string;
    name: string;
    orbitalPeriod: number;
    population: number;
    residents: linkIdentity[];
    rotationPeriod: number;
    surfaceWater: number;
    terrain: string;
}
