import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { PeopleComponent } from './people.component';
import { PersonCardComponent, PersonCardDetailsComponent } from './person/person-card.component';
import { PersonProfileComponent } from './person/person-profile.component';

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
    declarations: [PeopleComponent, PersonCardComponent, PersonCardDetailsComponent, PersonProfileComponent]
})
export class PeopleModule { }
