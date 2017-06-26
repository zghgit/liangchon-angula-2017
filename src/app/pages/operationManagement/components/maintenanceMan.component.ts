/**
 * Created by max on 2017/6/12.
 */
import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {AppHttpService, UC} from "../../../plugins/globalservice";

declare var swal;
@Component({
    selector: 'maintenanceMan',
    templateUrl: '../views/maintenanceMan.html'
})
export class MaintenanceManComponent implements OnInit {
    public fields: Array<any>
    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router,
                public activatedRoute: ActivatedRoute,) {
    }

    ngOnInit() {
        let data = this.appHttpService.getData(this.uc.api.qc+"/get_user/hash/");
        data.subscribe(res => {
            if (res.status) {
                let _data = res.data;
                let maintenance_man_mobile = [];
                if(_data.maintenance_man_mobile){
                    maintenance_man_mobile = _data.maintenance_man_mobile.split(",")
                }
                this.fields = [
                     {
                        label: "运维人员手机号码",
                        key: "maintenance_man_mobile",
                        controlType: "inputadd",
                        value: _data.maintenance_man_mobile,
                        placeholder: "多个号码逐个添加!",
                        content: "确认",
                        options: maintenance_man_mobile
                    },
                ];
            } else {
                swal({
                    title: "获取运维人员信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"1500"
                });
            }
        })
    }

    saveData({value}={value}) {
        let {maintenance_man_mobile} = value;
        let _maintenance_man_mobile = "";
        if (maintenance_man_mobile){
            _maintenance_man_mobile = (JSON.parse(maintenance_man_mobile)).join(",")
        };
        let params = {
            params: {
                user_info:{
                    maintenance_man_mobile: _maintenance_man_mobile,
                }
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/update_user_info/hash", params).subscribe(
            res => {
                if (res.status) {
                    location.reload();
                } else {
                    swal("编辑运维人员失败", res.error_msg, "error")
                }
            }
        )
    }
}