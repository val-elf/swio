import { Component, Input } from '@angular/core';
import { IPlanet } from '@src/app/api/models/planet.models';

@Component({
    selector: 'app-planet-card',
    templateUrl: './planet-card.component.html',
    styleUrls: ['./planet-card.component.scss']
})
export class PlanetCardComponent {
    @Input() planet?: IPlanet;
}
