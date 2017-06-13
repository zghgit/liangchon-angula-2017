/**
 * Created by max on 2017/6/13.
 */
import {Routes} from '@angular/router';
import {AdvertisementComponent} from "./advertisement.component";
import {
    AdvertisementListComponent,
    advertisementAddComponent,
} from "./components";
export const AdvertisementRoutes: Routes = [
    {
        path: "",
        component: AdvertisementComponent,
        children: [
            {path: "", redirectTo: "advertisementList", pathMatch: "full"},
            {path: "advertisementList", component: AdvertisementListComponent},
            {path: "advertisementAdd", component: advertisementAddComponent},
        ]
    },
];