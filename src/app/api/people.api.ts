import { Injectable } from '@angular/core';
import { Api, ObjectAssistant } from './api.service';
import { IPerson } from './models/people.models';

@Injectable()
export class PeopleService {
    constructor(
        private api: Api
    ) { }

    private normalize(person: IPerson) {
        ObjectAssistant.normalizeFields(person, ['height', 'mass'], 'number');
        ObjectAssistant.normalizeFields(person, ['films', 'homeworld', 'species', 'starships', 'vehicles'], 'id');
        return person;
    }

    async getPeople(page: number, search?: string) {
        // return getPeoplePage(page, search, this.normalize);
        return await this.api.getList<IPerson>('people/', { page, search }, this.normalize);
    }

    async getPerson(personId: number): Promise<IPerson> {
        return await this.api.get<IPerson>(`people/${personId}/`, undefined, this.normalize) as any as Promise<IPerson>;
    }
}
