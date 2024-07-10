import { Component, OnInit } from '@angular/core';
import { IVehicle } from '../api/models/vehicle.model';
import { VehiclesService } from '../api/vehicles.api';

@Component({
    selector: 'app-vehicles-list',
    templateUrl: './vehicles.component.html',
    styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
    vehicles: IVehicle[] = [];
    page = 1;
    searchString?: string;
    loading = false;
    loadAll = false;
    sortBy?: keyof IVehicle;

    constructor(private vehiclesService: VehiclesService) { }

    ngOnInit() {
        this.loadNext();
    }

    clearSearch() {
        this.vehicles = [];
        this.page = 1;
        this.loadAll = false;
        this.loadNext();
    }

    goSearch() {
        this.vehicles = [];
        this.page = 1;
        this.loadAll = false;
        this.loadNext();
    }

    changeSort(sortBy: keyof IVehicle) { // because our backecd (swapi) doesn't support be sorting, thus sort by fe items only we already have
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
        this.vehicles = this.vehicles.sort((p1, p2) => this.sortResByString(p1[this.sortBy!] as string, p2[this.sortBy!] as string));
    }

    async loadNext() {
        if (this.loadAll || this.loading) return;

        try {
            this.loading = true;
            const vehicles = await this.vehiclesService.getVehicles(this.page, this.searchString);
            if (vehicles?.results.length) {
                this.vehicles.push(...vehicles.results);
                this.page++;
            }
            this.sort();
            if (vehicles?.next === null) {
                this.loadAll = true;
            }
        } finally {
            this.loading = false;
        }
    }
}
