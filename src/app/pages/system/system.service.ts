import {Injectable, OnInit} from "@angular/core";
import {System, SystemInterface} from "./system.interface";
import { of as observableOf,  Observable } from 'rxjs';
import {LoginService} from "../../login.service";
import {HttpClient} from "@angular/common/http";
import {config} from "../../config";
import {tap} from "rxjs/internal/operators";
@Injectable()
export class SystemService extends SystemInterface {

  constructor(private loginService : LoginService,public http: HttpClient,public http2: HttpClient)
  {
    super();

  }
  private systemData: System ={value:0,min:0,max:0} ;

  private systemData_p: System={value:0,min:0,max:0};
  getSystemData():Observable<any>
  {
     return this.http.get<any>(`${config.apiUrl}/bo/`+this.loginService.getJwtToken()+"/osinfos").pipe(
    tap(      data=>
      {
        console.log(data);
      }));

  }
  getSystemData_p():Observable<System>
  {
     this.http2.get<any>(`${config.apiUrl}/bo/`+this.loginService.getJwtToken()+"/osinfos").pipe(
      tap(      data=>
      {
        console.log(data);
        this.systemData_p.max=100;
        this.systemData_p.min=0;
        this.systemData_p.value=(data.response.used_memory/data.response.total_memory)*100;

      }));
    return observableOf(this.systemData_p);
  }
}
