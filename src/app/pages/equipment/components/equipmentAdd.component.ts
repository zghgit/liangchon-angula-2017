/**
 * Created by max on 2017/5/9.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Validators} from '@angular/forms';
import {AppHttpService, UC, DataService} from "../../../plugins/globalservice";

declare var swal;
@Component({
    selector: 'equipment-add',
    templateUrl: '../views/equipmentAdd.html'
})
export class EquipmentAddComponent implements OnInit {

    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router,
                public dataService: DataService) {
    }

    ngOnInit() {

    }

    //form数据
    public fields: Array<any> = [
        {
            label: "设备编号",
            key: "device_no",
            controlType: "input",
            inputType: "text",
            value: "",
            require: true,
            placeholder: "请输入设备编号",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "设备名称",
            key: "device_name",
            controlType: "input",
            inputType: "text",
            value: "",
            require: true,
            placeholder: "请输入设备名称",

            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "设备类型",
            key: "device_type",
            controlType: "radio",
            value: "1",
            require: true,
            options: [
                {value: "1", content: "充电桩"},
                {value: "2", content: "充值机"},
            ],
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "通讯方式",
            key: "communicate_type",
            controlType: "radio",
            value: "1",
            require: true,
            options: [
                {value: "1", content: "wifi"},
                {value: "2", content: "gprs"},
            ],
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "固定版本",
            key: "soft_ver",
            controlType: "input",
            inputType: "text",
            value: "",
            require: true,
            placeholder: "请输入固定版本",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "电表编号",
            key: "meters_no",
            controlType: "input",
            inputType: "text",
            value: "",
            require: true,
            placeholder: "请输入电表编号",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
            ]
        }
    ];

    saveData({value}={value}) {
        let params = {
            params: {
                device_no         :   (value.device_no).trim(),
                device_name       :   (value.device_name).trim(),
                device_type       :   value.device_type,
                communicate_type :    value.communicate_type,
                soft_ver :    value.soft_ver,
                meters_no :    value.meters_no,
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/add_device", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/equipment/equipmentList');
                } else {
                    swal("新增设备失败", res.error_msg, "error")
                }
            }
        )
    }
}
/**
 * Created by max on 2017/6/8.
 */
