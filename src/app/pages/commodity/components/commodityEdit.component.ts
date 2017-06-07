/**
 * Created by max on 2017/6/2.
 */
import {Component, OnInit} from '@angular/core';
import {Router,ActivatedRoute, Params} from "@angular/router";
import {Validators} from '@angular/forms';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {ChargeDurationValidator} from  "../../../plugins/validators/chargeDurationValidator"

declare var swal;
@Component({
    selector: 'commodity-edit',
    templateUrl: '../views/commodityEdit.html'
})
export class CommodityEditComponent implements OnInit {
    public fields:Array<any>;
    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router,
                public activatedRoute:ActivatedRoute
    ) {
    }
    public commodity_id:string;
    ngOnInit() {
        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_commodity/hash", {params: {commodity_id: params['id']}}));
        data.subscribe(res=>{
            console.log(res);
            if (res.status){
                let _data = res.data;
                this.commodity_id = _data.commodity_id;
                this.fields=[
                    {
                        label: "商品名称",
                        key: "commodity_name",
                        controlType: "input",
                        inputType: "text",
                        require: true,
                        value: _data.commodity_name,
                        placeholder: "请输入商品名称",
                        validator: [
                            Validators.required
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"}
                        ]
                    },
                    {
                        label: "商品描述",
                        key: "commodity_description",
                        controlType: "input",
                        require: true,
                        inputType: "textarea",
                        value:_data.commodity_description,
                        placeholder: "请输入商品描述",
                        validator: [
                            Validators.required,
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                        ]
                    },
                    {
                        label: "充电时长(分钟)",
                        key: "charge_duration",
                        controlType: "input",
                        inputType: "text",
                        require: true,
                        value: _data.charge_duration,
                        placeholder: "请输入充电时长",
                        validator: [
                            Validators.required,
                            Validators.pattern("^[0-9]+$"),
                            ChargeDurationValidator
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                            {type: "pattern", content: "只能是数字"},
                            {type: "ChargeDurationValidator", content: "充电时长只能是10的倍数"},
                        ]
                    },
                    {
                        label: "价格(元)",
                        key: "charge_price",
                        controlType: "input",
                        inputType: "text",
                        require: true,
                        value: _data.charge_price,
                        placeholder: "请输入价格",
                        validator: [
                            Validators.required,
                            Validators.pattern("^[0-9]+$")
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                            {type: "pattern", content: "只能是数字"},
                        ]
                    },
                    {
                        label: "启用状态",
                        key: "status",
                        controlType: "radio",
                        value: _data.status,
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
            }else {
                swal("获取商品信息失败",res.error_msg,"error")
            }
        })
    }

    //form数据
    // public fields:Array<any> = [
    //     {
    //         label: "商品名称",
    //         key: "commodity_name",
    //         controlType: "input",
    //         inputType: "text",
    //         require: true,
    //         value: "",
    //         placeholder: "请输入商品名称",
    //         validator: [
    //             Validators.required
    //         ],
    //         errormsg: [
    //             {type: "required", content: "必填项目"}
    //         ]
    //     },
    //     {
    //         label: "商品描述",
    //         key: "commodity_description",
    //         controlType: "input",
    //         require: true,
    //         inputType: "textarea",
    //         placeholder: "请输入商品描述",
    //         validator: [
    //             Validators.required,
    //         ],
    //         errormsg: [
    //             {type: "required", content: "必填项目"},
    //         ]
    //     },
    //     {
    //         label: "充电时长(分钟)",
    //         key: "charge_duration",
    //         controlType: "input",
    //         inputType: "text",
    //         require: true,
    //         value: "",
    //         placeholder: "请输入充电时长",
    //         validator: [
    //             Validators.required,
    //             Validators.pattern("^[0-9]+$"),
    //             ChargeDurationValidator
    //         ],
    //         errormsg: [
    //             {type: "required", content: "必填项目"},
    //             {type: "pattern", content: "只能是数字"},
    //             {type: "ChargeDurationValidator", content: "充电时长只能是10的倍数"},
    //         ]
    //     },
    //     {
    //         label: "价格(元)",
    //         key: "charge_price",
    //         controlType: "input",
    //         inputType: "text",
    //         require: true,
    //         value: "",
    //         placeholder: "请输入价格",
    //         validator: [
    //             Validators.required,
    //             Validators.pattern("^[0-9]+$")
    //         ],
    //         errormsg: [
    //             {type: "required", content: "必填项目"},
    //             {type: "pattern", content: "只能是数字"},
    //         ]
    //     },
    //     {
    //         label: "启用状态",
    //         key: "status",
    //         controlType: "radio",
    //         value: "1",
    //         require: true,
    //         options: [
    //             {value: "1", content: "启用"},
    //             {value: "2", content: "禁用"}
    //         ],
    //         validator: [
    //             Validators.required
    //         ],
    //         errormsg: [
    //             {type: "required", content: "必填项目"}
    //         ]
    //     }
    // ];

    saveData=({value}={value})=> {
        console.log(value);
        let params = {
            params: {
                commodity_info:value,
                commodity_id:this.commodity_id
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/update_commodity/hash", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/commodity/commodityList');
                }else {
                    swal("新增商品失败",res.error_msg,"error")
                }
            }
        )
    }
}