/**
 * Created by max on 2017/5/15.
 */
import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'uc-details',
    templateUrl: 'ucDetails.html',
    styleUrls:["ucDetails.scss"]
})
export class UcDetailsComponent implements OnInit {
    @Input() model;
    public showZoom:boolean = false;
    public zoomSrc:string;
    constructor() { }

    ngOnInit() {
    }
    public zoomImg({target}={target}){
        console.log(target.localName)
        if(target.localName == "img"){
            this.showZoom = true;
            this.zoomSrc = target.src;
        }
    }
    public closeZoomImg(){
        this.showZoom = false;
    }
}