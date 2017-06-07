/**
 * Created by max on 2017/4/19.
 * 需要传入model.config={
 *
 *
 * }
 *
 */

import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppHttpService,UC} from "../../../plugins/globalservice";
@Component({
    selector: 'agent-list',
    templateUrl: '../views/agentList.html'
})
export class AgentListComponent implements OnInit {
    constructor(public uc:UC) { }
    public fields= [
        {
            label: "用户名",
            key:"username",
            controlType:"input",
            inputType:"text",
            require:true,
            value:"",
            placeholder: "用户名",
            validator:[
                Validators.required,
                Validators.pattern("^[0-9]+$")
            ],
            errormsg:[
                {type:"required",content:"必填项目"},
                {type:"pattern",content:"只能是数字"},
            ]
        },
        {
            label: "常用邮箱",
            key:"email",
            controlType:"input",
            inputType:"text",
            require:true,
            placeholder: "常用邮箱",
            validator:[
                Validators.required,
                Validators.pattern("^[0-9]+$")
            ],
            errormsg:[
                {type:"required",content:"必填项目"},
                {type:"pattern",content:"只能是数字"},
            ]
        },
        {
            label: "密码",
            key:"password",
            controlType:"input",
            inputType:"password",
            value:"111111",
            require:true,
            placeholder: "密码，至少8位",
            validator:[
                Validators.required,
                Validators.pattern("^[0-9]+$")
            ],
            errormsg:[
                {type:"required",content:"必填项目"},
                {type:"pattern",content:"只能是数字"},
            ]
        },
        {
            label: "能力",
            key:"power",
            controlType:"radio",
            value:"1",
            require:true,
            options:[
                {value:"1",content:"启用",checked:true},
                {value:"2",content:"禁用"}
            ],
            validator:[
                Validators.required
            ],
            errormsg:[
                {type:"required",content:"必填项目"}
            ]
        },{
            label: "展示",
            key:"show1",
            controlType:"checkbox",
            require:true,
            value:"",
            options:[
                {checked:true,value:"1",content:"商品1"},
                {checked:false,value:"2",content:"商品2"},
                {checked:false,value:"3",content:"商品3"},
                {checked:false,value:"4",content:"商品4"},
            ],
            validator:[
                Validators.required
            ],
            errormsg:[
                {type:"required",content:"必填项目"}
            ]
        },
        {
            label: "重复密码",
            key:"repassword",
            controlType:"input",
            inputType:"password",
            require:true,
            placeholder: "重复密码",
            validator:[
                Validators.required,
                Validators.pattern("^[0-9]+$")
            ],
            errormsg:[
                {type:"required",content:"必填项目"},
                {type:"pattern",content:"只能是数字"},
            ]
        },
        {
            label: "个人简介",
            key:"summary",
            controlType:"input",
            require:true,
            inputType:"textarea",
            placeholder: "个人简介，最多140字，不能放链接。",
            validator:[
                Validators.required,
            ],
            errormsg:[
                {type:"required",content:"必填项目"},
            ]
        },
        {
            label: "上传文件",
            key:"uploader",
            controlType:"file",
            fileType:"img",
            require:true,
            value:"",
            config:{
                uploadurl:this.uc.api.qc +"/upload_file/hash/",
                downloadurl:this.uc.api.qc +"/get_file/hash/",
                capsule:"ccm"
            },
            validator:[
                Validators.required,
            ],
            errormsg:[
                {type:"required",content:"必填项目"},
            ]
        },{
            label:"时间",
            key:"start_time",
            controlType:"time",
            value:"",
            require:true,
            config:{
                showTimePicker:false,
                format:0,
            },
            placeholder:"选择开始时间",
            validator:[
                Validators.required
            ],
            errormsg:[
                {type:"required",content:"必填项目"}
            ]
        },{
            label:"地址",
            key:"address",
            controlType:"address",
            hasChildGroup:true,
            require:true,
            url:this.uc.api.qc + '/get_geo_list/hash/',
            config: {
                province: {
                    name: 'province_code',
                    value:"2",
                    placeholder: "--请选择省--",
                },
                city: {
                    name: 'city_code',
                    value:'37',
                    placeholder: "--请选择市--",
                },
                area: {
                    name: 'district_code',
                    value:'397',
                    placeholder: "--请选择区--",
                }
            },
            validator:[
                Validators.required
            ],
            errormsg:[
                {type:"required",content:"必填项目"}
            ]
        }
    ];
    title = "代理疝";
    public mmm:string;
    ngOnInit() {
    }

}