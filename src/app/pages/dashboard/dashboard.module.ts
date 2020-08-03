import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule, NbDialogModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomSelectorComponent } from './rooms/room-selector/room-selector.component';
import { DevicesComponent } from './devices/devices.component';
import { DevicesDraggerComponent } from './devices/devices-dragger/devices-dragger.component';
import { KittenComponent } from './kitten/kitten.component';
import { SecurityCamerasComponent } from './security-cameras/security-cameras.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { WeatherComponent } from './weather/weather.component';
import { SolarComponent } from './solar/solar.component';
import { PlayerComponent } from './rooms/player/player.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TrafficChartComponent } from './traffic/traffic-chart.component';
import { FormsModule } from '@angular/forms';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ShowcaseDialogComponent} from "../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";
import {WindowFormComponent} from "../modal-overlays/window/window-form/window-form.component";
import {DialogNamePromptComponent} from "../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component";
import {
  NgxPopoverCardComponent,
  NgxPopoverFormComponent,
  NgxPopoverTabsComponent
} from "../modal-overlays/popovers/popover-examples.component";
import {ToastrComponent} from "../modal-overlays/toastr/toastr.component";
import {WindowComponent} from "../modal-overlays/window/window.component";
import {ModalOverlaysComponent} from "../modal-overlays/modal-overlays.component";
import {TooltipComponent} from "../modal-overlays/tooltip/tooltip.component";
import {DialogComponent} from "../modal-overlays/dialog/dialog.component";
import {PopoversComponent} from "../modal-overlays/popovers/popovers.component";



@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    DevicesDraggerComponent,
    ContactsComponent,
    RoomSelectorComponent,
    DevicesComponent,
    RoomsComponent,
    KittenComponent,
    SecurityCamerasComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    WeatherComponent,
    PlayerComponent,
    SolarComponent,
    TrafficComponent,
    TrafficChartComponent,
  ],
  entryComponents: [
  ],
})
export class DashboardModule { }
