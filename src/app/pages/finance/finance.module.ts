/**
 * Created by max on 2017/6/12.
 */
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule}  from '@angular/common';
import {RouterModule} from "@angular/router";
import {UcFormModule} from "../../plugins/UcFormModule";

import {FinanceComponent} from './finance.component';
import {FinanceRoutes} from "./finance.routes";
import {
    FinanceListComponent,
    SettlementComponent,
    payConfigListComponent,
    WxWalletListComponent,
    WxPubConfEditComponent,
    WxPubConfAddComponent,
    AlipayConfAddComponent,
    AlipayConfEditComponent,
    CashWithdrawalComponent,
} from './components';

@NgModule({
    imports: [
        RouterModule.forChild(FinanceRoutes),
        UcFormModule,
        CommonModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        FinanceComponent,
        FinanceListComponent,
        SettlementComponent,
        payConfigListComponent,
        WxWalletListComponent,
        WxPubConfEditComponent,
        WxPubConfAddComponent,
        AlipayConfAddComponent,
        AlipayConfEditComponent,
        CashWithdrawalComponent,
    ],
    providers: [],
})
export class FinanceModule {
}
