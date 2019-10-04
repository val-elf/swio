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
import { ShipCardComponent } from './ship-card/ship-card.component';
import { StarshipsComponent } from './starships.component';

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
    exports: [StarshipsComponent],
    declarations: [StarshipsComponent, ShipCardComponent]
})
export class StarshipsModule { }
