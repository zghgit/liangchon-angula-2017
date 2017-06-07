/**
 * Created by max on 2017/4/19.
 */
import { Routes } from '@angular/router';
import { AccountComponent } from "./account.component";
import {
  AgentListComponent,
  ChildAccountListComponent,
  CitypartnerListComponent,
  CitypartnerDetailComponent,
  CitypartnerAddComponent,
  CitypartnerEditComponent,
  MerchantListComponent,
  merchantDetailComponent,
  MerchantAddComponent,
  MerchantEditComponent,
} from "./components";
export const AccountRoutes :Routes = [
  { path: "",
    component:AccountComponent,
    children:[
      { path: "",redirectTo:"childAccountList",pathMatch:"full" },
      { path: "childAccountList", component: ChildAccountListComponent },
      { path: "agentAccountList", component: AgentListComponent },
      { path: "citypartnerList", component: CitypartnerListComponent },
      { path: "citypartnerAdd", component: CitypartnerAddComponent },
      { path: "citypartnerEdit/:id", component: CitypartnerEditComponent },
      { path: "citypartnerDetail/:id", component: CitypartnerDetailComponent },
      { path: "merchantList", component: MerchantListComponent },
      { path: "merchantAdd", component: MerchantAddComponent },
      { path: "merchantEdit/:id", component: MerchantEditComponent },
      { path: "merchantDetail/:id", component: merchantDetailComponent },
    ]
  },
];