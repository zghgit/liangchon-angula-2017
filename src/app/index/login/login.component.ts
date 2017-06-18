/**
 * Created by max on 2017/4/27.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot} from '@angular/router';
import {User} from "../loginDataModel";
import {AppHttpService, DataService, UC} from "../../plugins/globalservice";
declare var swal: any;

@Component({
    selector: 'login.component',
    templateUrl: 'login.html',
    styleUrls: ['login.scss']
})
export class LoginComponent implements OnInit {
    public user: User = new User();
    public identifyCodeSrc: string;
    public canAjax: boolean = true;

    constructor(public router: Router,
                public activatedRoute: ActivatedRoute,
                public uc: UC,
                public dataService: DataService,
                public appHttpService: AppHttpService) {
    };

    ngOnInit() {
        let activatedRouteSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
        let routerState: RouterState = this.router.routerState;
        let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;
        console.log(activatedRouteSnapshot);
        console.log(routerState);
        console.log(routerStateSnapshot);
        this.identifyCodeSrc = "/api/wyc/get_identifying_code/hash";
        console.log(this.uc.navModel)
    }

    public doLogin(): void {
        let falg = true;
        if (this.user.userName == "") {
            swal({
                title: "登录失败!",
                text: "111",
                type: "error"
            });
            falg = false;
            return
        }
        let params = {
            params: {
                user_name: this.user.userName,
                password: this.user.password,
                validate_code: this.user.identifyCode
            }
        }
        if (this.canAjax && falg) {
            this.canAjax = false;
            let data = this.appHttpService.postData(this.uc.api.qc + "/login/hash", params);
            data.subscribe(
                res => {
                    this.canAjax = true;
                    if (res.status) {
                        let data = res.data;
                        this.dataService.setCookies("admin_flg", data.admin_flg);
                        this.dataService.setCookies("role", encodeURI(data.role));
                        console.log(data.role);
                        this.dataService.setCookies("user_name", data.user_name);
                        this.dataService.setCookies("user_type", data.user_type);
                        this.dataService.setCookies("user_id", data.user_id);
                        this.dataService.setCookies("parent_id", data.parent_id);
                        this.dataService.setCookies("parent_name", data.parent_user_name);
                        //存在服务里
                        this.dataService.setLocalStorage("module_permission", data.module_permission);
                        this.dataService.setLocalStorage("powerapi", data.api);
                        // this.dataService.setLocalStorage("powernav", JSON.parse(data.navigation));
                        this.dataService.setLocalStorage("powernav", this.uc.navModel);
                        //存在本地
                        localStorage.setItem('module_permission', JSON.stringify(data.module_permission));
                        localStorage.setItem('powerapi', JSON.stringify(data.api));
                        // localStorage.setItem('powernav', JSON.stringify(JSON.parse(data.navigation)));
                        localStorage.setItem('powernav', JSON.stringify(this.uc.navModel));
                        //导航
                        this.dataService.setCookies("menu","home");
                        this.router.navigateByUrl("/pages");
                    } else {
                        this.canAjax = true;
                        this.reloadIdentifyCode();
                        swal({
                            title: "登录失败!",
                            text: res.error_msg,
                            type: "error"
                        });
                    }
                },
                error => {
                    console.log(error)
                }
            )
        }

    }

    public reloadIdentifyCode(): void {
        this.identifyCodeSrc = this.uc.api.qc + '/get_identifying_code/hash?ran=' + new Date().getTime();
    }
}
