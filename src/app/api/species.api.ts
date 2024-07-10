import { Injectable } from '@angular/core';
import { Api, ObjectAssistant } from './api.service';
import { ISpecie } from './models/specie.model';

@Injectable()
export class SpeciesService {
    constructor(private api: Api) { }
    private cache: { [key: string]: ISpecie | Promise<ISpecie> } = {};

    private normalize = (specie: ISpecie) => {
        ObjectAssistant.normalizeFields(specie, ['averageHeight', 'averageLifespan'], 'number');
        ObjectAssistant.normalizeFields(specie, ['homeworld', 'people', 'films'], 'id');
        return specie;
    }

    async getSpecies(page: number, search?: string): Promise<ISpecie[]> {
        return (await this.api.getList<ISpecie>('species/', { page, search }, this.normalize))!.results;
    }

    async getSpecie(specieId: number): Promise<ISpecie> {
        if (this.cache[specieId]) {
            const spc = this.cache[specieId];
            if (spc instanceof Promise) return await spc;
            return spc;
        }
        const specPromise = this.api.get<ISpecie>(`species/${specieId}/`, undefined, this.normalize) as any as Promise<ISpecie>;
        this.cache[specieId] = specPromise;
        const specie = await specPromise;
        this.cache[specieId] = specie;
        return specie;
    }
}
