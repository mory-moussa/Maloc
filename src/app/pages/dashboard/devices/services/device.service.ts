import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {device, DeviceInterface, infos} from "../interfaces/device.interface";
import {Promise, reject} from "q";
import {LoginService} from "../../../../login.service";
import {config} from "../../../../config";
import {of as observableOf,Observable} from "rxjs";
import {promise} from "selenium-webdriver";
@Injectable()
export class DeviceService extends DeviceInterface {

  constructor(private loginService : LoginService,public http: HttpClient)
  {
    super();

  }
  devices : Array<device>;
  nbr_bloqued:number=0;
  nbr_total:number=0;
  nbr_fonctionnel:number=0;
  nbr_desabonned:number=0;
  getDeviceInfoData():Promise<any> {
  let promise = Promise((resolve, reject) => {
    this.http.get<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + "/infosboitier").toPromise()
      .then(data=>
      {
        console.log(data);
        this.devices=data.response.devices;
        resolve(data.response.devices);
      },msg=>
        {
          reject(msg);
        }
        )

  });
  return promise ;
  }

  getBloqued_devices(): Observable<device[]>
  {
    //console.log(this.devices);
   // console.log("je suis la !");
    let d : Array<device> = [];
   // console.log(this.devices.length);
  for(let i=0;i<this.devices.length;i++)
  {
   // console.log(this.devices[i]);
    if(this.devices[i].date_server) {
        if (((this.devices[i].date_server) + 3600000 * 4) < new Date().getTime() && ((this.devices[i].date_server)) > (new Date().getTime() - 3600000 * 24 * 120) && (Date.parse(this.devices[i].end_date)) > new Date().getTime()) {
          d.push(this.devices[i]);
        }
      }
  }
    this.nbr_bloqued = d.length;
  return observableOf(d);
  }
  getFonctionnel_devices(): Observable<device[]>
  {
    let d : Array<device>  = [];
    for(let i=0;i<this.devices.length;i++)
    {
      if(((this.devices[i].date_server) + 3600000) >= new Date().getTime() && Date.parse(this.devices[i].end_date) >new Date().getTime())
      d.push(this.devices[i]);
    }

    this.nbr_fonctionnel =d.length;
    return observableOf(d);
  }
  getDesabonned_devices(): Observable<device[]>
  {
    let d : Array<device> = [];
    for(let i=0;i<this.devices.length;i++)
    {
      if((Date.parse(this.devices[i].end_date) - (3600000*24*7)) < new Date().getTime())
      d.push(this.devices[i]);
    }

    this.nbr_desabonned =d.length;
    return observableOf(d);
  }
  getTotal_devices(): Observable<device[]>
  {

    this.nbr_total =this.devices.length;
    return observableOf(this.devices);
  }
  getInfos(): Observable<infos>
  {
    let infos : infos = {bloqued:0,
      total:0,
      operationnel:0,
      desabonned:0};
    console.log(this.nbr_total)
    console.log(this.nbr_desabonned)
    console.log(this.nbr_fonctionnel)
    console.log(this.nbr_bloqued)
    infos.bloqued=this.nbr_bloqued;
    infos.desabonned=this.nbr_desabonned;
    infos.operationnel=this.nbr_fonctionnel;
    infos.total=this.nbr_total;
    return observableOf(infos);
  }

  update_device(device): Promise<any> {
    let promise = Promise((resolve, reject) => {
      this.http.put<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + "/updatedevicesim",device).toPromise()
        .then(data => {
          console.log(data);
          if(data.state=="success")
            resolve(true);
          else
            reject(false);
        }, msg => {

          reject(false);
        })
    });
    return promise;
  }
  delete_device(id_vehicle): Promise<any>
  {
    let promise = Promise((resolve, reject) => {
      this.http.delete<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + "/deletedevice?id_vehicle="+id_vehicle).toPromise()
        .then(data => {
          console.log(data);
          if(data.state=="success")
          resolve(true);
          else
            reject(false);
        }, msg => {

          reject(false);
        })
    });
      return promise;
  }
}
