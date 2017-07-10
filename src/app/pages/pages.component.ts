/**
 * Created by max on 2017/4/27.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppHttpService, DataService, UC, GlobalState} from "../plugins/globalservice";
declare var swal: any;
@Component({
    selector: 'pages-component',
    templateUrl: 'pages.html',
    styleUrls: ["pages.scss"]
})
export class PagesComponent implements OnInit {
    public nav: any;
    public isShrinked: boolean = false;//主菜单收缩
    public config: any = {};

    constructor(public router: Router,
                public dataService: DataService,
                public globalState: GlobalState,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        this.nav = this.dataService.getLocalStorage("powernav");
        this.globalState.toggleMenu.subscribe((data: boolean) => {
            this.isShrinked = data;
        })
        let role=(this.dataService.getCookies("role")).toString();
        this.config.role = decodeURI(role);
        this.config.user_name = this.dataService.getCookies("user_name");
        this.config.logout = () => {
            let data = this.appHttpService.login(this.uc.api.qc + "/logout");
            data.subscribe((res) => {
                if (res.status) {
                    this.router.navigateByUrl("/login");
                    this.dataService.clearAll();
                }
                else {
                    swal({
                        title: "退出失败!",
                        text: res.error_msg,
                        type: "error"
                    });
                }
            })
        }
    }

}
