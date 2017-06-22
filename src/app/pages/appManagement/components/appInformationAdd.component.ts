/**
 * Created by max on 2017/6/5.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppHttpService, UC} from "../../../plugins/globalservice";

declare var swal;
@Component({
    selector: 'app-information-add',
    templateUrl: '../views/appInformationAdd.html',
    styleUrls:["../styles/appInformationAdd.scss"]
})
export class AppInformationAddComponent implements OnInit {
    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router) {
    }

    public editor;
    public editorContent = "";
    public editorOptions = {
        placeholder: "请输入资讯正文..."
    };
    public information_title:string;


    onEditorBlured(quill) {

    }

    onEditorFocused(quill) {

    }

    onEditorCreated(quill) {
        this.editor = quill;

    }

    onContentChanged({ quill, html, text }) {

    }

    ngOnInit() {
    }
    uploaddata(){

        let params = {
            params: {
                information_title:this.information_title,
                information_content:this.editorContent
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/add_information/hash", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/appManagement/appInformationList');
                } else {
                    swal("新增资讯失败", res.error_msg, "error")
                }
            }
        )
    }
}