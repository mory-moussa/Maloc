import {LoginService} from "../../login.service";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {DeviceInterface} from "../../pages/dashboard/devices/interfaces/device.interface";
import {LogInterface} from "../../interfaces/log/log.interface";
import {config} from "../../config";
import {Promise} from "q";
import {isDate} from "util";
import {type} from "os";

@Injectable()
export class LogService extends LogInterface {

  constructor(private loginService: LoginService, public http: HttpClient) {
    super();

  }

  get_log(imei , start_date , end_date):Promise<any> {
    let promise = Promise((resolve, reject) => {
      this.http.get<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + "/log?imei="+imei+"&date_s="+start_date+"&date_e="+end_date).toPromise()
        .then(data=>
          {
            let datas:Array<any> = [];
            var cols:any={};
            console.log(data.response);
            for(var i=0;i<data.response.length;i++) {
              console.log(data.response[i]);
              console.log();
              Object.keys(data.response[i]).forEach(val=>
              {
                var type = 'string';
                if(val.includes('TIME') || val.includes('time'))
                {
                  type = "date";
                }
                else if (!isNaN(Number(data.response[i][val])) && data.response[i][val].toString().indexOf('.') != -1)
                {
                  type = "float"
                }
                else if (!isNaN(Number(data.response[i][val])))
                {
                  type = "number"
                }
                if(!cols[val])
                cols[val]={enable:false,type:type};
              }

                );
              datas.push(data.response[i]);
            }
            console.log(cols);
            console.log(datas);
            resolve({columns:cols,datas:datas});
          },msg=>
          {
            reject(msg);
          }
        )

    });
    return promise ;
  }
}
