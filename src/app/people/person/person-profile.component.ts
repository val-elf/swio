import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeciesService } from '@src/app/api/species.api';
import { PeopleService } from '~/app/api/people.api';
import { PersonCardDetailsComponent } from './person-card.component';

@Component({
    template: ''
})
export class PersonProfileComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog,
        private peopleService: PeopleService,
        private speciesService: SpeciesService
    ) {
        this.route.url.subscribe((evt) => {
            this.showPersonCard();
        });
    }

    dref?: MatDialogRef<PersonCardDetailsComponent>;

    get personId() {
        return this.route.snapshot.paramMap.get('personId');
    }

    async showPersonCard() {
        if (this.dref) {
            this.dref.close();
        }
        const pid = this.personId;
        const person = await this.peopleService.getPerson(Number(pid));
        if (person?.species.length) {
            person.race = await this.speciesService.getSpecie(person.species[0] as number);
        }
        this.dref = this.dialog.open(PersonCardDetailsComponent, {
            data: { person }
        });

    }
}
