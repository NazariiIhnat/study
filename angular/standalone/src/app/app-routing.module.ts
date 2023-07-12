import { NgModule } from "@angular/core";
import { NgModel } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { TestRoutComponent } from "./test/test-rout.component";

const routes: Routes = [{ path: "test", component: TestRoutComponent }];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
