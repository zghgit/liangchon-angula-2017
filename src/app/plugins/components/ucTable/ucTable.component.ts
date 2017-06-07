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
    public numPages(){}
    constructor() {
    }

    ngOnInit() {
    }
    public pageChanged(event: any): void {
        this.pageBeChanged.emit(event);
    }

}