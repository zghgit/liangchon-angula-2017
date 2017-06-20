/**
 * Created by max on 2017/6/20.
 */
/**
 * Created by max on 2017/5/12.
 */
import {Component, OnInit, Input, Output,EventEmitter} from '@angular/core';

@Component({
    selector: 'uc-table-checkbox',
    templateUrl: 'ucTableByCheckbox.html',
    styleUrls:["ucTableByCheckbox.scss"]
})
export class UcTableByCheckboxComponent implements OnInit {
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