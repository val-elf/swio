import { ObjectBase, linkIdentity } from '../api.service';

export interface IFilm extends ObjectBase {
    characters: linkIdentity[];
    director: string;
    episodeId: number;
    openingCrawl: string;
    planets: linkIdentity[];
    producer: string;
    releaseDate: Date;
    species: linkIdentity[];
    starships: linkIdentity[];
    title: string;
    vehicles: linkIdentity[];
}
