/**
 * Created by max on 2017/5/4.
 */
import {NgModule} from "@angular/core";
import {CommonModule}  from '@angular/common';
import {RouterModule} from '@angular/router';

import {PaginationModule} from 'ngx-bootstrap/pagination';
import {DatepickerModule} from 'ngx-bootstrap/datepicker';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';

import {ReactiveFormsModule} from '@angular/forms';

import {EqualValidator} from "./validators/equalValidator";

import {
    UcButtonComponent,
    UcUpfileComponent,
    UcTableComponent,
    UcDetailsComponent,
    UcRadioComponent,
    UcFormComponent,
    UcInputComponent,
    UcInputAddComponent,
    UcCheckboxComponent,
    UcTimeComponent,
    ucSelectComponent,
    UcAddressComponent,
} from "./components";

const NGX_COMPONENTS = [
    UcButtonComponent,
    UcUpfileComponent,
    UcTableComponent,
    UcDetailsComponent,
    UcRadioComponent,
    UcFormComponent,
    UcInputComponent,
    UcInputAddComponent,
    UcCheckboxComponent,
    UcTimeComponent,
    ucSelectComponent,
    UcAddressComponent,
];
@NgModule({
    declarations: [
        EqualValidator,
        ...NGX_COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        DatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
    ],
    exports: [
        ...NGX_COMPONENTS
    ],
})
export class UcFormModule {
}

