import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { PeopleComponent } from './people.component';
import { PersonCardComponent, PersonCardDetailsComponent } from './person/person-card.component';
import { PersonProfileComponent } from './person/person-profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        FormsModule,
        RouterModule
    ],
    exports: [PeopleComponent, PersonCardComponent, PersonProfileComponent],
    entryComponents: [PersonCardDetailsComponent],
    declarations: [PeopleComponent, PersonCardComponent, PersonCardDetailsComponent, PersonProfileComponent]
})
export class PeopleModule { }
