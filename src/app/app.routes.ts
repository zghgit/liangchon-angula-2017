/**
 * Created by max on 2017/4/19.
 */
import { Routes } from "@angular/router";
import { LoginComponent } from "./index/login/login.component";
export const appRoutes:Routes = [
    {
        path:"",
        redirectTo:'login',
        pathMatch:'full'
    },{
        path:"login",
        component:LoginComponent
    },{
        path:"pages",
        loadChildren:"./pages/pages.module#PagesModule"
    }
    // ,{
    //     path:'**',
    //     redirectTo:"login",
    //     pathMatch:"full",
    // }
]
