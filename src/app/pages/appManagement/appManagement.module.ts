/**
 * Created by max on 2017/6/5.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {UcFormModule} from "../../plugins/UcFormModule";

import {AppManagementComponent} from './appManagement.component';
import {appManagementRoutes} from "./appManagement.routes"
import {
    AppManagementListComponent,
    AppUserIncreaseComponent,
    AppInformationComponent,
    AppInformationAddComponent,
}from "./components";

@NgModule({
    imports: [
        UcFormModule,
        RouterModule.forChild(appManagementRoutes)
    ],
    exports: [],
    declarations: [
        AppManagementComponent,
        AppManagementListComponent,
        AppUserIncreaseComponent,
        AppInformationComponent,
        AppInformationAddComponent
    ],
    providers: [],
})
export class AppManagementModule {
}
