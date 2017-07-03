/**
 * Created by max on 2017/6/5.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
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
}from "./components";

@NgModule({
    imports: [
        UcFormModule,
        RouterModule.forChild(appManagementRoutes),
        QuillEditorModule,
        FormsModule
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
    ],
    providers: [],
})
export class AppManagementModule {
}
