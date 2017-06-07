/**
 * Created by max on 2017/6/5.
 */
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {UcFormModule} from "../../plugins/UcFormModule";
import { OperationManagementComponent } from './operationManagement.component';
import {operationAnalysisRoutes} from "./operationManagement.routes"
import {
    OperationManagementListComponent

} from './components';
@NgModule({
    imports: [
        UcFormModule,
        RouterModule.forChild(operationAnalysisRoutes)
    ],
    exports: [],
    declarations: [OperationManagementComponent,
        OperationManagementListComponent
    ],
    providers: [],
})
export class OperationManagementModule { }
