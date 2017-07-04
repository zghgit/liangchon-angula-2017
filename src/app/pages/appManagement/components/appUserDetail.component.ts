/**
 * Created by max on 2017/6/14.
 */
/**
 * Created by max on 2017/6/14.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {AppHttpService, UC} from "../../../plugins/globalservice";
declare var swal: any;
@Component({
    selector: 'appuser-detail',
    templateUrl: '../views/appUserDetail.html'
})
export class AppUserDetailComponent implements OnInit {
    public advertisement_id: string;
    public plugins: any = {
        table: {
            data: []
        }
    };

    constructor(public appHttpService: AppHttpService,
                public uc: UC,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_app_user/", {
                params: {
                    app_user_id: params['id']
                }
            }));
        data.subscribe((res) => {
            if (res.status) {
                let _data = res.data;
                let areas = '';
                if (_data.province) {
                    areas += _data.province;
                }
                if (_data.city) {
                    areas += '-' + _data.city;
                }
                if (_data.district) {
                    areas += '-' + _data.district;
                }
                this.plugins.table.data = [
                    {
                        type: 'text',
                        label: '用户账户',
                        content: _data.app_user_name
                    }, {
                        type: 'text',
                        label: '用户昵称',
                        content: _data.nickname
                    }, {
                        type: 'text',
                        label: '手机号码',
                        content: _data.app_user_name
                    }, {
                        type: 'text',
                        label: '启用状态',
                        content: _data.status == 1 ? '启用' : '禁用'
                    }, {
                        type: 'text',
                        label: '充点',
                        content: _data.yun_coin
                    }, {
                        type: 'text',
                        label: '性别',
                        content: _data.sex
                    }, {
                        type: 'text',
                        label: '生日',
                        content: _data.birthday
                    }, {
                        type: 'text',
                        label: '邮箱',
                        content: _data.email
                    }, {
                        type: 'text',
                        label: '所在地区',
                        content: areas
                    }, {
                        type: 'text',
                        label: '家庭地址',
                        content: _data.home_address
                    }
                ];
            } else {
                swal({
                    title: "获取用户信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"2000"
                });
            }
        })
    }

}