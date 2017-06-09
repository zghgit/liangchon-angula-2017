/**
 * Created by max on 2017/6/9.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {AppHttpService, UC, DataService} from "../../../plugins/globalservice";
declare var swal: any;
@Component({
    selector: 'childaccount-detail',
    templateUrl: '../views/childaccountDetail.html'
})
export class ChildAccountDetailComponent implements OnInit {
    public plugins: any = {
        table: {
            data: []
        }
    };

    constructor(public appHttpService: AppHttpService,
                public uc: UC,
                public dataService: DataService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.getData(this.uc.api.qc + "/get_sub_user/hash/" + params['id']));
        data.subscribe((res) => {
            if (res.status) {
                let _data = res.data;
                let module_permission = '';
                for (let i = 0; i < _data.module_permission.length; i++) {
                    module_permission += _data.module_permission[i].content + ', '
                }
                let admin_flg = this.dataService.getCookies("admin_flg");//1是微云冲  2是另外三个

                this.plugins.table.data = [
                    {
                        type: 'text',
                        label: '上级机构',
                        content: _data.parent_name
                    }, {
                        type: 'text',
                        label: '账户名',
                        content: _data.user_name
                    }, {
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
                        content: _data.status == 1 ? '启用' : '禁用'
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
                        label: '联系地址',
                        content: _data.business_address
                    }, {
                        type: 'text',
                        label: '部门名称',
                        content: _data.department
                    }, {
                        type: 'text',
                        label: '工号',
                        content: _data.staff_no
                    }, {
                        type: 'text',
                        label: '职位',
                        content: _data.position
                    }, {
                        type: 'text',
                        label: '权限模板',
                        content: _data.role
                    }, {
                        type: 'text',
                        label: '权限',
                        content: module_permission
                    }, {
                        type: 'text',
                        label: '服务有效期至',
                        content: _data.service_validity
                    }
                ];
                if (admin_flg == 2) {
                    this.plugins.table.data.splice(13,0,{
                        type: 'text',
                        label: '最小提现额度',
                        content: _data.min_withdraw_cash + " 元"
                    })
                }
            } else {
                swal({
                    title: "获取子账户信息失败!",
                    text: res.error_msg,
                    type: "error"
                });
            }
        })
    }

}