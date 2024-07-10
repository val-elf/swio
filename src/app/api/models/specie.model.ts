import { ObjectBase, linkIdentity } from '../api.service';

export interface ISpecie extends ObjectBase {
    averageHeight: number;
    averageLifespan: number;
    classification: string;
    designation: string;
    eyeColors: string;
    hairColor: string;
    homeworld: linkIdentity;
    language: string;
    name: string;
    people: linkIdentity[];
    films: linkIdentity[];
    skinColors: string;
}
