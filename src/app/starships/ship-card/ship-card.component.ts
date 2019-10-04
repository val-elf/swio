import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-ship-card',
    templateUrl: './ship-card.component.html',
    styleUrls: ['./ship-card.component.less']
})
export class ShipCardComponent {
    @Input() ship;

}
