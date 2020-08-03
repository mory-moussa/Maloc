import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Temperature, TemperatureHumidityData } from '../../../@core/data/temperature-humidity';
import { takeWhile } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import {System, SystemInterface} from "../../system/system.interface";
import {DeviceInterface, infos} from "./interfaces/device.interface";

@Component({
  selector: 'ngx-devices',
  styleUrls: ['./devices.component.scss'],
  templateUrl: './devices.component.html',
})
export class DevicesComponent implements OnDestroy {

  private alive = true;

  systemData : System;
  system : number;
  systemOff = false;
  systemMode = 'cool';
  systemData_p : System;
  system_p : number;
  systemOff_p = false;
  systemMode_p = 'cool';

  devicesData: {};
  infos: number;
  devicesOff = false;
  temperatureMode = 'cool';

  devicesData_p: {};
  infos_p: number;
  devicesOff_p = false;
  temperatureMode_p = 'cool';

  theme: any;
  themeSubscription: any;

  constructor(private themeService: NbThemeService,
              private deviceInfosService : DeviceInterface , private systemService:SystemInterface) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
      this.theme = config.variables.temperature;
    });
this.deviceInfosService.getDeviceInfoData().then(data=> {
  this.deviceInfosService.getInfos()
    .subscribe(infos => {
      this.devicesData = {min: 0, max: infos.total, value: infos.operationnel};
      this.infos = infos.operationnel;
      this.devicesData_p = {min: 0, max: 100, value: (infos.operationnel / infos.total) * 100};
      this.infos_p = (infos.operationnel / infos.total) * 100;
    });
});
      this.systemService.getSystemData()
      .subscribe(data => {
      let system = {value:data.response.used_memory/(1024),min:0,max:data.response.total_memory/(1024)}
        this.systemData=system;
        this.system = system.value;
        let v:System={value:(system.value/system.max)*100,min:0,max:100};
        this.systemData_p = v;
        this.system_p = v.value;
      });

  }

  ngOnDestroy() {
    this.alive = false;
  }
}
