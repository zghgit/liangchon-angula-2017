/**
 * Created by max on 2017/5/12.
 */
import {Component, OnInit, Input, Output,EventEmitter} from '@angular/core';

@Component({
    selector: 'uc-table',
    templateUrl: 'ucTable.html',
    styleUrls:["ucTable.scss"]
})
export class UcTableComponent implements OnInit {
    @Input() model;
    @Output() public pageBeChanged = new EventEmitter<any>();
    public showZoom:boolean = false;
    public zoomSrc:string;
    public numPages(){}
    constructor() {
    }

    ngOnInit() {
    }
    public pageChanged(event: any): void {
        this.pageBeChanged.emit(event);
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