import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NbAlertModule, NbMenuModule} from '@nebular/theme';
import { ThemeModule } from './@theme/theme.module';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule, NbThemeModule,
  NbUserModule,
} from '@nebular/theme';
import {FormsModule, FormsModule as ngFormsModule} from "@angular/forms";
import {NbAuthModule} from "@nebular/auth";
import {AuthentificationRoutingModule} from "./authentification.routing.module";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login.component";
import {AppModule} from "./app.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthentificationRoutingModule,
    NbAuthModule,
  ],
  declarations: [
    LoginComponent,

  ]
})
export class AuthentificationModule  { }
