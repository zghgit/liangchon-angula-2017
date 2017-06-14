/**
 * Created by max on 2017/6/5.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Validators} from '@angular/forms';
import {AppHttpService, UC} from "../../../plugins/globalservice";

declare var swal;
@Component({
    selector: 'app-information-add',
    templateUrl: '../views/appInformationAdd.html'
})
export class AppInformationAddComponent implements OnInit {
    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router) {
    }

    ngOnInit() {

    }

    //form数据
    public fields = [
        {
            label: "标题",
            key: "information_title",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入标题",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        },
        {
            label: "商品描述",
            key: "information_content",
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
        }
    ];

    saveData({value}={value}) {
        let params = {
            params: value
        }
        this.appHttpService.postData(this.uc.api.qc + "/add_information/hash", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/appManagement/appInformationList');
                }else {
                    swal("新增资讯失败",res.error_msg,"error")
                }
            }
        )
    }
}