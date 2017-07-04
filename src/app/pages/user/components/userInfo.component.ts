/**
 * Created by max on 2017/6/9.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {AppHttpService, UC,DataService} from "../../../plugins/globalservice";
declare var swal: any;
@Component({
    selector: 'user-info',
    templateUrl: '../views/userInfo.html'
})
export class UserInfoComponent implements OnInit {
    public plugins: any = {
        table: {
            data: []
        }
    };

    constructor(public appHttpService: AppHttpService,
                public uc: UC,
                public dataService:DataService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.getData(this.uc.api.qc + "/get_user/"+params['id']));
        data.subscribe((res) => {
            if (res.status) {
                let _data = res.data;
                let business_address = '';
                if(_data.province_code_name){
                    business_address += _data.province_code_name;
                }
                if(_data.city_code_name){
                    business_address += '-'+_data.city_code_name;
                }
                if(_data.district_code_name){
                    business_address += '-'+_data.district_code_name;
                }
                this.plugins.table.data = [
                    {
                        type: 'text',
                        label: '账户名称',
                        content: _data.user_name
                    }, {
                        type: 'text',
                        label: '用户昵称',
                        content: _data.business_name
                    }, {
                        type: 'text',
                        label: '真实姓名',
                        content: _data.real_name
                    },
                    {
                        type: 'text',
                        label: '账户类型',
                        content: _data.user_type_name
                    }, {
                        type: 'text',
                        label: '服务电话',
                        content: _data.service_phone
                    },
                    {
                        type: 'text',
                        label: '手机号码',
                        content: _data.mobile_no
                    },
                    {
                        type: 'text',
                        label: '启用状态',
                        content: _data.status == 1 ? '启用' : '禁用'
                    },
                    {
                        type: 'text',
                        label: '邮箱地址',
                        content: _data.email
                    }
                ];
                let admin_flg = this.dataService.getCookies("admin_flg");
                if (admin_flg == 1 && _data.user_type == 1) {
                    this.plugins.table.data.push({
                        type: 'text',
                        label: '联系地址',
                        content: _data.business_address
                    });
                }
                if (_data.user_type == 1 && admin_flg != 1) {
                    this.plugins.table.data.push({
                        type: 'text',
                        label: '业务地址',
                        content: business_address
                    });
                    var role = this.dataService.getCookies('role');
                    if (role == "商户") {
                        this.plugins.table.data.push({
                            type: 'text',
                            label: '电费单价(元)',
                            content: _data.electricity_price || 0
                        });
                        this.plugins.table.data.push({
                            type: 'text',
                            label: "结算",
                            content: _data.whether_settlement == 1 ? "是" : "否"
                        });
                        if (_data.whether_settlement == 1) {
                            this.plugins.table.data.push({
                                type: 'text',
                                label: '结算周期(月)',
                                content: _data.settlement_cycle
                            });
                            this.plugins.table.data.push({
                                type: 'text',
                                label: '结算日(日)',
                                content: _data.settlement_day
                            });
                        }
                    }
                }
                if (_data.user_type == 2) {
                    this.plugins.table.data.push({
                        type: 'text',
                        label: '联系地址',
                        content: _data.business_address
                    });
                    this.plugins.table.data.push({
                        type: 'text',
                        label: '部门名称',
                        content: _data.department
                    });
                    this.plugins.table.data.push({
                        type: 'text',
                        label: '工号',
                        content: _data.staff_no
                    });
                    this.plugins.table.data.push({
                        type: 'text',
                        label: '职位',
                        content: _data.position
                    })
                }

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