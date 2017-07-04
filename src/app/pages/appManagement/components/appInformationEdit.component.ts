/**
 * Created by max on 2017/6/5.
 */
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {AppHttpService, UC} from "../../../plugins/globalservice";

declare var swal;
@Component({
    selector: 'app-information-edit',
    templateUrl: '../views/appInformationEdit.html',
    styleUrls: ["../styles/appInformationAdd.scss"]
})
export class AppInformationEditComponent implements OnInit {
    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public activatedRoute: ActivatedRoute,
                public router: Router) {
    }

    public editor;
    public editorContent = "";
    public editorOptions = {
        placeholder: "请输入资讯正文..."
    };
    public information_title: string;
    public information_id: string;


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
        let params = this.activatedRoute.params;
        params.subscribe(res => {
            this.information_id = res.id;
        });
        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_information/", {
                params: {
                    information_id: params['id']
                }
            }));
        data.subscribe(res => {
            if (res.status) {

                let data = res.data;
                this.information_id = data.information_id;
                this.information_title = data.information_title;
                this.editorContent = data.information_content;
            }
        })
    }

    uploaddata() {

        let params = {
            params: {
                information_title: this.information_title,
                information_content: this.editorContent
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/add_information", params).subscribe(
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
