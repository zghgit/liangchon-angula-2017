/**
 * Created by max on 2017/5/8.
 */
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
@Injectable()

export class GlobalState {
    public location = new Subject();
    public expanded = new Subject();
    public toggleMenu = new Subject();//主菜单收缩

    constructor() {

    };

    public notifyLocation(isOpen: boolean) {
        this.location.next(isOpen)
    };

    public notifyExpanded(isOpen: boolean) {
        this.expanded.next(isOpen)
    };

    public notifyToggleMenu(isOpen: boolean) {
        this.toggleMenu.next(isOpen)
    }
}