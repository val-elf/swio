import { Component, HostBinding, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IPerson } from '@src/app/api/models/people.models';
import { IPlanet } from '@src/app/api/models/planet.models';
import { ISpecie } from '@src/app/api/models/specie.model';
import { PeopleService } from '@src/app/api/people.api';
import { PlanetsService } from '@src/app/api/planets.api';
import { SpeciesService } from '@src/app/api/species.api';

interface PersonData {
    person: IPerson;
}

@Component({
    selector: 'app-person-details',
    templateUrl: 'person-card.component.html',
    styleUrls: ['person-card.component.scss']
})
export class PersonCardDetailsComponent {
    person: IPerson;

    constructor(
        private planetService: PlanetsService,
        private peopleService: PeopleService,
        public dialogRef: MatDialogRef<PersonCardDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PersonData
    ) {
        this.person = this.data.person;
    }

    @HostBinding('class') mode = 'detailed';

    homeworldName?: string;
    planet?: IPlanet;
    homeLoad?: Promise<IPlanet>;
    countrymenLoad?: Promise<IPerson[]>;
    species?: ISpecie[];

    get homeworld() {
        if (this.homeLoad) return this.homeLoad;
        this.homeLoad = (async () => {
            this.planet = await this.planetService.getPlanet(this.person.homeworld as number);
            this.homeworldName = this.planet?.name;
            return this.planet!;
        })();
        return this.homeLoad;
    }

    countrymen?: IPerson[];

    get acountrymen() {
        if (this.countrymenLoad) return this.countrymenLoad;
        this.countrymenLoad = (async () => {
            const planet = await this.homeworld;
            const res = await Promise.all(planet.residents.map(resident => this.peopleService.getPerson(resident as number)!));
            this.countrymen = res!.filter(p => p!.url !== this.person.url)!;
            return this.countrymen!;
        })();
        return this.countrymenLoad;
    }
}

@Component({
    selector: 'app-person-card',
    templateUrl: './person-card.component.html',
    styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent implements OnInit {
    @Input() person?: IPerson;
    @HostBinding('class') mode = 'short';

    species?: ISpecie[];
    planet?: IPlanet;
    homeworld?: Promise<IPlanet>;
    homeworldName?: string;
    acountrymen?: Promise<IPerson[]>;
    countrymen?: IPerson[];

    constructor(
        private speciesService: SpeciesService,
        public dialog: MatDialog,
    ) { }

    async ngOnInit() {
        if (this.person) {
            this.person.race = this.species && this.species.length ? this.species[0] : null;
            this.species = await Promise.all(
                this.person.species.map((specieId) =>
                    this.speciesService.getSpecie(specieId as number)
            ));
        }
    }

    showDetailed() {
        this.dialog.open(PersonCardDetailsComponent, {
            data: { person: this.person }
        });
    }
}
