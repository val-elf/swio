import {
    Component,
    EventEmitter,
    ElementRef,
    Input,
    Output,
    ViewChild,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { FlyoutComponent } from '../flyout/flyout.component';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.less']
})
export class MenuItemComponent implements OnChanges {
    @Input() target: ElementRef;
    @Input() className: string;
    @Input() routeName: string;
    @Output() menuClick: EventEmitter<any> = new EventEmitter();
    @Input() active: boolean;

    @ViewChild(FlyoutComponent, { static: true }) flyout: FlyoutComponent;

    flyOuted = false;
    inFlyOut = false;
    flyDirection = false;

    get isFlyOut() {
        return this.flyOuted && !this.inFlyOut;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.active) {
            if (this.active) {
                this.flyout.fly();
            } else {
                this.inFlyOut = true;
                this.flyOuted = false;
                this.flyout.flyBack();
            }
        }
    }

    startFly(direction) {
        this.inFlyOut = true;
        this.flyDirection = direction;
    }

    changeFlyout(flyOut) {
        this.inFlyOut = false;
        this.flyOuted = flyOut;
    }

    async click() {
        this.active = true;
        this.flyout.fly();
        this.menuClick.emit(this.routeName);
    }
}
