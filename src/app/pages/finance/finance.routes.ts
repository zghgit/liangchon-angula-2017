/**
 * Created by max on 2017/6/12.
 */
import { Routes } from '@angular/router';

import { FinanceComponent } from './finance.component';
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
export const FinanceRoutes :Routes = [
    { path: "",
        component:FinanceComponent,
        children:[
            { path: "",redirectTo:"financeList",pathMatch:"full" },
            { path: 'financeList', component: FinanceListComponent },
            { path: 'settlement', component: SettlementComponent },
            { path: 'payConfigList', component: payConfigListComponent },
            { path: 'wxWalletList', component: WxWalletListComponent },
            { path: 'wxPubConfEdit', component: WxPubConfEditComponent },
            { path: 'wxPubConfAdd', component: WxPubConfAddComponent },
            { path: 'alipayConfAdd', component: AlipayConfAddComponent },
            { path: 'alipayConfEdit', component: AlipayConfEditComponent },
            { path: 'cashWithdrawal', component: CashWithdrawalComponent },
        ]
    },
];