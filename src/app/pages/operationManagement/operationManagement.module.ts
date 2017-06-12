/**
 * Created by max on 2017/6/5.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule}  from '@angular/common';
import {UcFormModule} from "../../plugins/UcFormModule";
import {OperationManagementComponent} from './operationManagement.component';
import {operationAnalysisRoutes} from "./operationManagement.routes"
import {
    OperationManagementListComponent,
    MaintenanceManComponent,

} from './components';
@NgModule({
    imports: [
        UcFormModule,
        RouterModule.forChild(operationAnalysisRoutes),
        CommonModule
    ],
    exports: [],
    declarations: [OperationManagementComponent,
        OperationManagementListComponent,
        MaintenanceManComponent,
    ],
    providers: [],
})
export class OperationManagementModule {
}
