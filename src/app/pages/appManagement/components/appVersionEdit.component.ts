/**
 * Created by max on 2017/7/5.
 */
import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {CustomValidators} from 'ng2-validation';

declare var swal;
@Component({
    selector: 'app-version-edit',
    templateUrl: '../views/appVersionEdit.html'
})
export class appVersionEditComponent implements OnInit {
    public ver_mgr_id: string;
    public fields: Array<any>;

    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router,
                public activatedRoute: ActivatedRoute,) {
    }

    ngOnInit() {
        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_version/", {
                params: {
                    ver_mgr_id: params['id']
                }
            }));
        data.subscribe(res => {
            if (res.status) {
                let _data = res.data;
                this.ver_mgr_id = _data.ver_mgr_id;
                this.fields = [{
                    label: "目标版本",
                    key: "ver_code",
                    controlType: "input",
                    inputType: "text",
                    require: true,
                    disabled: true,
                    value: _data.ver_code,
                    placeholder: "请输入目标版本"
                }, {
                    label: "上传apk版本",
                    key: "ver_link",
                    controlType: "file",
                    require: true,
                    hidden:_data.phone_type==20,
                    value: _data.ver_link,
                    config: {
                        value: _data.ver_link,
                        accept: ".apk",
                        disabled:true,
                        uploadurl: this.uc.api.qc + "/upload_file/",
                        downloadurl: this.uc.api.qc + "/get_file/",
                        capsule: "ver_link"
                    }
                }, {
                    label: "强制更新",
                    key: "force_update",
                    controlType: "radio",
                    value: _data.force_update||"1",
                    require: true,
                    options: [
                        {value: "1", content: "启用"},
                        {value: "2", content: "禁用"}
                    ],
                    validator: [
                        Validators.required
                    ],
                    errormsg: [
                        {type: "required", content: "必填项目"}
                    ]
                }, {
                    label: "版本描述",
                    key: "ver_description",
                    controlType: "input",
                    require: true,
                    inputType: "textarea",
                    placeholder: "请输入版本描述",
                    value: _data.ver_description,
                    validator: [
                        Validators.required,
                    ],
                    errormsg: [
                        {type: "required", content: "必填项目"},
                    ]
                }];
            } else {
                swal({
                    title: "获取APP版本信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer: "2000"
                });
            }
        })
    }

    saveData({value}={value}) {
        let params = {
            params: {
                ver_mgr_id: this.ver_mgr_id,
                ver_info: {
                    force_update: value.force_update,
                    ver_description: value.ver_description
                }
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/update_version", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/appManagement/appVersionList');
                } else {
                    swal("编辑APP版本失败", res.error_msg, "error")
                }
            }
        )
    }
}