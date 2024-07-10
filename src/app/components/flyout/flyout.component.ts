import { Component, ContentChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-flyout',
    templateUrl: './flyout.component.html',
    styleUrls: ['./flyout.component.scss']
})
export class FlyoutComponent  {
    @Input() target?: Element;
    @ContentChild('flyout', { static: true }) flyoutElement?: ElementRef;
    @Output() changeFlyout = new EventEmitter();
    @Output() startFly = new EventEmitter();

    state = 'flyIn';
    boundings?: DOMRect;

    constructor(private host: ElementRef) { }

    get contentElement() { return this.flyoutElement?.nativeElement as Element; }

    fly() {
        if (this.state === 'flyOut') {
            return;
        }
        this.startFly.emit(true);
        this.state = 'flyOut';
        const { style } = this.flyoutElement?.nativeElement;

        style.transform = 'none';
        style.transition = 'none';
        this.boundings = this.contentElement.getBoundingClientRect() as DOMRect;
        this.target?.appendChild(this.contentElement);
        Object.assign(style, {
            transform: null,
            transition: null,
            left: `${this.boundings.left}px`,
            top: `${this.boundings.top}px`
        });
        const result = new Promise<void>(resolve => {
            const { nativeElement } = this.flyoutElement!;
            const tender = () => {
                nativeElement.removeEventListener('transitionend', tender);
                this.changeFlyout.emit(true);
                resolve();
            };
            nativeElement.addEventListener('transitionend', tender);
        });
        setTimeout(() => {
            Object.assign(this.flyoutElement?.nativeElement.style, {
                left: '5vw',
                top: '5vh',
                width: '90vw',
                height: '90vh',
                transform: 'none'
            });
        });
        return result;
    }

    flyBack() {
        if (this.state === 'flyIn') {
            return;
        }
        this.state = 'flyIn';
        const { style } = this.flyoutElement?.nativeElement;

        style.cssText = '';
        Object.assign(style, {
            left: `${this.boundings?.left}px`,
            top: `${this.boundings?.top}px`
        });

        setTimeout(() => this.startFly.emit(false));
        setTimeout(() => {
            style.cssText = '';
            this.host.nativeElement.appendChild(this.contentElement);
            this.changeFlyout.emit(false);
        }, 500);
    }
}
