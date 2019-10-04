import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../api/planets.api';
import { IPlanet } from '../api/models/planet.models';

@Component({
    selector: 'app-planets-list',
    templateUrl: './planets.component.html',
    styleUrls: ['./planets.component.less']
})
export class PlanetsComponent implements OnInit {
    planets: IPlanet[] = [];
    page = 1;
    searchString = '';
    loading = false;
    loadAll = false;
    sortBy: string;

    constructor(private planetsService: PlanetsService) { }

    ngOnInit() {
        this.loadNext();
    }

    clearSearch() {
        this.searchString = '';
        this.loadAll = false;
        this.planets = [];
        this.page = 1;
        this.loadNext();
    }

    goSearch() {
        this.loadAll = false;
        this.planets = [];
        this.page = 1;
        this.loadNext();
    }

    changeSort(sortBy) { // because our backecd (swapi) doesn't support be sorting, thus sort by fe items only we already have
        this.sortBy = sortBy;
        this.sort();
    }

    sortfnc(string1: string | number, string2: string | number) {
        if (string1 > string2) return 1;
        if (string1 < string2) return -1;
        return 0;
    }

    sort() {
        if (!this.sortBy) return;

        this.planets = this.planets.sort((p1, p2) => {
            const s1 = p1[this.sortBy];
            const s2 = p2[this.sortBy];
            return this.sortfnc(s1, s2);
        });
    }

    async loadNext() {
        if (this.loadAll || this.loading) return;

        this.loading = true;
        try {
            const planets = await this.planetsService.getPlanets(this.page, this.searchString);
            if (planets.results.length) {
                this.planets.push(...planets.results);
                this.page++;
            }
            this.sort();
            this.loadAll = planets.next === null;
        } finally {
            this.loading = false;
        }
    }
}
