/**
 * Created by max on 2017/4/27.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppHttpService, DataService, UC} from "../../plugins/globalservice";
declare var swal: any;

@Component({
    selector: 'repassword',
    templateUrl: 'repassword.html',
    styleUrls: ['repassword.scss']
})
export class RepasswordComponent implements OnInit {
    public identifyCodeSrc: string;//图形码地址
    public canAjax: boolean = true;//可以进行请求
    public mobileNo:string;//手机号
    public mobileNoidentifyCode:string;//图片验证码
    public showRepassword:boolean=false;//展示重置密码
    public password:string;//密码
    public repassword:string;//重复密码
    public mobileNoCode:string;//手机验证码
    constructor(public router: Router,
                public uc: UC,
                public dataService: DataService,
                public appHttpService: AppHttpService) {
    };

    ngOnInit() {
        this.identifyCodeSrc = "/api/quchong/web/get_identifying_code";
    }

    public doSendMobileCode(): void {
        let falg = true;
        if (this.mobileNo == "") {
            swal({
                title: "登录失败!",
                text: "111",
                type: "error"
            });
            falg = false;
            return
        }
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.mobileNo))) {
            swal({
                title: "提示!",
                text: "手机号码有误，请重新填写!",
                type: "error"
            });
            return;
        }
        let params = {
            params: {
                tel_mbl: this.mobileNo,
                code_type: 10,
                purpose: 10,
                validation_code:this.mobileNoidentifyCode
            }
        }
        if (this.canAjax && falg) {
            this.canAjax = false;
            let data = this.appHttpService.postData(this.uc.api.qc + "/send_mobile_code", params);
            data.subscribe(
                res => {
                    this.canAjax = true;
                    if (res.status) {
                        let data = res.data;
                        this.showRepassword=true;
                    } else {
                        this.canAjax = true;
                        this.reloadIdentifyCode();
                        swal({
                            title: "获取手机验证码失败!",
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
    public doResetPwd():void{
        if(!this.password||!this.repassword){
            swal({
                title: "提示!",
                text: "密码不能为空",
                type: "error",
            });
            return
        }
        if (this.password!=this.repassword){
            swal({
                title: "提示!",
                text: "两次密码输入不一致",
                type: "error",
            });
            return
        }
        if (!(/^[A-Za-z0-9._!@#]{6,16}$/.test(this.mobileNo))) {
            swal({
                title: "提示!",
                text: "密码长度6~16,只能包含数字、字母、._!@#",
                type: "error"
            });
            return;
        }
        let params = {
            params: {
                user_name: this.mobileNo,
                password: 10,
                validation_code:this.mobileNoCode
            }
        }
        if (this.canAjax) {
            this.canAjax = false;
            let data = this.appHttpService.postData(this.uc.api.qc + "/reset_password", params);
            data.subscribe(
                res => {
                    this.canAjax = true;
                    if (res.status) {
                        swal({
                            title: "重置密码成功!",
                            text: "稍后将跳转到登陆",
                            type: "success",
                            timer:1800
                        });
                        setTimeout(()=>{
                            this.router.navigateByUrl("/login");
                        },2000)
                        this.showRepassword=true;
                    } else {
                        this.reloadIdentifyCode();
                        swal({
                            title: "获取手机验证码失败!",
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
        this.identifyCodeSrc = this.uc.api.qc + '/get_identifying_code?ran=' + new Date().getTime();
    }
    public goBack(){
        this.router.navigateByUrl("/login");
    }
}
