/**
 * Created by max on 2017/6/28.
 */
import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Params, Router}   from '@angular/router';
import {AppHttpService, UC} from "../../../plugins/globalservice";

declare var swal: any;
@Component({
    selector: 'feedback-detail',
    templateUrl: '../views/feedbackDetail.html',
    styleUrls: ['../styles/feedbackDetail.scss']
})
export class FeedbackDetailComponent implements OnInit {
    public feedback_id;//反馈id
    public user_id;
    public plugins: any = {
        table: {
            data: []
        }
    };
    public uploadconfig: any = {};//上传配置
    public notallowload: boolean = false;//不允许上传
    public showFeedback: boolean = false;

    public reply_content: string;
    public reply_img: Array<any> = [];
    public img_error: string = "";
    public feedbackInfo: any = {};//反馈信息
    public replyList: Array<any> = [];//反馈信息
    public baseurl: string;
    //图片放大
    public showZoom: boolean = false;
    public zoomSrc: string;

    constructor(public appHttpService: AppHttpService,
                public uc: UC,
                public router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.baseurl = this.uc.api.qc + "/get_file/";

        if (this.uc.powerfun(this.uc.constant.add_feedback_reply)) {
            this.plugins.button = {
                class: 'btn-primary',
                content: '回复反馈',
                click: () => {
                    this.showFeedback = true;
                }
            };
        }
        this.uploadconfig = {
            value: '',
            accept: "image/*",
            multi: true,
            size: 4,
            count:4,
            uploadurl: this.uc.api.qc + "/upload_file/",
            capsule: "feedbackimg"
        }
        this.getFeedback()
    }

    filehasup(ev) {
        this.reply_img = JSON.parse(ev.value);
        if (this.reply_img.length >= 4) {
            this.notallowload = true;
            this.img_error = "最多只能上传4张图片!";
        }
    }

    getFeedback() {
        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_feedback_info", {params: {feedback_id: params['id']}}));
        data.subscribe((res) => {
            if (res.status) {
                let _data = res.data;
                this.feedbackInfo = _data.feedback_info;
                this.user_id = _data.feedback_info.user_id;
                this.replyList = _data.reply_list;
                this.feedback_id = _data.feedback_info.feedback_id;
            } else {
                swal({
                    title: "获取申诉信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"2000"
                });
            }
        })
    }

    //上传反馈
    uploadformdata() {
        let reply_content = this.reply_content;
        if (!(reply_content.trim())) {
            swal({
                title: "提示!",
                text: "回复内容不能为空",
                type: "error",
                timer:"2000"
            });
            return
        }
        if(reply_content.length>200) {
            swal({
                title: "提示!",
                text: "回复内容不能超过200字",
                type: "error",
                timer:"2000"
            });
            return
        }
        let params = {
            params: {
                feedback_id: this.feedback_id,
                feedback_content: this.reply_content,
                feedback_img: this.reply_img
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/add_feedback_reply", params).subscribe(
            res => {
                if (res.status) {
                    this.closeFeedback();
                    this.getFeedback();
                    this.clearreply();
                    swal({
                        title: "回复反馈成功!",
                        text: "",
                        type: "success",
                        timer:"2000"
                    });
                } else {
                    swal("回复反馈失败", res.error_msg, "error")
                }
            }
        )
    }

    closeFeedback() {
        this.showFeedback = false;
    }

    //图片放大
    public zoomImg({target}={target}) {
        if (target.localName == "img") {
            this.showZoom = true;
            this.zoomSrc = target.src;
        }
    }

    //关闭图片窗口
    public closeZoomImg() {
        this.showZoom = false;
    }
    //清空内容
    public clearreply(){
        this.reply_content = "";
        this.reply_img = [];
        this.notallowload =false;
        this.img_error = "";
    }
}