/**
 * Created by max on 2017/5/8.
 */
import {Component, Input} from "@angular/core";
import {Router, RouterState, RouterStateSnapshot} from '@angular/router';
import {Location} from '@angular/common';
import {DataService, GlobalState,UC} from "../../plugins/globalservice";

@Component({
    selector: "uc-page-top",
    templateUrl: "ucPageTop.html",
    styleUrls: ["ucPageTop.scss"]
})
export class UcPageTopComponent {
    @Input() model;
    public menu: any;
    public isShrinked: boolean = false;//主菜单收缩
    public isShowUserItem: boolean = false;
    public navigation:any = {};
    constructor(public router: Router,
                public globalState: GlobalState,
                public dataService: DataService,
                public uc:UC,
                public location: Location,) {
    };

    public ngOnInit(): void {
        this.globalState.toggleMenu.subscribe((data: boolean) => {
            this.isShrinked = data;
        })
        let userId = this.dataService.getCookies("user_id");
        //用户模块的url
        this.navigation = {
            userInfo:{
                show:true,
                href:"user/userInfo/"+userId
            },
            userEdit:{
                show:true,
                href:"user/userEdit/"+userId
            },
            userPwdEdit:{
                show:true,
                href:"user/userPwdEdit/"+userId
            },
            payConfigList:{
                show:this.uc.powerfun(this.uc.constant.get_alipay_config) || this.uc.powerfun(this.uc.constant.get_wxpay_config) || this.uc.powerfun(this.uc.constant.get_foucs_wyc_wx_user),
                href:"user/payConfigList"
            }
        }
    };

    public toggleMenu() {
        this.isShrinked = !this.isShrinked;
        this.globalState.notifyToggleMenu(this.isShrinked);
    };

    public currentPosition() {
        let routerState: RouterState = this.router.routerState;
        let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;
        let path = routerStateSnapshot.url;
        this.menu = this.dataService.getLocalStorage("powernav");
        for (let key in this.menu) {
            if (this.menu[key].hasSubmenu) {
                let submenu = this.menu[key].submenu;
                for (let key in submenu) {
                    if (submenu[key].href && path.indexOf(submenu[key].href) >= 0) {
                        return submenu[key].name;
                    }
                }
            } else {
                if (path.indexOf(this.menu[key].href) >= 0) return this.menu[key].name;
            }
        }
    }

    public showUserItem() {
        this.isShowUserItem = true;
    }

    public closeUserItem() {
        this.isShowUserItem = false;
    }

    public goBack(): void {
        this.location.back();
    }
}
