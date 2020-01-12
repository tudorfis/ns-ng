import { Component, Input } from '@angular/core';
import { isAndroid, isIOS, Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { UIService } from '../../ui.service';

declare var android: any;

@Component({
    selector: 'ns-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent {
    @Input() title: string;
    @Input() showBackButton: boolean = true;
    @Input() hasMenu: boolean = true;

    constructor(
        private router: RouterExtensions,
        private page: Page,
        private uiService: UIService
    ) { }

    get android() {
        return isAndroid;
    }

    get canGoBack() {
        return this.router.canGoBack() && this.showBackButton;
    }

    onLoadedActionBar() {
        if (isAndroid) {
            const androidToolbar = this.page.actionBar.nativeView;
            const backButton = androidToolbar.getNavigationIcon();
            if (backButton) {
                backButton.setColorFilter(
                    android.graphics.Color.parseColor('#171717'),
                    (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
                );
            }
        }
    }

    onGoBack() {
        this.router.backToPreviousPage();
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }
}
