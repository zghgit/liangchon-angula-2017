/**
 * Created by max on 2017/6/21.
 */
import { Component, OnInit } from '@angular/core';
import {SettingModel} from "../datamodel/settingModel";
import {AppHttpService, UC} from "../../../plugins/globalservice";
declare var swal;

@Component({
    selector: 'userAgreement',
    templateUrl: '../views/userAgreement.html',
    styleUrls:["../styles/userAgreement.scss"]
})
export class UserAgreementComponent implements OnInit {
    constructor(
        public appHttpService:AppHttpService,
        public uc:UC
    ) { }
    public settingData = new SettingModel();
    public editor;
    public editorContent = "";
    public editorOptions = {
        placeholder: "请输入协议..."
    };
    onEditorBlured(quill) {
    }

    onEditorFocused(quill) {
    }

    onEditorCreated(quill) {
        this.editor = quill;
    }

    onContentChanged({quill, html, text}) {
    }


    ngOnInit() {
        let data = this.appHttpService.postData(this.uc.api.qc+'/get_system_config/');
        data.subscribe(res=>{
            if(res.status){
                let data = res.data;
                for(let item of data){
                    this.settingData[item.config_key] = item.config_value;
                    this.editorContent = this.settingData.user_agreement;
                }
            }else {
                swal("系统设置信息失败", res.error_msg, "error")
            }
        })
    }
    uploaddata() {
        let commiteArry = [];
        this.settingData['user_agreement'] =this.editorContent;
        let settingData = this.settingData;
        for(let item in settingData){
            commiteArry.push({
                config_key: item,
                config_value: settingData[item]
            })
        }
        let params = {
            params: {system_configs: commiteArry}
        };
        this.appHttpService.postData(this.uc.api.qc + "/update_system_config", params).subscribe(
            res => {
                if (res.status) {
                    swal({
                        title: "保存用户协议成功!",
                        text: "",
                        type: "success",
                        timer:"2000"
                    });
                } else {
                    swal("保存用户协议失败", res.error_msg, "error")
                }
            }
        )
    }
}