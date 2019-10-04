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
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { VehiclesComponent } from './vehicles.component';

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
    exports: [VehiclesComponent],
    declarations: [VehiclesComponent, VehicleCardComponent]
})
export class VehiclesModule { }
