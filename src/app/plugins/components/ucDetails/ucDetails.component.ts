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
    constructor() { }

    ngOnInit() {
    }

}