/**
 * Created by max on 2017/6/2.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Validators} from '@angular/forms';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {TenValidator} from  "../../../plugins/validators/tenValidator"

declare var swal;
@Component({
    selector: 'commodity-add',
    templateUrl: '../views/commodityAdd.html',
    styleUrls: ['../styles/commodityAdd.scss']
})
export class CommodityAddComponent implements OnInit {
    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router) {
    }

    ngOnInit() {

    }

    //form数据
    public fields = [
        {
            label: "商品名称",
            key: "commodity_name",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入商品名称",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "商品描述",
            key: "commodity_description",
            controlType: "input",
            require: true,
            inputType: "textarea",
            placeholder: "请输入商品描述",
            validator: [
                Validators.required,
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
            ]
        }, {
            label: "充电时长(分钟)",
            key: "charge_duration",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入充电时长",
            validator: [
                Validators.required,
                Validators.pattern("^[0-9]+$"),
                TenValidator
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
                {type: "pattern", content: "只能是数字"},
                {type: "TenValidator", content: "充电时长只能是10的倍数"},
            ]
        }, {
            label: "价格(元)",
            key: "charge_price",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入价格",
            validator: [
                Validators.required,
                Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$"),
                Validators.min(0.01),
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
                {type: "pattern", content: "请填写正确的价格(如：1.00)元"},
                {type: "min", content: "商品最低价格为0.01元"},
            ]
        }, {
            label: "启用状态",
            key: "status",
            controlType: "radio",
            value: "1",
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
        }
    ];

    saveData({value}={value}) {
        let params = {
            params: value
        }
        this.appHttpService.postData(this.uc.api.qc + "/add_commodity/hash", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/commodity/commodityList');
                } else {
                    swal("新增商品失败", res.error_msg, "error")
                }
            }
        )
    }
}