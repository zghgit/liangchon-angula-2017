/**
 * Created by max on 2017/6/7.
 */
/**
 * Created by max on 2017/6/6.
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {AppHttpService, UC} from "../../../plugins/globalservice";
declare var swal: any;
@Component({
    selector: 'merchant-detail',
    templateUrl: '../views/merchantDetail.html'
})
export class merchantDetailComponent implements OnInit {
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
            .switchMap((params: Params) => this.appHttpService.getData(this.uc.api.qc + "/get_business_user/hash/"+params['id']));
        data.subscribe((res) => {
            if (res.status) {
                let _data = res.data;
                let module_permission = '';
                for (let i = 0; i < _data.module_permission.length; i++) {
                    module_permission += _data.module_permission[i].content + ', '
                }
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
                        label: '上级机构',
                        content: _data.parent_name
                    }, {
                        type: 'text',
                        label: '账户名称',
                        content: _data.user_name
                    },{
                        type: 'text',
                        label: '账户昵称',
                        content: _data.business_name
                    }, {
                        type: 'text',
                        label: '账户类型',
                        content: _data.user_type_name
                    }, {
                        type: 'text',
                        label: '启用状态',
                        content: _data.status==1?'启用':'禁用'
                    }, {
                        type: 'text',
                        label: '真实姓名',
                        content: _data.real_name
                    }, {
                        type: 'text',
                        label: '服务电话',
                        content: _data.service_phone
                    }, {
                        type: 'text',
                        label: '手机号',
                        content: _data.mobile_no
                    }, {
                        type: 'text',
                        label: '邮箱',
                        content: _data.email
                    }, {
                        type: 'text',
                        label: '业务地址',
                        content: business_address
                    },
                    {
                        type: 'text',
                        label: '营业执照-注册号',
                        content: _data.certificate_1
                    },
                    {
                        type: 'img',
                        label: '营业执照-照片',
                        src: _data.certificate_img_1
                    }, {
                        type: 'text',
                        label: '税务登记证-登记号',
                        content: _data.certificate_2
                    }, {
                        type: 'img',
                        label: '税务登记证-照片',
                        src: _data.certificate_img_2
                    }, {
                        type: 'text',
                        label: '组织结构代码',
                        content: _data.certificate_3
                    }, {
                        type: 'img',
                        label: '组织结构代码-照片',
                        src: _data.certificate_img_3
                    }, {
                        type: 'text',
                        label: '性质',
                        content: _data.enterprise_nature==1?'企业':_data.enterprise_nature==2?'个人':'个人工商户'
                    }, {
                        type: 'text',
                        label: '服务有效期至',
                        content: _data.service_validity
                    }, {
                        type: 'text',
                        label: '最小提现额度',
                        content: _data.min_withdraw_cash+" 元"
                    }, {
                        type: 'text',
                        label: '运维人员手机号码',
                        content: _data.maintenance_man_mobile
                    }, {
                        type: 'text',
                        label: '电费单价(元)',
                        content: _data.electricity_price||0
                    },{
                        type: 'text',
                        label: '权限',
                        content: module_permission
                    },{
                        type: 'text',
                        label: '结算',
                        content: _data.whether_settlement == 1 ? "是" : "否"
                    }
                ];
                if(_data.whether_settlement == 1){
                    this.plugins.table.data.push({
                        type: 'text',
                        label: '结算周期(月)',
                        content: _data.settlement_cycle
                    });
                    this.plugins.table.data.push({
                        type: 'text',
                        label: '结算日(日)',
                        content: _data.settlement_day
                    })
                }
            } else {
                swal({
                    title: "获取商户信息失败!",
                    text: res.error_msg,
                    type: "error"
                });
            }
        })
    }

}