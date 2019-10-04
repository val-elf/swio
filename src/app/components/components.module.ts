import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FlyoutComponent } from './flyout/flyout.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { SlimScrollDirective } from './slimscroll/slimscroll.directive';

const exported = [FlyoutComponent, MenuItemComponent, SlimScrollDirective];

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [...exported],
    declarations: [...exported]
})
export class ComponentsModule { }
