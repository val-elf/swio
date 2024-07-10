import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
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
