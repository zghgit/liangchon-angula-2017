/**
 * Created by max on 2017/6/8.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {AppHttpService, UC} from "../../../plugins/globalservice";
declare var swal: any;
@Component({
    selector: 'agent-detail',
    templateUrl: '../views/agentDetail.html'
})
export class AgentDetailComponent implements OnInit {
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
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_agent_user/",{
                params: {
                    agent_id: params['id']
                }
            }));
        data.subscribe((res) => {
            if (res.status) {
                let _data = res.data;
                let module_permission = '';
                let basesrc=this.uc.api.qc+"/get_file/";
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
                        label: '手机号码',
                        content: _data.mobile_no
                    }, {
                        type: 'text',
                        label: '邮箱地址',
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
                        src: [basesrc+_data.certificate_img_1]
                    }, {
                        type: 'text',
                        label: '税务登记证-登记号',
                        content: _data.certificate_2
                    }, {
                        type: 'img',
                        label: '税务登记证-照片',
                        src: [basesrc+_data.certificate_img_2]
                    }, {
                        type: 'text',
                        label: '组织结构代码',
                        content: _data.certificate_3
                    }, {
                        type: 'img',
                        label: '组织结构代码-照片',
                        src: [basesrc+_data.certificate_img_3]
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
                        label: '权限',
                        content: module_permission
                    }
                ];
            } else {
                swal({
                    title: "获取代理商信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"2000"
                });
            }
        })
    }

}