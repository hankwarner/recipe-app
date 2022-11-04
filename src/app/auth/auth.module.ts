import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutesModule } from "./auth-routes.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        SharedModule,
        AuthRoutesModule
    ]
})
export class AuthModule {}
