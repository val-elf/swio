import { ObjectBase, linkIdentity } from '../api.service';

export interface IPerson extends ObjectBase {
    birthYear: string;
    eyeColor: string;
    films: linkIdentity[];
    gender: string;
    hairColor: string;
    height: number;
    homeworld: linkIdentity;
    mass: number;
    name: string;
    skinColor: string;
    species: linkIdentity[];
    race?: any;
    starships: linkIdentity[];
    vehicles: linkIdentity[];
}
