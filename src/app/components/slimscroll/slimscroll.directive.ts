import { Directive, ElementRef, HostBinding, OnInit, HostListener, Output, EventEmitter, OnDestroy } from '@angular/core';

@Directive({
    selector: '[slimScroll]',
})
export class SlimScrollDirective implements OnInit, OnDestroy {
    scrollSlider = document.createElement('div');
    scrollWrapper = document.createElement('div');
    @Output() reachEnd = new EventEmitter();
    @Output() reachStart = new EventEmitter();
    isHover = false;


    constructor(private host: ElementRef) { }

    @HostBinding('class.scrollbar-container') hostClass = true;

    @HostListener('mouseenter')
    mouseEnter() {
        this.isHover = true;
        if (this.scrollHeight <= this.host.nativeElement.offsetHeight) return;
        this.scrollWrapper.classList.add('scroller-over');
    }

    @HostListener('mouseleave')
    mouseLeave() {
        this.isHover = false;
        this.scrollWrapper.classList.remove('scroller-over');
    }

    ngOnInit() {
        this.scrollWrapper = document.createElement('div');
        this.scrollWrapper.className = 'scroller';
        this.host.nativeElement.parentNode.appendChild(this.scrollWrapper);
        this.scrollWrapper.appendChild(this.host.nativeElement);

        const mutation = new MutationObserver((mdata) => {
            this.recalculate();
            if (this.isHover) this.mouseEnter();
        });

        mutation.observe(this.host.nativeElement, { subtree: true, childList: true });

        this.scrollSlider.className = 'scroller-port_slider';
        const scrollPort = document.createElement('div');
        scrollPort.appendChild(this.scrollSlider);
        scrollPort.className = 'scroller-port';
        this.scrollWrapper.appendChild(scrollPort);
        setTimeout(() => this.recalculate());
    }

    ngOnDestroy() {
        this.scrollWrapper.remove();
    }

    get scrollTop() { return this.host.nativeElement.scrollTop; }

    get scrollHeight() { return this.host.nativeElement.scrollHeight; }

    get scrollPos() {
        return this.scrollTop / (this.scrollHeight - this.host.nativeElement.clientHeight);
    }

    get element() { return this.host.nativeElement; }

    @HostListener('scroll')
    scroll() {
        this.recalculate();
    }

    get scrollable() {
        return this.scrollHeight > this.host.nativeElement.offsetHeight;
    }

    private recalculate() {
        const pos = this.scrollPos;
        if (!this.scrollable) this.reachEnd.emit();
        else {
            if (Math.round(pos * 1000) / 1000 === 1) this.reachEnd.emit();
            if (pos === 0) this.reachStart.emit();
        }
        this.scrollSlider.style.top = `${pos * 100}%`;
    }
}
