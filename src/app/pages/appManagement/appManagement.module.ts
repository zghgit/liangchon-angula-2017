/**
 * Created by max on 2017/6/5.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common"
import {UcFormModule} from "../../plugins/UcFormModule";

import {AppManagementComponent} from './appManagement.component';
import {appManagementRoutes} from "./appManagement.routes"

import { QuillEditorModule } from 'ngx-quill-editor';

import {FormsModule} from '@angular/forms';

import {
    AppManagementListComponent,
    AppUserIncreaseComponent,
    AppInformationComponent,
    AppInformationAddComponent,
    AppUserDetailComponent,
    AppChargeRecordComponent,
    AppMessagePushComponent,
    AppInformationEditComponent,
    AppInformationDetailComponent,
    AppVersionCtlComponent,
    AppVersionListComponent,
    AppVersionDetailComponent,
    appVersionEditComponent,
}from "./components";

@NgModule({
    imports: [
        UcFormModule,
        RouterModule.forChild(appManagementRoutes),
        QuillEditorModule,
        FormsModule,
        CommonModule
    ],
    exports: [],
    declarations: [
        AppManagementComponent,
        AppManagementListComponent,
        AppUserIncreaseComponent,
        AppInformationComponent,
        AppInformationAddComponent,
        AppUserDetailComponent,
        AppChargeRecordComponent,
        AppMessagePushComponent,
        AppInformationEditComponent,
        AppInformationDetailComponent,
        AppVersionCtlComponent,
        AppVersionListComponent,
        AppVersionDetailComponent,
        appVersionEditComponent,
    ],
    providers: [],
})
export class AppManagementModule {
}
