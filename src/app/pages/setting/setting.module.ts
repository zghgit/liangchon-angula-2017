/**
 * Created by max on 2017/6/21.
 */
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule}  from '@angular/common';

import {UcFormModule} from "../../plugins/UcFormModule";

import {RouterModule} from "@angular/router";
import {settingRoutes} from "./setting.routes"
import {SettingComponent} from './setting.component';
import { QuillEditorModule } from 'ngx-quill-editor';
import {
    SettingEditComponent,
    UserAgreementComponent,
}from"./components"



@NgModule({
    imports: [
        RouterModule.forChild(settingRoutes),
        FormsModule,
        QuillEditorModule,
        UcFormModule,
        CommonModule,
    ],
    exports: [],
    declarations: [
        SettingComponent,
        SettingEditComponent,
        UserAgreementComponent,
    ],
    providers: [],
})
export class SettingModule {
}
