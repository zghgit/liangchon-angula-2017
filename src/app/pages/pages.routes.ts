/**
 * Created by max on 2017/4/27.
 */
import {Routes} from "@angular/router";
import {PagesComponent} from "./pages.component";
import {HomeComponent} from "./home/home.component";
export const pagesRoutes: Routes = [
    {
        path: "",
        component: PagesComponent,
        children: [
            {path: "", redirectTo: "home", pathMatch: "full"},
            {path: 'home', component: HomeComponent},
            {path: "account", loadChildren: "./account/account.module#AccountModule"},
            {path: "equipment", loadChildren: "./equipment/equipment.module#EquipmentModule"},
            {path: "commodity", loadChildren: "./commodity/commodity.module#CommodityModule"},
            {path: "order", loadChildren: "./order/order.module#OrderModule"},
            {path: "rechargeCard", loadChildren: "./rechargecard/rechargeCard.module#rechargeCardModule"},
            {path: "complained", loadChildren: "./complained/complained.module#ComplainedModule"},
            {path: "operationAnalysis", loadChildren: "./operationAnalysis/operationAnalysis.module#OperationAnalysisModule"},
            {path: "operationManagement", loadChildren: "./operationManagement/operationManagement.module#OperationManagementModule"},
            {path: "appManagement", loadChildren: "./appManagement/appManagement.module#AppManagementModule"},
            {path: "finance", loadChildren: "./finance/finance.module#FinanceModule"},
            {path: "advertisement", loadChildren: "./advertisement/advertisement.module#AdvertisementModule"},
            {path: "user", loadChildren: "./user/user.module#UserModule"},
            {path: "charge", loadChildren: "./chargeStation/chargeStation.module#ChargeStationModule"},
        ]
    }
]