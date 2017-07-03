/**
 * Created by max on 2017/5/4.
 */

import {Component} from "@angular/core";
import {Router} from '@angular/router';
import {DataService, GlobalState} from "../../plugins/globalservice";

declare var swal;

@Component({
    selector: "uc-menu",
    templateUrl: "ucMenu.html",
    styleUrls: ["ucMenu.scss"]
})
export class UcMenuComponent {
    public ucMenu: any;
    public menu: Array<any>;
    public isShrinked: boolean = false;//主菜单收缩
    public isShowSubmenu: any = {
        home: false,
        account: false,
        equipment: false,
        order: false,
        finance: false,
        advertisement: false,
        charge: false,
        commodity: false,
        appManagement: false,
        operationAnalysis: false,
        complained: false,
        rechargeCard: false,
        setting: false,
        operationManagement:false,
    };
    public menuItemSelected: any = {
        home: false,
        account: false,
        equipment: false,
        order: false,
        finance: false,
        advertisement: false,
        charge: false,
        commodity: false,
        appManagement: false,
        operationAnalysis: false,
        complained: false,
        rechargeCard: false,
        setting: false,
        operationManagement:false,
    };

    constructor(public router: Router,
                public globalState: GlobalState,
                public dataService: DataService) {
        let menu = this.dataService.getCookies("menu");
        this.isShowSubmenu[menu] = this.isShowSubmenu[menu] ? false : true;
        this.menuItemSelected[menu] = this.menuItemSelected[menu] ? false : true;
    };

    public ngOnInit(): void {
        this.menu = this.dataService.getLocalStorage("powernav");
        if(!this.menu){
            swal({
                title: "登陆超时!",
                text: "请重新登陆",
                type: "error",
                confirmButtonText: "OK",
            }).then(()=> {
                this.dataService.clearAll();
                location.href="";
            });
        }
        // for (let i in this.ucMenu) {
        //     this.menu.push(this.ucMenu[i])
        // }
        this.globalState.toggleMenu.subscribe((data: boolean) => {
            this.isShrinked = data;
            if (data) {
                for (let key in this.isShowSubmenu) {
                    if (this.isShowSubmenu[key]) {
                        this.dataService.setCookies("menu", key);
                    }
                    this.isShowSubmenu[key] = false;
                }
            } else {
                let menu = this.dataService.getCookies("menu");
                this.isShowSubmenu[menu] = this.isShowSubmenu[menu] ? false : true;
            }
        })
    }

    //点击主菜单时展开主菜单
    public expandedMenu() {
        this.globalState.notifyToggleMenu(false);
    }

    //选中主菜单展开及展示子菜单
    public showSubmenu(title: string) {
        if (this.isShrinked) {
            this.expandedMenu();
            return
        }
        for (let key in this.isShowSubmenu) {
            if (key === title) {
                this.isShowSubmenu[title] = this.isShowSubmenu[title] ? false : true;
                this.menuItemSelected[title] = this.menuItemSelected[title] ? false : true;
                this.dataService.setCookies("menu", title);
            } else {
                this.isShowSubmenu[key] = false;
                this.menuItemSelected[key] = false;
            }
        }
    }
}
