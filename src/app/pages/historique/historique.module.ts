import { NgModule } from '@angular/core';
import {HistoriqueComponent} from "./historique.component";
import { FormsModule as ngFormsModule } from '@angular/forms';
import {ThemeModule} from "../../@theme/theme.module";
import {HistoriqueRoutingModule} from "./historique-routing.module";
import {LogComponent} from "./log/log.component";
import {NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule} from "@nebular/theme";
import {NbMomentDateModule} from "@nebular/moment";
import {NbDateFnsDateModule} from "@nebular/date-fns";
import {Ng2SmartTableModule} from "ng2-smart-table";

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbDatepickerModule, NbIconModule,
    NbMomentDateModule,
    NbDateFnsDateModule,
    HistoriqueRoutingModule,
    ngFormsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    HistoriqueComponent,LogComponent
  ],
})
export class HistoriqueModule {
}
