/**
 * Created by max on 2017/6/14.
 */
/**
 * Created by max on 2017/6/7.
 */
import {Component, OnInit} from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {Validators} from '@angular/forms';
import {AppHttpService, UC, DataService} from "../../../plugins/globalservice";
declare var swal;
@Component({
    selector: 'appMessagePush',
    templateUrl: '../views/appMessagePush.html'
})
export class AppMessagePushComponent implements OnInit {
    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router,
                public activatedRoute:ActivatedRoute,
                public dataService: DataService) {
    }

    ngOnInit() {
        let params = this.activatedRoute.params;
        params.subscribe(res => {
            let user = res.id;
            if(user){
                this.fields[0].value = "1";
                this.fields[1].hidden = false;
                this.fields[1].value = user;
                this.fields[1].options = [user];
                this.fields[2].hidden = true;
            }
        })

    }

    //form数据
    public fields: Array<any> = [
        {
            label: "推送范围",
            key: "push_type",
            controlType: "radio",
            value: "3",
            require: true,
            options: [
                {value: "1", content: "指定用户"},
                {value: "2", content: "指定区域"},
                {value: "3", content: "全部用户"},
            ],
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
            , click: (data) => {
            if (data == 1) {
                this.fields[1].hidden = false;
                this.fields[2].hidden = true;
            }
            if (data == 2) {
                this.fields[1].hidden = true;
                this.fields[2].hidden = false;
            }
            if (data == 3) {
                this.fields[1].hidden = true;
                this.fields[2].hidden = true;
            }

        }
        }, {
            label: "指定用户",
            key: "user_name",
            controlType: "inputadd",
            value: "",
            hidden:true,
            require: true,
            placeholder: "多个号码逐个添加!",
            content: "确认",
            options: []
        }, {
            label: "指定区域",
            key: "business_address",
            controlType: "address",
            require: true,
            hidden:true,
            hasChildGroup: true,
            url: this.uc.api.qc + '/get_geo_list/hash/',
            config: {
                province: {
                    name: 'province_code',
                    value: "0",
                    placeholder: "--请选择省--",
                },
                city: {
                    name: 'city_code',
                    value: "0",
                    placeholder: "--请选择市--",
                },
                area: {
                    name: 'district_code',
                    value: "0",
                    placeholder: "--请选择区--",
                }
            }
        }, {
            label: "推送内容",
            key: "push_content",
            controlType: "input",
            require: true,
            inputType: "textarea",
            placeholder: "请输入推送内容",
            validator: [
                Validators.required,
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
            ]
        },
    ];

    saveData({value}={value}) {
        let {push_type,user_name,business_address,push_content} = value;
        let temp_user_name;
        if (push_type == 1) {
            if (user_name==""){
                swal({
                    title: "推送失败!",
                    text: "至少选择一个用户",
                    type: "error",
                    timer:"1500"
                });
            }else {
                temp_user_name = JSON.parse(user_name);
                business_address.province_code="";
                business_address.city_code="";
                business_address.district_code="";
            }

        } else if(push_type == 2){
            if(business_address.proive_code==0&&business_address.city_code==0&&business_address.district==0){
                swal({
                    title: "推送失败!",
                    text: "至少选择一个地区",
                    type: "error",
                    timer:"1500"
                });
            }else {
                temp_user_name="";
            }
        }else {
            business_address.province_code="";
            business_address.city_code="";
            business_address.district_code="";
            temp_user_name="";
        }
        let params = {
            params: {
                push_type       : push_type,
                proive_code	    : business_address.province_code,
                city_code       : business_address.city_code,
                district        : business_address.district_code,
                push_content    : push_content,
                user_name       : temp_user_name
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/push_message_to_app/hash", params).subscribe(
            res => {
                if (res.status) {
                    swal({
                        title: "推送成功!",
                        text: "",
                        type: "success",
                        timer:"1500"
                    });
                } else {
                    swal("推送失败", res.error_msg, "error")
                }
            }
        )
    }
}