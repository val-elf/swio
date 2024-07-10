import { Component, OnInit } from '@angular/core';
import { IStarship } from '../api/models/starship.model';
import { StarshipService } from '../api/starships.api';

@Component({
    selector: 'app-starships-list',
    templateUrl: './starships.component.html',
    styleUrls: ['./starships.component.scss']
})
export class StarshipsComponent implements OnInit {
    ships: IStarship[] = [];
    searchString?: string;
    page = 1;
    loadAll = false;
    loading = false;
    sortBy?: keyof IStarship;

    constructor(private shipsService: StarshipService) { }

    async ngOnInit() {
        this.loadNext();
    }

    clearSearch() {
        this.ships = [];
        this.page = 1;
        this.loadAll = false;
        this.loadNext();
    }

    goSearch() {
        this.ships = [];
        this.page = 1;
        this.loadAll = false;
        this.loadNext();
    }

    changeSort(sortBy: keyof IStarship) { // because our backecd (swapi) doesn't support be sorting, thus sort by fe items only we already have
        this.sortBy = sortBy;
        this.sort();
    }

    sortResByString(string1: string, string2: string) {
        if (string1 > string2) return 1;
        if (string1 < string2) return -1;
        return 0;
    }

    sort() {
        if (!this.sortBy) return;
        this.ships = this.ships.sort((p1, p2) => this.sortResByString(p1[this.sortBy!] as string, p2[this.sortBy!] as string));
    }

    async loadNext() {
        if (this.loadAll || this.loading) return;

        this.loading = true;
        try {
            const ships = await this.shipsService.getStarships(this.page, this.searchString);
            if (ships?.results.length) {
                this.ships.push(...ships.results);
                this.page++;
            }
            this.sort();
            this.loadAll = ships?.next === null;
        } finally {
            this.loading = false;
        }
    }
}
