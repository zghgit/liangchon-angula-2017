/**
 * Created by max on 2017/6/5.
 */
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {UcFormModule} from "../../plugins/UcFormModule";
import { OperationAnalysisComponent } from './operationAnalysis.component';
import {oprationAnalysisRoutes} from "./operationAnalysis.routes"
import {
    FinancialStatisticsComponent,
    OrganizationStatisticsComponent,

} from './components';
@NgModule({
    imports: [
        UcFormModule,
        RouterModule.forChild(oprationAnalysisRoutes)
    ],
    exports: [],
    declarations: [OperationAnalysisComponent,
        FinancialStatisticsComponent,
        OrganizationStatisticsComponent
    ],
    providers: [],
})
export class OperationAnalysisModule { }
