import {device, infos} from "../../pages/dashboard/devices/interfaces/device.interface";
import {Observable} from "rxjs/index";
import {Promise} from "q";

export abstract class LogInterface {
  abstract get_log(imei , start_date , end_date): Promise<any>;

}
