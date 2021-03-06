/**
 * Created by max on 2017/6/2.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Validators} from '@angular/forms';
import {AppHttpService, UC} from "../../../plugins/globalservice";

declare var swal;
@Component({
    selector: 'complained-add',
    templateUrl: '../views/complainedAdd.html',
    styleUrls: ['../styles/complainedAdd.scss']
})
export class complainedAddComponent implements OnInit {
    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router) {
    }

    ngOnInit() {

    }

    //form数据
    public fields = [
        {
            label: "订单编号",
            key: "order_no",
            controlType: "input",
            inputType: "text",
            value: "",
            placeholder: "请输入订单编号",
        },
        {
            label: "申诉内容",
            key: "complained_content",
            controlType: "input",
            require: true,
            inputType: "textarea",
            placeholder: "请输入申诉内容",
            validator: [
                Validators.required,
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
            ]
        },
        {
            label: "申诉状态",
            key: "status",
            controlType: "radio",
            value: "1",
            require: true,
            options: [
                {value: "1", content: "待处理"},
                {value: "2", content: "已处理"}
            ],
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        },{
            label: "备注",
            key: "remark",
            controlType: "input",
            inputType: "text",
            value: "",
            placeholder: "请输入备注",
        }
    ];

    saveData({value}={value}) {
        let {complained_content}=value;
        if (!(complained_content.trim())) {
            swal({
                title: "提示!",
                text: "申诉内容不能为空",
                type: "error",
                timer:"2000"
            });
            return
        }
        if(complained_content.length>=500) {
            swal({
                title: "提示!",
                text: "申诉内容不能超过500字",
                type: "error",
                timer:"2000"
            });
            return
        }
        let params = {
            params: value
        }
        this.appHttpService.postData(this.uc.api.qc + "/add_complained", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/complained/complainedList');
                }else {
                    swal("新增申诉失败",res.error_msg,"error")
                }
            }
        )
    }
}