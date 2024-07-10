import { Component, Input } from '@angular/core';
import { IStarship } from '@src/app/api/models/starship.model';

@Component({
    selector: 'app-ship-card',
    templateUrl: 'ship-card.component.html',
    styleUrls: ['ship-card.component.scss']
})
export class ShipCardComponent {
    @Input() ship?: IStarship;
}
