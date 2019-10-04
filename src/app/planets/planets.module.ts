import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { PlanetCardComponent } from './planet-card/planet-card.component';
import { PlanetsComponent } from './planets.component';

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        FormsModule,
        MatSelectModule
    ],
    exports: [PlanetsComponent],
    declarations: [PlanetsComponent, PlanetCardComponent]
})
export class PlanetsModule { }
