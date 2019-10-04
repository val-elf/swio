import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../api/people.api';
import { IPerson } from '../api/models/people.models';

@Component({
    selector: 'app-people-list',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.less']
})
export class PeopleComponent implements OnInit {
    constructor(private peopleService: PeopleService) { }

    people: IPerson[] = [];
    page = 1;
    loadAll = false;
    loading = false;
    searchString: string;
    sortBy: string;

    ngOnInit() {
        this.loadNext();
    }

    clearSearch() {
        this.searchString = '';
        this.loadAll = false;
        this.people = [];
        this.page = 1;
        this.loadNext();
    }

    goSearch() {
        this.loadAll = false;
        this.people = [];
        this.page = 1;
        this.loadNext();
    }

    changeSort(sortBy) { // because our backecd (swapi) doesn't support be sorting, thus sort by fe items only we already have
        this.sortBy = sortBy;
        this.sort();
    }

    sortResByString(string1, string2) {
        if (string1 > string2) return 1;
        if (string1 < string2) return -1;
        return 0;
    }

    sort() {
        if (!this.sortBy) return;

        this.people = this.people.sort((p1, p2) => {
            const s1 = this.sortBy !== 'race' ? p1[this.sortBy] : p1.race ? p1.race.name : '';
            const s2 = this.sortBy !== 'race' ? p2[this.sortBy] : p2.race ? p2.race.name : '';
            return this.sortResByString(s1, s2);
        });
    }

    async loadNext() {
        if (this.loadAll || this.loading) return;

        this.loading = true;
        try {
            const people = await this.peopleService.getPeople(this.page, this.searchString);
            if (people.results.length) {
                this.people.push(...people.results);
                this.page++;
            }
            this.sort();
            this.loadAll = people.next === null;
        } finally {
            this.loading = false;
        }
    }
}
